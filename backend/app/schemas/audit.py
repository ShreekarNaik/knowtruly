"""
Pydantic schemas for audit and compliance.
"""
from pydantic import BaseModel, Field
from typing import Optional, Dict, Any, List
from datetime import datetime
from uuid import UUID

# Audit Log Schemas
class AuditLogResponse(BaseModel):
    """Response model for audit log entry."""
    id: UUID
    actor_id: UUID
    actor_role: str
    action_type: str
    entity_type: Optional[str]
    entity_id: Optional[UUID]
    metadata: Dict[str, Any]
    timestamp: datetime
    success: str
    error_message: Optional[str]
    
    class Config:
        from_attributes = True

class AuditTrailResponse(BaseModel):
    """Response model for audit trail."""
    logs: List[AuditLogResponse]
    total: int

# Consent Schemas
class ConsentRequest(BaseModel):
    """Request to access user data."""
    subject_id: UUID = Field(..., description="Student profile ID")
    data_type: str = Field(..., description="Type of data: full_profile, resume, contact_info")
    purpose: str = Field(..., description="Reason for data access")
    request_message: Optional[str] = Field(None, description="Optional message to student")
    expires_days: int = Field(30, description="Consent validity in days if granted")

class ConsentResponse(BaseModel):
    """Response model for consent record."""
    id: UUID
    subject_id: UUID
    requester_id: UUID
    data_type: str
    purpose: str
    granted: str  # pending, granted, denied, revoked
    granted_at: Optional[datetime]
    revoked_at: Optional[datetime]
    expires_at: Optional[datetime]
    requested_at: datetime
    request_message: Optional[str]
    
    class Config:
        from_attributes = True

class ConsentDecision(BaseModel):
    """Student decision on consent request."""
    consent_id: UUID
    decision: str = Field(..., description="grant or deny")

# Data Access Log Schemas
class DataAccessLogResponse(BaseModel):
    """Response model for data access log."""
    id: UUID
    accessor_id: UUID
    accessor_role: str
    subject_id: UUID
    data_type: str
    entity_id: Optional[UUID]
    consent_id: Optional[UUID]
    accessed_at: datetime
    access_method: str
    ip_address: Optional[str]
    user_agent: Optional[str]
    metadata: Dict[str, Any]
    
    class Config:
        from_attributes = True

# GDPR / Privacy Schemas
class DataExportRequest(BaseModel):
    """Request to export all user data."""
    format: str = Field("json", description="Export format: json or csv")
    include_audit_logs: bool = Field(True, description="Include audit trail")
    include_access_logs: bool = Field(True, description="Include data access logs")

class DataDeletionRequest(BaseModel):
    """Request to delete user data (GDPR right to be forgotten)."""
    confirmation: str = Field(..., description="Must be 'DELETE MY DATA' to confirm")
    reason: Optional[str] = Field(None, description="Optional reason for deletion")

class PrivacyDashboardResponse(BaseModel):
    """Privacy dashboard for students."""
    pending_consent_requests: int
    active_consents: int
    data_access_count_30_days: int
    recent_access_logs: List[DataAccessLogResponse]
    recent_consent_requests: List[ConsentResponse]

# Recruiter Portal Schemas
class RecruiterSearchRequest(BaseModel):
    """Advanced search request for recruiters."""
    query: Optional[str] = Field(None, description="Text search query")
    required_skills: Optional[List[str]] = Field(None, description="Must-have skills")
    preferred_skills: Optional[List[str]] = Field(None, description="Nice-to-have skills")
    min_experience_years: Optional[int] = Field(None, description="Minimum years of experience")
    education_level: Optional[str] = Field(None, description="Minimum education level")
    location: Optional[str] = Field(None, description="Location preference")
    remote_ok: Optional[bool] = Field(None, description="Open to remote work")
    availability: Optional[str] = Field(None, description="Availability: immediate, 2_weeks, 1_month")
    top_k: int = Field(20, description="Number of results to return", ge=1, le=100)

class CandidatePreview(BaseModel):
    """Minimal candidate info visible without consent."""
    candidate_id: UUID
    headline: Optional[str]
    skills_preview: List[str]  # Top 5 skills only
    experience_years: Optional[int]
    education_level: Optional[str]
    match_score: float
    location_match: bool
    has_verified_credentials: bool
    last_active: Optional[datetime]

class CandidateDetailedView(BaseModel):
    """Full candidate profile (requires consent)."""
    candidate_id: UUID
    canonical_name: str
    headline: str
    summary: str
    contact_handles: Dict[str, str]
    education: List[Dict[str, Any]]
    positions: List[Dict[str, Any]]
    skills: List[Dict[str, Any]]
    projects: List[Dict[str, Any]]
    verifiable_claims: List[Dict[str, Any]]
    match_explanation: Dict[str, Any]
    consent_id: UUID
    consent_expires_at: datetime
