from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID
import time
import uuid as uuid_lib

from app.db.base import get_db
from app.api.deps import get_current_user, get_current_active_student
from app.models.user import User
from app.models.profile import Profile, ProfileSnapshot
from app.models.resume import GeneratedResume, ResumeTemplate
from app.schemas.resume import (
    ResumeGenerateRequest,
    ResumeGenerateResponse,
    ResumeGenerationMetadata,
    ResumeResponse,
    TemplateResponse,
    RephraseRequest,
    RephraseResponse
)
from app.services.typst_service import typst_service
from app.services.llm_service import llm_service

router = APIRouter()

@router.post("/generate", response_model=ResumeGenerateResponse)
async def generate_resume(
    request: ResumeGenerateRequest,
    current_user: User = Depends(get_current_active_student),
    db: Session = Depends(get_db)
):
    """
    Generate a role-specific resume from profile data.
    
    - **profile_id**: Profile UUID to generate resume from
    - **template_name**: Typst template name (default: basic_resume)
    - **role_descriptor**: Optional job description for tailoring
    - **options**: Generation options (AI rephrasing, format, max pages)
    
    Returns generated resume with download URL.
    """
    start_time = time.time()
    
    # Fetch profile
    profile = db.query(Profile).filter(
        Profile.id == request.profile_id,
        Profile.owner_id == current_user.id
    ).first()
    
    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Profile not found or not authorized"
        )
    
    # Create immutable snapshot
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
    
    # Prepare profile data for resume
    profile_data = snapshot_data.copy()
    rephrased_sections = []
    
    # Apply AI rephrasing if requested
    if request.options.ai_rephrase:
        # Rephrase summary
        if profile_data.get("summary"):
            rephrase_result = await llm_service.rephrase_text(
                original_text=profile_data["summary"],
                context="resume_summary",
                max_chars=500,
                tone=request.options.tone,
                preserve_claims=True
            )
            profile_data["summary"] = rephrase_result["rephrased_text"]
            rephrased_sections.append("summary")
        
        # Rephrase project descriptions
        if profile_data.get("projects"):
            for i, project in enumerate(profile_data["projects"]):
                if project.get("description"):
                    rephrase_result = await llm_service.rephrase_text(
                        original_text=project["description"],
                        context="project_description",
                        max_chars=200,
                        tone=request.options.tone
                    )
                    profile_data["projects"][i]["description"] = rephrase_result["rephrased_text"]
            rephrased_sections.append("projects")
    
    # Get or create template
    template_name = request.template_name or "basic_resume"
    template = db.query(ResumeTemplate).filter(
        ResumeTemplate.name == template_name
    ).first()
    
    if not template:
        # Create basic template entry if it doesn't exist
        template = ResumeTemplate(
            name=template_name,
            description="Basic resume template",
            layout_type="single_column",
            typst_file=f"{template_name}.typ",
            is_active=True
        )
        db.add(template)
        db.commit()
        db.refresh(template)
    
    # Compile resume with Typst
    try:
        compilation_result = await typst_service.compile_resume(
            template_name=template_name,
            profile_data=profile_data,
            options={"format": request.options.format}
        )
        
        if not compilation_result["success"]:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Resume compilation failed: {compilation_result.get('error')}"
            )
        
    except FileNotFoundError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Resume generation failed: {str(e)}"
        )
    
    # Calculate generation time
    generation_time = time.time() - start_time
    
    # Create resume record
    generated_resume = GeneratedResume(
        profile_id=profile.id,
        snapshot_id=snapshot.id,
        template_id=template.id,
        role_descriptor=request.role_descriptor,
        format=request.options.format,
        file_path=compilation_result["file_path"],
        download_url=f"/api/v1/resumes/{uuid_lib.uuid4()}/download",  # Placeholder
        generation_metadata={
            "rephrased_sections": rephrased_sections,
            "template_used": template_name,
            "llm_model": "gemini-pro" if request.options.ai_rephrase else None,
            "compilation_time": compilation_result["compilation_time"],
            "total_generation_time": generation_time
        },
        ai_rephrase=request.options.ai_rephrase,
        max_pages=request.options.max_pages
    )
    
    db.add(generated_resume)
    db.commit()
    db.refresh(generated_resume)
    
    # Update download URL with actual resume ID
    generated_resume.download_url = f"/api/v1/resumes/{generated_resume.id}/download"
    db.commit()
    
    return ResumeGenerateResponse(
        resume_id=generated_resume.id,
        snapshot_id=snapshot.id,
        download_url=generated_resume.download_url,
        format=generated_resume.format,
        generation_metadata=ResumeGenerationMetadata(
            rephrased_sections=rephrased_sections,
            template_used=template_name,
            llm_model="gemini-pro" if request.options.ai_rephrase else None,
            generation_time_seconds=generation_time,
            ai_rephrase_used=request.options.ai_rephrase
        )
    )

@router.get("/{resume_id}", response_model=ResumeResponse)
async def get_resume(
    resume_id: UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get resume metadata by ID."""
    resume = db.query(GeneratedResume).filter(
        GeneratedResume.id == resume_id
    ).first()
    
    if not resume:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Resume not found"
        )
    
    # Check authorization
    profile = db.query(Profile).filter(Profile.id == resume.profile_id).first()
    if profile and profile.owner_id != current_user.id and current_user.role != "recruiter":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to view this resume"
        )
    
    return resume

@router.get("/{resume_id}/download")
async def download_resume(
    resume_id: UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Download generated resume file."""
    resume = db.query(GeneratedResume).filter(
        GeneratedResume.id == resume_id
    ).first()
    
    if not resume:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Resume not found"
        )
    
    # Check authorization
    profile = db.query(Profile).filter(Profile.id == resume.profile_id).first()
    if profile and profile.owner_id != current_user.id and current_user.role != "recruiter":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to download this resume"
        )
    
    # Check if file exists
    from pathlib import Path
    file_path = Path(resume.file_path)
    if not file_path.exists():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Resume file not found"
        )
    
    return FileResponse(
        path=str(file_path),
        filename=f"resume_{resume_id}.{resume.format}",
        media_type=f"application/{resume.format}"
    )

@router.get("", response_model=List[ResumeResponse])
async def list_user_resumes(
    current_user: User = Depends(get_current_active_student),
    db: Session = Depends(get_db)
):
    """List all resumes for current user."""
    # Get user's profile
    profile = db.query(Profile).filter(Profile.owner_id == current_user.id).first()
    
    if not profile:
        return []
    
    resumes = db.query(GeneratedResume).filter(
        GeneratedResume.profile_id == profile.id
    ).order_by(GeneratedResume.created_at.desc()).all()
    
    return resumes

@router.get("/templates/list", response_model=List[TemplateResponse])
async def list_templates(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """List all available resume templates."""
    templates = db.query(ResumeTemplate).filter(
        ResumeTemplate.is_active == True
    ).all()
    
    return templates

@router.post("/rephrase", response_model=RephraseResponse)
async def rephrase_text_endpoint(
    request: RephraseRequest,
    current_user: User = Depends(get_current_user)
):
    """
    Rephrase text using LLM (utility endpoint for testing).
    
    Useful for previewing AI rephrasing before generating full resume.
    """
    result = await llm_service.rephrase_text(
        original_text=request.original_text,
        context=request.context,
        max_chars=request.max_chars,
        tone=request.tone,
        preserve_claims=request.preserve_claims
    )
    
    return RephraseResponse(**result)
