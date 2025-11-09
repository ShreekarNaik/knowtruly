from pydantic import BaseModel
from typing import Dict, Any, Optional
from datetime import datetime
from uuid import UUID

# Key Pair Generation
class KeyPairResponse(BaseModel):
    private_key: str
    public_key: str
    algorithm: str
    key_size: int

# Claim Signing
class SignClaimRequest(BaseModel):
    subject_profile_id: UUID
    claim_type: str  # degree, skill, employment, project
    claim_payload: Dict[str, Any]
    expires_in_days: Optional[int] = None
    issuer_private_key: str  # PEM format

class SignClaimResponse(BaseModel):
    claim_id: UUID
    signature: str
    algorithm: str
    claim_data: Dict[str, Any]
    signed_at: datetime

# Claim Verification
class VerifyClaimRequest(BaseModel):
    claim_id: UUID
    issuer_public_key: str  # PEM format

class VerificationResult(BaseModel):
    valid: bool
    claim_id: Optional[UUID] = None
    issuer_id: Optional[UUID] = None
    subject_profile_id: Optional[UUID] = None
    claim_type: Optional[str] = None
    claim_payload: Optional[Dict[str, Any]] = None
    issued_at: Optional[datetime] = None
    expires_at: Optional[datetime] = None
    verified_at: Optional[datetime] = None
    error: Optional[str] = None

# Claim Revocation
class RevokeClaimRequest(BaseModel):
    claim_id: UUID
    reason: Optional[str] = None

class RevokeClaimResponse(BaseModel):
    success: bool
    claim_id: Optional[UUID] = None
    revoked_at: Optional[datetime] = None
    reason: Optional[str] = None
    error: Optional[str] = None

# Verifiable Claim Response
class VerifiableClaimResponse(BaseModel):
    id: UUID
    issuer_id: UUID
    issuer_name: Optional[str] = None
    subject_profile_id: UUID
    claim_type: str
    claim_payload: Dict[str, Any]
    issued_at: datetime
    expires_at: Optional[datetime] = None
    status: str
    revoked_at: Optional[datetime] = None
    revocation_reason: Optional[str] = None

    class Config:
        from_attributes = True
