from sqlalchemy import Column, String, DateTime, ForeignKey, JSON, Text, Enum, Boolean
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
import uuid
import enum
from app.db.base import Base

class ClaimType(str, enum.Enum):
    DEGREE = "degree"
    SKILL = "skill"
    EMPLOYMENT = "employment"
    PROJECT = "project"
    CERTIFICATION = "certification"

class ClaimStatus(str, enum.Enum):
    ACTIVE = "active"
    REVOKED = "revoked"
    EXPIRED = "expired"

class VerifiableClaim(Base):
    """Cryptographically signed claims issued by trusted parties."""
    __tablename__ = "verifiable_claims"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    
    # Issuer Information
    issuer_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    issuer_name = Column(String, nullable=False)
    
    # Subject Information
    subject_profile_id = Column(UUID(as_uuid=True), ForeignKey("profiles.id"), nullable=False)
    
    # Claim Details
    claim_type = Column(Enum(ClaimType), nullable=False)
    claim_payload = Column(JSON, nullable=False)
    
    # Signature
    signature = Column(Text, nullable=False)
    signature_algorithm = Column(String, default="RSA-SHA256")
    public_key = Column(Text)  # Issuer's public key for verification
    
    # Status and Validity
    status = Column(Enum(ClaimStatus), default=ClaimStatus.ACTIVE)
    issued_at = Column(DateTime(timezone=True), server_default=func.now())
    expires_at = Column(DateTime(timezone=True), nullable=True)
    revoked_at = Column(DateTime(timezone=True), nullable=True)
    revocation_reason = Column(String, nullable=True)
    
    # Metadata
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    def __repr__(self):
        return f"<VerifiableClaim {self.claim_type} for {self.subject_profile_id}>"

class Signature(Base):
    """Digital signatures for profile snapshots and claims."""
    __tablename__ = "signatures"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    
    # Signer Information
    signer_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    signer_name = Column(String, nullable=False)
    
    # Signed Entity
    entity_type = Column(String, nullable=False)  # "profile_snapshot", "claim", etc.
    entity_id = Column(UUID(as_uuid=True), nullable=False)
    
    # Signature Details
    signature = Column(Text, nullable=False)
    signature_algorithm = Column(String, default="RSA-SHA256")
    public_key = Column(Text, nullable=False)
    
    # Hash of signed content for verification
    content_hash = Column(String, nullable=False)
    
    # Metadata
    signed_at = Column(DateTime(timezone=True), server_default=func.now())
    
    def __repr__(self):
        return f"<Signature {self.entity_type}:{self.entity_id}>"
