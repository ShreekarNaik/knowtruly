from sqlalchemy import Column, String, Integer, Float, DateTime, ForeignKey, JSON, Text, Enum, Boolean
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid
import enum
from app.db.base import Base

class ProficiencyLevel(str, enum.Enum):
    BEGINNER = "beginner"
    INTERMEDIATE = "intermediate"
    ADVANCED = "advanced"
    EXPERT = "expert"

class Profile(Base):
    __tablename__ = "profiles"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    owner_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    version = Column(Integer, default=1, nullable=False)
    
    # Basic Information
    canonical_name = Column(String, nullable=False)
    headline = Column(String)
    summary = Column(Text)
    
    # Contact Information (stored as JSON)
    contact_handles = Column(JSON, default={})  # {email, phone, linkedin, github, portfolio}
    
    # Education (stored as JSON array)
    education = Column(JSON, default=[])
    # [{institution, degree, field_of_study, start_date, end_date, gpa, achievements}]
    
    # Work Experience (stored as JSON array)
    positions = Column(JSON, default=[])
    # [{title, company, start_date, end_date, description, skills_used}]
    
    # Skills (stored as JSON array)
    skills = Column(JSON, default=[])
    # [{name, proficiency, evidence_ids, verified}]
    
    # Projects (stored as JSON array)
    projects = Column(JSON, default=[])
    # [{id, title, role_description, artifacts, start_date, end_date, technologies, metrics}]
    
    # Badges and Achievements
    badges = Column(JSON, default=[])
    
    # Verifiable Claims (references to claim IDs)
    verifiable_claims = Column(JSON, default=[])
    
    # Embedding reference
    embedding_id = Column(String, index=True)
    
    # Metadata
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    def __repr__(self):
        return f"<Profile {self.canonical_name} v{self.version}>"

class ProfileSnapshot(Base):
    """Immutable snapshots of profiles for verifiable resumes."""
    __tablename__ = "profile_snapshots"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    profile_id = Column(UUID(as_uuid=True), ForeignKey("profiles.id"), nullable=False)
    version = Column(Integer, nullable=False)
    
    # Snapshot data (complete profile at time of snapshot)
    snapshot_data = Column(JSON, nullable=False)
    
    # Signature information (if signed)
    is_signed = Column(Boolean, default=False)
    signature_id = Column(UUID(as_uuid=True), ForeignKey("signatures.id"), nullable=True)
    
    # Metadata
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    def __repr__(self):
        return f"<ProfileSnapshot {self.id} v{self.version}>"
