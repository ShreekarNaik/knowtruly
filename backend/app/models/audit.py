"""
Audit and compliance models for tracking system activities.
"""
from sqlalchemy import Column, String, DateTime, JSON, Enum as SQLEnum
from sqlalchemy.dialects.postgresql import UUID
import uuid
from datetime import datetime
import enum

from app.db.base import Base


class AuditActionType(str, enum.Enum):
    """Types of auditable actions."""
    USER_REGISTERED = "user_registered"
    USER_LOGGED_IN = "user_logged_in"
    PROFILE_CREATED = "profile_created"
    PROFILE_UPDATED = "profile_updated"
    PROFILE_VIEWED = "profile_viewed"
    RESUME_GENERATED = "resume_generated"
    RESUME_DOWNLOADED = "resume_downloaded"
    MATCH_PERFORMED = "match_performed"
    CLAIM_SIGNED = "claim_signed"
    CLAIM_VERIFIED = "claim_verified"
    CLAIM_REVOKED = "claim_revoked"
    ACCESS_REQUESTED = "access_requested"
    ACCESS_GRANTED = "access_granted"
    ACCESS_DENIED = "access_denied"
    DATA_EXPORTED = "data_exported"
    DATA_DELETED = "data_deleted"


class AuditLog(Base):
    """Audit log for compliance and security tracking."""
    __tablename__ = "audit_logs"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    
    # Who performed the action
    actor_id = Column(UUID(as_uuid=True), nullable=False, index=True)
    actor_role = Column(String, nullable=False)
    
    # What action was performed
    action_type = Column(
        SQLEnum(AuditActionType, native_enum=False),
        nullable=False,
        index=True
    )
    
    # What entity was affected
    entity_type = Column(String, nullable=True)  # profile, resume, claim, etc.
    entity_id = Column(UUID(as_uuid=True), nullable=True, index=True)
    
    # Additional context
    context_data = Column(JSON, nullable=True)  # IP, user agent, details
    
    # When it happened
    timestamp = Column(DateTime(timezone=True), default=datetime.utcnow, nullable=False, index=True)
    
    # Result of action
    success = Column(String, nullable=False, default="success")  # success, failure, error
    error_message = Column(String, nullable=True)


class ConsentRecord(Base):
    """Record of user consent for data access."""
    __tablename__ = "consent_records"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    
    # Data subject (student)
    subject_id = Column(UUID(as_uuid=True), nullable=False, index=True)
    
    # Data requester (recruiter)
    requester_id = Column(UUID(as_uuid=True), nullable=False, index=True)
    
    # What data is requested
    data_type = Column(String, nullable=False)  # full_profile, resume, contact_info
    purpose = Column(String, nullable=False)  # job_application, screening, etc.
    
    # Consent details
    granted = Column(String, nullable=False, default="pending")  # pending, granted, denied, revoked
    granted_at = Column(DateTime(timezone=True), nullable=True)
    revoked_at = Column(DateTime(timezone=True), nullable=True)
    expires_at = Column(DateTime(timezone=True), nullable=True)
    
    # Request details
    requested_at = Column(DateTime(timezone=True), default=datetime.utcnow, nullable=False)
    request_message = Column(String, nullable=True)
    
    # Metadata
    context_data = Column(JSON, nullable=True)


class DataAccessLog(Base):
    """Log of actual data access (after consent granted)."""
    __tablename__ = "data_access_logs"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    
    # Who accessed the data
    accessor_id = Column(UUID(as_uuid=True), nullable=False, index=True)
    accessor_role = Column(String, nullable=False)
    
    # What data was accessed
    subject_id = Column(UUID(as_uuid=True), nullable=False, index=True)
    data_type = Column(String, nullable=False)
    entity_id = Column(UUID(as_uuid=True), nullable=True)
    
    # Consent reference
    consent_id = Column(UUID(as_uuid=True), nullable=True)
    
    # Access details
    accessed_at = Column(DateTime(timezone=True), default=datetime.utcnow, nullable=False, index=True)
    access_method = Column(String, nullable=False)  # api, download, view
    ip_address = Column(String, nullable=True)
    user_agent = Column(String, nullable=True)
    
    # Metadata
    context_data = Column(JSON, nullable=True)
