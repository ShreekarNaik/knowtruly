from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional, Dict, Any
from datetime import datetime
from uuid import UUID

# Contact Information
class ContactHandles(BaseModel):
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    linkedin: Optional[str] = None
    github: Optional[str] = None
    portfolio: Optional[str] = None

# Education
class Education(BaseModel):
    institution: str
    degree: str
    field_of_study: str
    start_date: str
    end_date: Optional[str] = None
    gpa: Optional[float] = None
    achievements: List[str] = []

# Work Position
class Position(BaseModel):
    title: str
    company: str
    start_date: str
    end_date: Optional[str] = None
    description: Optional[str] = None
    skills_used: List[str] = []

# Skill
class Skill(BaseModel):
    name: str
    proficiency: str = Field(..., pattern="^(beginner|intermediate|advanced|expert)$")
    evidence_ids: List[str] = []
    verified: bool = False

# Project
class Project(BaseModel):
    id: Optional[str] = None
    title: str
    role_description: Optional[str] = None
    artifacts: List[str] = []
    start_date: str
    end_date: Optional[str] = None
    technologies: List[str] = []
    metrics: Dict[str, Any] = {}

# Profile Creation Request
class ProfileCreate(BaseModel):
    canonical_name: str
    headline: Optional[str] = None
    summary: Optional[str] = None
    contact_handles: ContactHandles = ContactHandles()
    education: List[Education] = []
    positions: List[Position] = []
    skills: List[Skill] = []
    projects: List[Project] = []
    badges: List[str] = []

# Profile Update Request
class ProfileUpdate(BaseModel):
    canonical_name: Optional[str] = None
    headline: Optional[str] = None
    summary: Optional[str] = None
    contact_handles: Optional[ContactHandles] = None
    education: Optional[List[Education]] = None
    positions: Optional[List[Position]] = None
    skills: Optional[List[Skill]] = None
    projects: Optional[List[Project]] = None
    badges: Optional[List[str]] = None

# Profile Response
class ProfileResponse(BaseModel):
    id: UUID
    owner_id: UUID
    version: int
    canonical_name: str
    headline: Optional[str] = None
    summary: Optional[str] = None
    contact_handles: Dict[str, Any]
    education: List[Dict[str, Any]]
    positions: List[Dict[str, Any]]
    skills: List[Dict[str, Any]]
    projects: List[Dict[str, Any]]
    badges: List[str]
    verifiable_claims: List[str]
    embedding_id: Optional[str] = None
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

# Profile Creation Response
class ProfileCreateResponse(BaseModel):
    profile_id: UUID
    version: int
    embedding_id: str

# Profile Snapshot Response
class ProfileSnapshotResponse(BaseModel):
    id: UUID
    profile_id: UUID
    version: int
    snapshot_data: Dict[str, Any]
    is_signed: bool
    signature_id: Optional[UUID] = None
    created_at: datetime

    class Config:
        from_attributes = True
