from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID
from datetime import datetime

from app.db.base import get_db
from app.api.deps import get_current_user, get_current_active_recruiter
from app.models.user import User
from app.models.resume import RoleDescriptor
from app.schemas.match import (
    MatchRequest,
    MatchResponse,
    MatchResultResponse,
    MatchExplanation,
    MatchingSkill,
    EvidenceItem,
    BatchMatchRequest,
    BatchMatchResponse,
    RoleDescriptorCreate,
    RoleDescriptorResponse
)
from app.services.match_service import match_service
from app.services.embedding_service import embedding_service
from app.services.vector_store import vector_store
import uuid

router = APIRouter()

@router.post("", response_model=MatchResponse)
async def match_candidates(
    match_request: MatchRequest,
    current_user: User = Depends(get_current_active_recruiter),
    db: Session = Depends(get_db)
):
    """
    Semantic matching between candidates and a role.
    Uses hybrid scoring (70% vector similarity + 30% rule-based).
    
    - **role_descriptor**: Job description with skills and constraints
    - **top_k**: Number of top candidates to return
    - **filters**: Optional filters (experience, location, etc.)
    
    Returns ranked candidates with match scores and explanations.
    """
    try:
        # Convert role descriptor to dict
        role_dict = match_request.role_descriptor.model_dump()
        
        # Perform matching
        matches = await match_service.match_candidates_to_role(
            role_descriptor=role_dict,
            top_k=match_request.top_k,
            filters=match_request.filters,
            db=db
        )
        
        # Generate embedding ID for the query
        query_embedding_id = str(uuid.uuid4())
        
        # Format response
        match_results = []
        for match in matches:
            explanation = match["explanation"]
            
            match_result = MatchResultResponse(
                candidate_id=UUID(match["candidate_id"]),
                score=match["score"],
                explanation=MatchExplanation(
                    top_matching_skills=[
                        MatchingSkill(**skill) 
                        for skill in explanation["top_matching_skills"]
                    ],
                    top_evidence=[
                        EvidenceItem(**evidence)
                        for evidence in explanation["top_evidence"]
                    ],
                    gaps=explanation["gaps"],
                    vector_similarity=explanation["vector_similarity"],
                    rule_score=explanation["rule_score"]
                )
            )
            match_results.append(match_result)
        
        return MatchResponse(
            matches=match_results,
            query_embedding_id=query_embedding_id,
            matched_at=datetime.utcnow()
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Matching failed: {str(e)}"
        )

@router.post("/batch", response_model=BatchMatchResponse)
async def batch_match_candidates(
    batch_request: BatchMatchRequest,
    current_user: User = Depends(get_current_active_recruiter),
    db: Session = Depends(get_db)
):
    """
    Batch match specific candidates against a saved role.
    
    - **role_id**: Role descriptor UUID
    - **candidate_ids**: List of candidate profile UUIDs
    - **return_explanations**: Whether to include match explanations
    
    Useful for re-scoring a specific set of candidates.
    """
    try:
        # Perform batch matching
        matches = await match_service.batch_match(
            role_id=batch_request.role_id,
            candidate_ids=batch_request.candidate_ids,
            db=db
        )
        
        # Format response
        match_results = []
        for match in matches:
            if batch_request.return_explanations:
                explanation = match["explanation"]
                match_result = MatchResultResponse(
                    candidate_id=UUID(match["candidate_id"]),
                    score=match["score"],
                    explanation=MatchExplanation(
                        top_matching_skills=[
                            MatchingSkill(**skill)
                            for skill in explanation["top_matching_skills"]
                        ],
                        top_evidence=[
                            EvidenceItem(**evidence)
                            for evidence in explanation["top_evidence"]
                        ],
                        gaps=explanation["gaps"],
                        vector_similarity=explanation["vector_similarity"],
                        rule_score=explanation["rule_score"]
                    )
                )
            else:
                match_result = MatchResultResponse(
                    candidate_id=UUID(match["candidate_id"]),
                    score=match["score"],
                    explanation=MatchExplanation(
                        top_matching_skills=[],
                        top_evidence=[],
                        gaps=[],
                        vector_similarity=0.0,
                        rule_score=0.0
                    )
                )
            match_results.append(match_result)
        
        return BatchMatchResponse(
            matches=match_results,
            batch_id=uuid.uuid4()
        )
        
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Batch matching failed: {str(e)}"
        )

@router.post("/roles", response_model=RoleDescriptorResponse, status_code=status.HTTP_201_CREATED)
async def create_role_descriptor(
    role_data: RoleDescriptorCreate,
    current_user: User = Depends(get_current_active_recruiter),
    db: Session = Depends(get_db)
):
    """
    Create and save a role descriptor with automatic embedding.
    
    Allows recruiters to save job descriptions for repeated use.
    """
    try:
        # Generate embedding for the role
        role_dict = role_data.model_dump()
        embedding_vector = await embedding_service.embed_role_descriptor(role_dict)
        embedding_id = str(uuid.uuid4())
        
        # Store embedding in Qdrant
        await vector_store.store_embedding(
            embedding_id=embedding_id,
            vector=embedding_vector,
            metadata={
                "type": "role",
                "title": role_data.title,
                "company": role_data.company,
                "created_by": str(current_user.id)
            }
        )
        
        # Create role descriptor in database
        new_role = RoleDescriptor(
            title=role_data.title,
            company=role_data.company,
            description=role_data.description,
            required_skills=role_data.required_skills,
            preferred_skills=role_data.preferred_skills,
            constraints=role_data.constraints,
            embedding_id=embedding_id,
            created_by=current_user.id
        )
        
        db.add(new_role)
        db.commit()
        db.refresh(new_role)
        
        return new_role
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create role descriptor: {str(e)}"
        )

@router.get("/roles", response_model=List[RoleDescriptorResponse])
async def list_role_descriptors(
    current_user: User = Depends(get_current_active_recruiter),
    db: Session = Depends(get_db)
):
    """
    List all role descriptors created by the current recruiter.
    """
    roles = db.query(RoleDescriptor).filter(
        RoleDescriptor.created_by == current_user.id
    ).order_by(RoleDescriptor.created_at.desc()).all()
    
    return roles

@router.get("/roles/{role_id}", response_model=RoleDescriptorResponse)
async def get_role_descriptor(
    role_id: UUID,
    current_user: User = Depends(get_current_active_recruiter),
    db: Session = Depends(get_db)
):
    """
    Get a specific role descriptor by ID.
    """
    role = db.query(RoleDescriptor).filter(
        RoleDescriptor.id == role_id,
        RoleDescriptor.created_by == current_user.id
    ).first()
    
    if not role:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Role descriptor not found"
        )
    
    return role
