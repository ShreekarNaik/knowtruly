from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import Optional
from uuid import UUID
import uuid

from app.db.base import get_db
from app.api.deps import get_current_user, get_current_active_student
from app.models.user import User
from app.models.profile import Profile, ProfileSnapshot
from app.schemas.profile import (
    ProfileCreate, 
    ProfileUpdate, 
    ProfileResponse, 
    ProfileCreateResponse,
    ProfileSnapshotResponse
)
from app.services.embedding_service import embedding_service
from app.services.vector_store import vector_store

router = APIRouter()

@router.post("", response_model=ProfileCreateResponse, status_code=status.HTTP_201_CREATED)
async def create_profile(
    profile_data: ProfileCreate,
    current_user: User = Depends(get_current_active_student),
    db: Session = Depends(get_db)
):
    """
    Create a new profile for the current student user.
    Automatically generates embedding and stores in vector database.
    
    - **canonical_name**: Full name
    - **headline**: Professional headline
    - **summary**: Profile summary
    - **contact_handles**: Contact information
    - **education**: List of education entries
    - **positions**: Work experience
    - **skills**: Skills with proficiency levels
    - **projects**: Project portfolio
    """
    # Check if user already has a profile
    existing_profile = db.query(Profile).filter(Profile.owner_id == current_user.id).first()
    if existing_profile:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User already has a profile. Use PATCH to update."
        )
    
    # Prepare profile data
    profile_dict = profile_data.model_dump()
    
    # Generate embedding for the profile
    try:
        embedding_vector = await embedding_service.embed_profile(profile_dict)
        embedding_id = str(uuid.uuid4())
        
        # Store embedding in Qdrant
        await vector_store.store_embedding(
            embedding_id=embedding_id,
            vector=embedding_vector,
            metadata={
                "type": "profile",
                "owner_id": str(current_user.id),
                "canonical_name": profile_data.canonical_name,
            }
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to generate embedding: {str(e)}"
        )
    
    # Create profile in database
    new_profile = Profile(
        owner_id=current_user.id,
        version=1,
        canonical_name=profile_data.canonical_name,
        headline=profile_data.headline,
        summary=profile_data.summary,
        contact_handles=profile_data.contact_handles.model_dump() if profile_data.contact_handles else {},
        education=[edu.model_dump() for edu in profile_data.education],
        positions=[pos.model_dump() for pos in profile_data.positions],
        skills=[skill.model_dump() for skill in profile_data.skills],
        projects=[proj.model_dump() for proj in profile_data.projects],
        badges=profile_data.badges,
        embedding_id=embedding_id
    )
    
    db.add(new_profile)
    db.commit()
    db.refresh(new_profile)
    
    return ProfileCreateResponse(
        profile_id=new_profile.id,
        version=new_profile.version,
        embedding_id=embedding_id
    )

@router.get("/{profile_id}", response_model=ProfileResponse)
async def get_profile(
    profile_id: UUID,
    version: Optional[int] = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get profile by ID.
    
    - **profile_id**: Profile UUID
    - **version**: Optional version number (defaults to latest)
    
    Students can only view their own profiles.
    Recruiters can view any profile (with consent checks in production).
    """
    profile = db.query(Profile).filter(Profile.id == profile_id).first()
    
    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Profile not found"
        )
    
    # Access control: students can only view their own profile
    if current_user.role == "student" and profile.owner_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to view this profile"
        )
    
    # TODO: For recruiters, check consent/access permissions
    
    return profile

@router.patch("/{profile_id}", response_model=ProfileResponse)
async def update_profile(
    profile_id: UUID,
    profile_updates: ProfileUpdate,
    current_user: User = Depends(get_current_active_student),
    db: Session = Depends(get_db)
):
    """
    Update profile (creates new version and regenerates embedding).
    
    Only profile owner can update their profile.
    Version number is automatically incremented.
    """
    profile = db.query(Profile).filter(
        Profile.id == profile_id,
        Profile.owner_id == current_user.id
    ).first()
    
    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Profile not found or not authorized"
        )
    
    # Update fields that are provided
    update_data = profile_updates.model_dump(exclude_unset=True)
    updated_fields = []
    
    for field, value in update_data.items():
        if value is not None:
            if field in ["contact_handles", "education", "positions", "skills", "projects"]:
                # Handle nested models
                if field == "contact_handles":
                    setattr(profile, field, value.model_dump() if hasattr(value, 'model_dump') else value)
                else:
                    # Lists of models
                    setattr(profile, field, [item.model_dump() if hasattr(item, 'model_dump') else item for item in value])
            else:
                setattr(profile, field, value)
            updated_fields.append(field)
    
    # Increment version
    profile.version += 1
    
    # Regenerate embedding with updated data
    try:
        profile_dict = {
            "canonical_name": profile.canonical_name,
            "headline": profile.headline,
            "summary": profile.summary,
            "education": profile.education,
            "skills": profile.skills,
            "positions": profile.positions,
            "projects": profile.projects,
        }
        
        embedding_vector = await embedding_service.embed_profile(profile_dict)
        embedding_id = str(uuid.uuid4())
        
        # Store new embedding
        await vector_store.store_embedding(
            embedding_id=embedding_id,
            vector=embedding_vector,
            metadata={
                "type": "profile",
                "owner_id": str(current_user.id),
                "canonical_name": profile.canonical_name,
                "version": profile.version
            }
        )
        
        # Delete old embedding
        if profile.embedding_id:
            await vector_store.delete_embedding(profile.embedding_id)
        
        profile.embedding_id = embedding_id
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to update embedding: {str(e)}"
        )
    
    db.commit()
    db.refresh(profile)
    
    return profile

@router.post("/{profile_id}/snapshots", response_model=ProfileSnapshotResponse)
async def create_profile_snapshot(
    profile_id: UUID,
    current_user: User = Depends(get_current_active_student),
    db: Session = Depends(get_db)
):
    """
    Create an immutable snapshot of the current profile version.
    Used for verifiable resumes and credential signing.
    """
    profile = db.query(Profile).filter(
        Profile.id == profile_id,
        Profile.owner_id == current_user.id
    ).first()
    
    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Profile not found or not authorized"
        )
    
    # Create snapshot with complete profile data
    snapshot_data = {
        "id": str(profile.id),
        "version": profile.version,
        "canonical_name": profile.canonical_name,
        "headline": profile.headline,
        "summary": profile.summary,
        "contact_handles": profile.contact_handles,
        "education": profile.education,
        "positions": profile.positions,
        "skills": profile.skills,
        "projects": profile.projects,
        "badges": profile.badges,
        "embedding_id": profile.embedding_id,
        "created_at": profile.created_at.isoformat() if profile.created_at else None,
    }
    
    snapshot = ProfileSnapshot(
        profile_id=profile.id,
        version=profile.version,
        snapshot_data=snapshot_data,
        is_signed=False
    )
    
    db.add(snapshot)
    db.commit()
    db.refresh(snapshot)
    
    return snapshot

@router.get("/{profile_id}/snapshots", response_model=list[ProfileSnapshotResponse])
async def get_profile_snapshots(
    profile_id: UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get all snapshots for a profile.
    """
    profile = db.query(Profile).filter(Profile.id == profile_id).first()
    
    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Profile not found"
        )
    
    # Access control
    if current_user.role == "student" and profile.owner_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to view these snapshots"
        )
    
    snapshots = db.query(ProfileSnapshot).filter(
        ProfileSnapshot.profile_id == profile_id
    ).order_by(ProfileSnapshot.created_at.desc()).all()
    
    return snapshots
