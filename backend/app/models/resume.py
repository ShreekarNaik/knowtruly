from sqlalchemy import Column, String, DateTime, ForeignKey, JSON, Text, Boolean
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
import uuid
from app.db.base import Base

class ResumeTemplate(Base):
    """Resume templates for generation."""
    __tablename__ = "resume_templates"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    
    # Template Information
    name = Column(String, nullable=False, unique=True)
    description = Column(Text)
    layout_type = Column(String, nullable=False)  # single_column, two_column, modern, academic
    
    # Template Files
    typst_file = Column(String, nullable=False)  # Path to .typ file
    preview_url = Column(String)  # Preview image URL
    
    # Configuration
    page_constraints = Column(JSON, default={})  # {max_pages, max_chars_per_section}
    field_mappings = Column(JSON, default={})  # {sections: [...]}
    style_metadata = Column(JSON, default={})  # Colors, fonts, etc.
    
    # Metadata
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    def __repr__(self):
        return f"<ResumeTemplate {self.name}>"

class GeneratedResume(Base):
    """Generated resumes with metadata."""
    __tablename__ = "generated_resumes"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    
    # References
    profile_id = Column(UUID(as_uuid=True), ForeignKey("profiles.id"), nullable=False)
    snapshot_id = Column(UUID(as_uuid=True), ForeignKey("profile_snapshots.id"), nullable=True)
    template_id = Column(UUID(as_uuid=True), ForeignKey("resume_templates.id"), nullable=False)
    
    # Role Context
    role_descriptor = Column(JSON)  # Job description context for this resume
    
    # Generation Details
    format = Column(String, default="pdf")  # pdf, docx, html
    file_path = Column(String, nullable=False)  # Path to generated file
    download_url = Column(String)  # Public download URL
    
    # Generation Metadata
    generation_metadata = Column(JSON, default={})
    # {rephrased_sections, template_used, llm_model, generation_time}
    
    # Options Used
    ai_rephrase = Column(Boolean, default=False)
    max_pages = Column(Integer, default=2)
    
    # Metadata
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    def __repr__(self):
        return f"<GeneratedResume {self.id}>"

class RoleDescriptor(Base):
    """Job descriptions for matching and resume generation."""
    __tablename__ = "role_descriptors"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    
    # Basic Information
    title = Column(String, nullable=False)
    company = Column(String)
    description = Column(Text, nullable=False)
    
    # Skills
    required_skills = Column(JSON, default=[])  # List of required skills
    preferred_skills = Column(JSON, default=[])  # List of preferred skills
    
    # Constraints
    constraints = Column(JSON, default={})
    # {location, remote, availability, min_degree, min_experience_years}
    
    # Embedding reference
    embedding_id = Column(String, index=True)
    
    # Creator
    created_by = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    
    # Metadata
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    def __repr__(self):
        return f"<RoleDescriptor {self.title} at {self.company}>"

class MatchResult(Base):
    """Stored matching results between candidates and roles."""
    __tablename__ = "match_results"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    
    # Match Parties
    candidate_profile_id = Column(UUID(as_uuid=True), ForeignKey("profiles.id"), nullable=False)
    role_id = Column(UUID(as_uuid=True), ForeignKey("role_descriptors.id"), nullable=False)
    
    # Match Score
    score = Column(Float, nullable=False)  # 0.0 to 1.0
    
    # Explanation
    explanation = Column(JSON, default={})
    # {top_matching_skills, top_evidence, gaps, vector_similarity, rule_score}
    
    # Metadata
    matched_at = Column(DateTime(timezone=True), server_default=func.now())
    
    def __repr__(self):
        return f"<MatchResult score={self.score:.2f}>"
