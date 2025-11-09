from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from datetime import datetime
from uuid import UUID

# Role Descriptor Request
class RoleDescriptorCreate(BaseModel):
    title: str
    company: Optional[str] = None
    description: str
    required_skills: List[str] = []
    preferred_skills: List[str] = []
    constraints: Dict[str, Any] = {}

# Role Descriptor Response
class RoleDescriptorResponse(BaseModel):
    id: UUID
    title: str
    company: Optional[str] = None
    description: str
    required_skills: List[str]
    preferred_skills: List[str]
    constraints: Dict[str, Any]
    embedding_id: Optional[str] = None
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

# Match Request
class MatchRequest(BaseModel):
    role_descriptor: RoleDescriptorCreate
    filters: Dict[str, Any] = {}
    top_k: int = 20

# Matching Skill
class MatchingSkill(BaseModel):
    skill: str
    confidence: float

# Evidence Item
class EvidenceItem(BaseModel):
    type: str  # project, position, education
    id: str
    relevance: float

# Match Explanation
class MatchExplanation(BaseModel):
    top_matching_skills: List[MatchingSkill]
    top_evidence: List[EvidenceItem]
    gaps: List[str]
    vector_similarity: float
    rule_score: float

# Match Result
class MatchResultResponse(BaseModel):
    candidate_id: UUID
    score: float
    explanation: MatchExplanation

# Match Response
class MatchResponse(BaseModel):
    matches: List[MatchResultResponse]
    query_embedding_id: str
    matched_at: datetime

# Batch Match Request
class BatchMatchRequest(BaseModel):
    role_id: UUID
    candidate_ids: List[UUID]
    return_explanations: bool = True

# Batch Match Response
class BatchMatchResponse(BaseModel):
    matches: List[MatchResultResponse]
    batch_id: UUID
