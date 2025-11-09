"""
Audit and compliance API endpoints.
"""
from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID
from datetime import datetime, timedelta

from app.db.base import get_db
from app.api.deps import get_current_user, get_current_active_student, get_current_active_recruiter
from app.models.user import User
from app.models.audit import AuditActionType, ConsentRecord
from app.schemas.audit import (
    AuditLogResponse,
    AuditTrailResponse,
    ConsentRequest,
    ConsentResponse,
    ConsentDecision,
    DataAccessLogResponse,
    DataExportRequest,
    DataDeletionRequest,
    PrivacyDashboardResponse
)
from app.services.audit_service import audit_service

router = APIRouter()

# ===== AUDIT LOG ENDPOINTS =====

@router.get("/logs/me", response_model=AuditTrailResponse)
async def get_my_audit_logs(
    limit: int = 100,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get audit logs for current user."""
    logs = audit_service.get_user_audit_trail(
        db=db,
        user_id=current_user.id,
        limit=limit
    )
    
    return AuditTrailResponse(
        logs=[AuditLogResponse.model_validate(log) for log in logs],
        total=len(logs)
    )

@router.get("/logs/entity/{entity_id}", response_model=AuditTrailResponse)
async def get_entity_audit_logs(
    entity_id: UUID,
    entity_type: str = None,
    limit: int = 100,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get audit logs for a specific entity."""
    logs = audit_service.get_entity_audit_trail(
        db=db,
        entity_id=entity_id,
        entity_type=entity_type,
        limit=limit
    )
    
    return AuditTrailResponse(
        logs=[AuditLogResponse.model_validate(log) for log in logs],
        total=len(logs)
    )

# ===== CONSENT MANAGEMENT ENDPOINTS =====

@router.post("/consent/request", response_model=ConsentResponse)
async def request_data_access(
    request: ConsentRequest,
    current_user: User = Depends(get_current_active_recruiter),
    db: Session = Depends(get_db)
):
    """
    Request access to candidate data (recruiter only).
    
    - **subject_id**: Student profile to access
    - **data_type**: full_profile, resume, or contact_info
    - **purpose**: Reason for requesting access
    """
    try:
        consent = audit_service.request_consent(
            db=db,
            subject_id=request.subject_id,
            requester_id=current_user.id,
            data_type=request.data_type,
            purpose=request.purpose,
            request_message=request.request_message,
            expires_days=request.expires_days
        )
        
        return ConsentResponse.model_validate(consent)
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create consent request: {str(e)}"
        )

@router.get("/consent/pending", response_model=List[ConsentResponse])
async def get_pending_consent_requests(
    current_user: User = Depends(get_current_active_student),
    db: Session = Depends(get_db)
):
    """Get all pending consent requests for current student."""
    from app.models.profile import Profile
    
    # Get student's profile
    profile = db.query(Profile).filter(
        Profile.owner_id == current_user.id
    ).first()
    
    if not profile:
        return []
    
    consents = db.query(ConsentRecord).filter(
        ConsentRecord.subject_id == profile.id,
        ConsentRecord.granted == "pending"
    ).order_by(ConsentRecord.requested_at.desc()).all()
    
    return [ConsentResponse.model_validate(c) for c in consents]

@router.post("/consent/decide", response_model=ConsentResponse)
async def decide_on_consent(
    decision: ConsentDecision,
    current_user: User = Depends(get_current_active_student),
    db: Session = Depends(get_db)
):
    """
    Grant or deny a consent request (student only).
    
    - **consent_id**: ID of consent request
    - **decision**: "grant" or "deny"
    """
    from app.models.profile import Profile
    
    # Get student's profile
    profile = db.query(Profile).filter(
        Profile.owner_id == current_user.id
    ).first()
    
    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Profile not found"
        )
    
    try:
        if decision.decision.lower() == "grant":
            consent = audit_service.grant_consent(
                db=db,
                consent_id=decision.consent_id,
                subject_id=profile.id
            )
        elif decision.decision.lower() == "deny":
            consent = audit_service.deny_consent(
                db=db,
                consent_id=decision.consent_id,
                subject_id=profile.id
            )
        else:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Decision must be 'grant' or 'deny'"
            )
        
        return ConsentResponse.model_validate(consent)
        
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to process consent decision: {str(e)}"
        )

@router.post("/consent/{consent_id}/revoke", response_model=ConsentResponse)
async def revoke_consent(
    consent_id: UUID,
    current_user: User = Depends(get_current_active_student),
    db: Session = Depends(get_db)
):
    """Revoke previously granted consent (student only)."""
    from app.models.profile import Profile
    
    profile = db.query(Profile).filter(
        Profile.owner_id == current_user.id
    ).first()
    
    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Profile not found"
        )
    
    try:
        consent = audit_service.revoke_consent(
            db=db,
            consent_id=consent_id,
            subject_id=profile.id
        )
        
        return ConsentResponse.model_validate(consent)
        
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

@router.get("/consent/active", response_model=List[ConsentResponse])
async def get_active_consents(
    current_user: User = Depends(get_current_active_student),
    db: Session = Depends(get_db)
):
    """Get all active consents for current student."""
    from app.models.profile import Profile
    
    profile = db.query(Profile).filter(
        Profile.owner_id == current_user.id
    ).first()
    
    if not profile:
        return []
    
    consents = db.query(ConsentRecord).filter(
        ConsentRecord.subject_id == profile.id,
        ConsentRecord.granted == "granted",
        ConsentRecord.expires_at > datetime.utcnow()
    ).order_by(ConsentRecord.granted_at.desc()).all()
    
    return [ConsentResponse.model_validate(c) for c in consents]

# ===== DATA ACCESS LOGS =====

@router.get("/access-logs/me", response_model=List[DataAccessLogResponse])
async def get_my_data_access_logs(
    limit: int = 100,
    current_user: User = Depends(get_current_active_student),
    db: Session = Depends(get_db)
):
    """Get logs of who accessed my data (student only)."""
    from app.models.profile import Profile
    
    profile = db.query(Profile).filter(
        Profile.owner_id == current_user.id
    ).first()
    
    if not profile:
        return []
    
    logs = audit_service.get_user_data_access_logs(
        db=db,
        subject_id=profile.id,
        limit=limit
    )
    
    return [DataAccessLogResponse.model_validate(log) for log in logs]

# ===== PRIVACY DASHBOARD =====

@router.get("/privacy/dashboard", response_model=PrivacyDashboardResponse)
async def get_privacy_dashboard(
    current_user: User = Depends(get_current_active_student),
    db: Session = Depends(get_db)
):
    """Get privacy dashboard with consent and access information."""
    from app.models.profile import Profile
    from app.models.audit import DataAccessLog
    
    profile = db.query(Profile).filter(
        Profile.owner_id == current_user.id
    ).first()
    
    if not profile:
        return PrivacyDashboardResponse(
            pending_consent_requests=0,
            active_consents=0,
            data_access_count_30_days=0,
            recent_access_logs=[],
            recent_consent_requests=[]
        )
    
    # Count pending requests
    pending_count = db.query(ConsentRecord).filter(
        ConsentRecord.subject_id == profile.id,
        ConsentRecord.granted == "pending"
    ).count()
    
    # Count active consents
    active_count = db.query(ConsentRecord).filter(
        ConsentRecord.subject_id == profile.id,
        ConsentRecord.granted == "granted",
        ConsentRecord.expires_at > datetime.utcnow()
    ).count()
    
    # Count recent access
    thirty_days_ago = datetime.utcnow() - timedelta(days=30)
    access_count = db.query(DataAccessLog).filter(
        DataAccessLog.subject_id == profile.id,
        DataAccessLog.accessed_at > thirty_days_ago
    ).count()
    
    # Get recent access logs
    recent_access = db.query(DataAccessLog).filter(
        DataAccessLog.subject_id == profile.id
    ).order_by(DataAccessLog.accessed_at.desc()).limit(10).all()
    
    # Get recent consent requests
    recent_consents = db.query(ConsentRecord).filter(
        ConsentRecord.subject_id == profile.id
    ).order_by(ConsentRecord.requested_at.desc()).limit(10).all()
    
    return PrivacyDashboardResponse(
        pending_consent_requests=pending_count,
        active_consents=active_count,
        data_access_count_30_days=access_count,
        recent_access_logs=[DataAccessLogResponse.model_validate(log) for log in recent_access],
        recent_consent_requests=[ConsentResponse.model_validate(c) for c in recent_consents]
    )

# ===== GDPR COMPLIANCE =====

@router.post("/gdpr/export")
async def export_my_data(
    request: DataExportRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Export all user data (GDPR compliance).
    
    Returns comprehensive data export including profile, audit logs, and access logs.
    """
    from app.models.profile import Profile
    
    profile = db.query(Profile).filter(
        Profile.owner_id == current_user.id
    ).first()
    
    export_data = {
        "user": {
            "id": str(current_user.id),
            "email": current_user.email,
            "role": current_user.role,
            "created_at": current_user.created_at.isoformat() if current_user.created_at else None
        },
        "profile": None,
        "audit_logs": [],
        "data_access_logs": [],
        "consents": []
    }
    
    if profile:
        export_data["profile"] = {
            "id": str(profile.id),
            "canonical_name": profile.canonical_name,
            "headline": profile.headline,
            "summary": profile.summary,
            "contact_handles": profile.contact_handles,
            "education": profile.education,
            "positions": profile.positions,
            "skills": profile.skills,
            "projects": profile.projects
        }
        
        if request.include_audit_logs:
            logs = audit_service.get_user_audit_trail(db, current_user.id, limit=1000)
            export_data["audit_logs"] = [
                {
                    "action": log.action_type,
                    "timestamp": log.timestamp.isoformat(),
                    "entity_type": log.entity_type,
                    "success": log.success
                }
                for log in logs
            ]
        
        if request.include_access_logs:
            access_logs = audit_service.get_user_data_access_logs(db, profile.id, limit=1000)
            export_data["data_access_logs"] = [
                {
                    "accessor_role": log.accessor_role,
                    "data_type": log.data_type,
                    "accessed_at": log.accessed_at.isoformat(),
                    "access_method": log.access_method
                }
                for log in access_logs
            ]
        
        # Include consent records
        consents = db.query(ConsentRecord).filter(
            ConsentRecord.subject_id == profile.id
        ).all()
        export_data["consents"] = [
            {
                "requester_id": str(c.requester_id),
                "data_type": c.data_type,
                "purpose": c.purpose,
                "granted": c.granted,
                "requested_at": c.requested_at.isoformat()
            }
            for c in consents
        ]
    
    # Log the export
    audit_service.log_action(
        db=db,
        actor_id=current_user.id,
        actor_role=current_user.role,
        action_type=AuditActionType.DATA_EXPORTED,
        metadata={"format": request.format}
    )
    
    return export_data

@router.post("/gdpr/delete")
async def delete_my_data(
    request: DataDeletionRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Delete all user data (GDPR right to be forgotten).
    
    **WARNING**: This is permanent and cannot be undone!
    """
    if request.confirmation != "DELETE MY DATA":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Must confirm with exact phrase: 'DELETE MY DATA'"
        )
    
    from app.models.profile import Profile
    
    # Log the deletion request BEFORE deleting
    audit_service.log_action(
        db=db,
        actor_id=current_user.id,
        actor_role=current_user.role,
        action_type=AuditActionType.DATA_DELETED,
        metadata={"reason": request.reason}
    )
    
    # Delete profile and related data
    profile = db.query(Profile).filter(
        Profile.owner_id == current_user.id
    ).first()
    
    if profile:
        # Delete consents
        db.query(ConsentRecord).filter(
            ConsentRecord.subject_id == profile.id
        ).delete()
        
        # Note: Audit logs are kept for compliance
        # Data access logs are kept for compliance
        
        # Delete profile
        db.delete(profile)
    
    # Anonymize user account
    current_user.email = f"deleted_{current_user.id}@deleted.local"
    current_user.is_active = False
    
    db.commit()
    
    return {
        "success": True,
        "message": "User data deleted successfully. Account deactivated.",
        "deleted_at": datetime.utcnow().isoformat()
    }
