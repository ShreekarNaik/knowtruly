"""
Audit and compliance service for tracking system activities.
"""
from typing import Optional, Dict, Any
from sqlalchemy.orm import Session
from datetime import datetime
import uuid

from app.models.audit import AuditLog, AuditActionType, ConsentRecord, DataAccessLog

class AuditService:
    """Service for audit logging and compliance tracking."""
    
    def log_action(
        self,
        db: Session,
        actor_id: uuid.UUID,
        actor_role: str,
        action_type: AuditActionType,
        entity_type: Optional[str] = None,
        entity_id: Optional[uuid.UUID] = None,
        metadata: Optional[Dict[str, Any]] = None,
        success: str = "success",
        error_message: Optional[str] = None
    ) -> AuditLog:
        """
        Log an auditable action.
        
        Args:
            db: Database session
            actor_id: ID of user performing action
            actor_role: Role of actor (student, recruiter, issuer, admin)
            action_type: Type of action from AuditActionType enum
            entity_type: Type of entity affected (optional)
            entity_id: ID of entity affected (optional)
            metadata: Additional context (IP, user agent, etc.)
            success: Result status (success, failure, error)
            error_message: Error details if failed
            
        Returns:
            Created AuditLog instance
        """
        audit_log = AuditLog(
            actor_id=actor_id,
            actor_role=actor_role,
            action_type=action_type,
            entity_type=entity_type,
            entity_id=entity_id,
            context_data=metadata or {},
            success=success,
            error_message=error_message
        )
        
        db.add(audit_log)
        db.commit()
        db.refresh(audit_log)
        
        return audit_log
    
    def get_user_audit_trail(
        self,
        db: Session,
        user_id: uuid.UUID,
        limit: int = 100
    ) -> list:
        """Get audit trail for a specific user."""
        return db.query(AuditLog).filter(
            AuditLog.actor_id == user_id
        ).order_by(
            AuditLog.timestamp.desc()
        ).limit(limit).all()
    
    def get_entity_audit_trail(
        self,
        db: Session,
        entity_id: uuid.UUID,
        entity_type: Optional[str] = None,
        limit: int = 100
    ) -> list:
        """Get audit trail for a specific entity."""
        query = db.query(AuditLog).filter(
            AuditLog.entity_id == entity_id
        )
        
        if entity_type:
            query = query.filter(AuditLog.entity_type == entity_type)
        
        return query.order_by(
            AuditLog.timestamp.desc()
        ).limit(limit).all()
    
    def request_consent(
        self,
        db: Session,
        subject_id: uuid.UUID,
        requester_id: uuid.UUID,
        data_type: str,
        purpose: str,
        request_message: Optional[str] = None,
        expires_days: int = 30
    ) -> ConsentRecord:
        """
        Create a consent request for data access.
        
        Args:
            db: Database session
            subject_id: Student whose data is requested
            requester_id: Recruiter requesting access
            data_type: Type of data (full_profile, resume, contact_info)
            purpose: Reason for access
            request_message: Optional message to student
            expires_days: Consent validity period if granted
            
        Returns:
            Created ConsentRecord
        """
        from datetime import timedelta
        
        consent = ConsentRecord(
            subject_id=subject_id,
            requester_id=requester_id,
            data_type=data_type,
            purpose=purpose,
            request_message=request_message,
            granted="pending",
            expires_at=datetime.utcnow() + timedelta(days=expires_days)
        )
        
        db.add(consent)
        db.commit()
        db.refresh(consent)
        
        # Log the request
        self.log_action(
            db=db,
            actor_id=requester_id,
            actor_role="recruiter",
            action_type=AuditActionType.ACCESS_REQUESTED,
            entity_type="consent",
            entity_id=consent.id,
            metadata={
                "subject_id": str(subject_id),
                "data_type": data_type,
                "purpose": purpose
            }
        )
        
        return consent
    
    def grant_consent(
        self,
        db: Session,
        consent_id: uuid.UUID,
        subject_id: uuid.UUID
    ) -> ConsentRecord:
        """Grant a consent request (student approves)."""
        consent = db.query(ConsentRecord).filter(
            ConsentRecord.id == consent_id,
            ConsentRecord.subject_id == subject_id
        ).first()
        
        if not consent:
            raise ValueError("Consent request not found")
        
        if consent.granted != "pending":
            raise ValueError("Consent already processed")
        
        consent.granted = "granted"
        consent.granted_at = datetime.utcnow()
        
        db.commit()
        db.refresh(consent)
        
        # Log the grant
        self.log_action(
            db=db,
            actor_id=subject_id,
            actor_role="student",
            action_type=AuditActionType.ACCESS_GRANTED,
            entity_type="consent",
            entity_id=consent.id,
            metadata={
                "requester_id": str(consent.requester_id),
                "data_type": consent.data_type
            }
        )
        
        return consent
    
    def deny_consent(
        self,
        db: Session,
        consent_id: uuid.UUID,
        subject_id: uuid.UUID
    ) -> ConsentRecord:
        """Deny a consent request (student rejects)."""
        consent = db.query(ConsentRecord).filter(
            ConsentRecord.id == consent_id,
            ConsentRecord.subject_id == subject_id
        ).first()
        
        if not consent:
            raise ValueError("Consent request not found")
        
        if consent.granted != "pending":
            raise ValueError("Consent already processed")
        
        consent.granted = "denied"
        consent.granted_at = datetime.utcnow()
        
        db.commit()
        db.refresh(consent)
        
        # Log the denial
        self.log_action(
            db=db,
            actor_id=subject_id,
            actor_role="student",
            action_type=AuditActionType.ACCESS_DENIED,
            entity_type="consent",
            entity_id=consent.id,
            metadata={
                "requester_id": str(consent.requester_id),
                "data_type": consent.data_type
            }
        )
        
        return consent
    
    def revoke_consent(
        self,
        db: Session,
        consent_id: uuid.UUID,
        subject_id: uuid.UUID
    ) -> ConsentRecord:
        """Revoke previously granted consent."""
        consent = db.query(ConsentRecord).filter(
            ConsentRecord.id == consent_id,
            ConsentRecord.subject_id == subject_id
        ).first()
        
        if not consent:
            raise ValueError("Consent not found")
        
        if consent.granted != "granted":
            raise ValueError("Can only revoke granted consent")
        
        consent.granted = "revoked"
        consent.revoked_at = datetime.utcnow()
        
        db.commit()
        db.refresh(consent)
        
        # Log the revocation
        self.log_action(
            db=db,
            actor_id=subject_id,
            actor_role="student",
            action_type=AuditActionType.ACCESS_DENIED,
            entity_type="consent",
            entity_id=consent.id,
            metadata={
                "requester_id": str(consent.requester_id),
                "revoked": True
            }
        )
        
        return consent
    
    def check_consent(
        self,
        db: Session,
        subject_id: uuid.UUID,
        requester_id: uuid.UUID,
        data_type: str
    ) -> Optional[ConsentRecord]:
        """Check if valid consent exists for data access."""
        return db.query(ConsentRecord).filter(
            ConsentRecord.subject_id == subject_id,
            ConsentRecord.requester_id == requester_id,
            ConsentRecord.data_type == data_type,
            ConsentRecord.granted == "granted",
            ConsentRecord.expires_at > datetime.utcnow()
        ).first()
    
    def log_data_access(
        self,
        db: Session,
        accessor_id: uuid.UUID,
        accessor_role: str,
        subject_id: uuid.UUID,
        data_type: str,
        entity_id: Optional[uuid.UUID] = None,
        consent_id: Optional[uuid.UUID] = None,
        access_method: str = "api",
        ip_address: Optional[str] = None,
        user_agent: Optional[str] = None,
        metadata: Optional[Dict[str, Any]] = None
    ) -> DataAccessLog:
        """Log when data is actually accessed after consent."""
        access_log = DataAccessLog(
            accessor_id=accessor_id,
            accessor_role=accessor_role,
            subject_id=subject_id,
            data_type=data_type,
            entity_id=entity_id,
            consent_id=consent_id,
            access_method=access_method,
            ip_address=ip_address,
            user_agent=user_agent,
            context_data=metadata or {}
        )
        
        db.add(access_log)
        db.commit()
        db.refresh(access_log)
        
        return access_log
    
    def get_user_data_access_logs(
        self,
        db: Session,
        subject_id: uuid.UUID,
        limit: int = 100
    ) -> list:
        """Get all data access logs for a user (who accessed their data)."""
        return db.query(DataAccessLog).filter(
            DataAccessLog.subject_id == subject_id
        ).order_by(
            DataAccessLog.accessed_at.desc()
        ).limit(limit).all()

# Global service instance
audit_service = AuditService()
