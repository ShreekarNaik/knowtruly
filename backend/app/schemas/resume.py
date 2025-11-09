from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from datetime import datetime
from uuid import UUID

# Resume Generation Request
class ResumeGenerationOptions(BaseModel):
    ai_rephrase: bool = False
    max_pages: int = 2
    format: str = "pdf"  # pdf, docx, html
    tone: str = "professional"

class ResumeGenerateRequest(BaseModel):
    profile_id: UUID
    template_id: Optional[UUID] = None
    template_name: Optional[str] = "basic_resume"  # Default template
    role_descriptor: Optional[Dict[str, Any]] = None
    options: ResumeGenerationOptions = ResumeGenerationOptions()

# Resume Generation Response
class ResumeGenerationMetadata(BaseModel):
    rephrased_sections: List[str] = []
    template_used: str
    llm_model: Optional[str] = None
    generation_time_seconds: float
    ai_rephrase_used: bool

class ResumeGenerateResponse(BaseModel):
    resume_id: UUID
    snapshot_id: Optional[UUID] = None
    download_url: str
    format: str
    generation_metadata: ResumeGenerationMetadata

# Resume Response
class ResumeResponse(BaseModel):
    id: UUID
    profile_id: UUID
    snapshot_id: Optional[UUID] = None
    template_id: UUID
    format: str
    download_url: str
    created_at: datetime
    generation_metadata: Dict[str, Any]

    class Config:
        from_attributes = True

# Template Response
class TemplateResponse(BaseModel):
    id: UUID
    name: str
    description: Optional[str] = None
    layout_type: str
    preview_url: Optional[str] = None
    is_active: bool

    class Config:
        from_attributes = True

# LLM Rephrase Request
class RephraseRequest(BaseModel):
    original_text: str
    context: str = "resume_section"
    max_chars: Optional[int] = None
    tone: str = "professional"
    preserve_claims: bool = True

# LLM Rephrase Response
class RephraseResponse(BaseModel):
    rephrased_text: str
    tokens_used: int
    model_version: str
    preserved_claims: List[str]
    original_length: int
    rephrased_length: int
    fallback: bool = False
    error: Optional[str] = None
