from typing import List, Dict, Any, Optional
from uuid import UUID
import uuid
from sqlalchemy.orm import Session

from app.services.embedding_service import embedding_service
from app.services.vector_store import vector_store
from app.models.profile import Profile
from app.models.resume import RoleDescriptor, MatchResult


class MatchService:
    """Service for semantic matching between candidates and roles."""
    
    def __init__(self):
        self.vector_weight = 0.7  # Weight for vector similarity
        self.rule_weight = 0.3    # Weight for rule-based scoring
    
    async def match_candidates_to_role(
        self,
        role_descriptor: Dict[str, Any],
        top_k: int = 20,
        filters: Optional[Dict[str, Any]] = None,
        db: Optional[Session] = None
    ) -> List[Dict[str, Any]]:
        """
        Match candidates to a role using hybrid scoring.
        
        Args:
            role_descriptor: Job description and requirements
            top_k: Number of top candidates to return
            filters: Optional filters (min_experience, location, etc.)
            db: Database session for storing results
            
        Returns:
            List of match results with scores and explanations
        """
        # Generate embedding for the role
        role_embedding = await embedding_service.embed_role_descriptor(role_descriptor)
        
        # Search for similar profiles in vector store
        vector_results = await vector_store.search_similar(
            query_vector=role_embedding,
            top_k=top_k * 2,  # Get more to filter
            filters={"type": "profile"} if not filters else {**filters, "type": "profile"}
        )
        
        # Enrich results with rule-based scoring
        enriched_results = []
        
        for result in vector_results:
            vector_similarity = result["score"]
            profile_metadata = result["metadata"]
            
            # Calculate rule-based score
            rule_score = self._calculate_rule_score(
                profile_metadata,
                role_descriptor
            )
            
            # Hybrid score
            final_score = (
                self.vector_weight * vector_similarity +
                self.rule_weight * rule_score
            )
            
            # Generate explanation
            explanation = self._generate_explanation(
                profile_metadata,
                role_descriptor,
                vector_similarity,
                rule_score
            )
            
            enriched_results.append({
                "candidate_id": profile_metadata.get("owner_id"),
                "score": final_score,
                "explanation": explanation,
                "vector_similarity": vector_similarity,
                "rule_score": rule_score
            })
        
        # Sort by final score and take top_k
        enriched_results.sort(key=lambda x: x["score"], reverse=True)
        top_results = enriched_results[:top_k]
        
        # Store results in database if provided
        if db:
            await self._store_match_results(
                role_descriptor,
                top_results,
                db
            )
        
        return top_results
    
    def _calculate_rule_score(
        self,
        profile_metadata: Dict[str, Any],
        role_descriptor: Dict[str, Any]
    ) -> float:
        """
        Calculate rule-based score based on structured constraints.
        
        Factors:
        - Required skills match
        - Preferred skills match
        - Experience level
        - Education level
        """
        score = 0.0
        total_weight = 0.0
        
        # Required skills (40% weight)
        required_skills = set(role_descriptor.get("required_skills", []))
        if required_skills:
            # This would need actual profile data - using metadata as proxy
            # In production, fetch full profile
            matched_required = len(required_skills) * 0.7  # Placeholder
            score += (matched_required / len(required_skills)) * 0.4
            total_weight += 0.4
        
        # Preferred skills (30% weight)
        preferred_skills = set(role_descriptor.get("preferred_skills", []))
        if preferred_skills:
            matched_preferred = len(preferred_skills) * 0.5  # Placeholder
            score += (matched_preferred / len(preferred_skills)) * 0.3
            total_weight += 0.3
        
        # Constraints matching (30% weight)
        constraints = role_descriptor.get("constraints", {})
        if constraints:
            constraint_score = self._evaluate_constraints(
                profile_metadata,
                constraints
            )
            score += constraint_score * 0.3
            total_weight += 0.3
        
        # Normalize by total weight
        return score / total_weight if total_weight > 0 else 0.5
    
    def _evaluate_constraints(
        self,
        profile_metadata: Dict[str, Any],
        constraints: Dict[str, Any]
    ) -> float:
        """Evaluate how well profile meets constraints."""
        # Placeholder - would need full profile data
        # Check location, remote preference, availability, etc.
        return 0.8  # Default good match
    
    def _generate_explanation(
        self,
        profile_metadata: Dict[str, Any],
        role_descriptor: Dict[str, Any],
        vector_similarity: float,
        rule_score: float
    ) -> Dict[str, Any]:
        """
        Generate human-readable explanation for the match.
        
        Returns:
            Dictionary with top matching skills, evidence, and gaps
        """
        required_skills = role_descriptor.get("required_skills", [])
        preferred_skills = role_descriptor.get("preferred_skills", [])
        
        # Top matching skills (placeholder - would analyze actual profile)
        top_matching_skills = [
            {"skill": skill, "confidence": 0.9}
            for skill in required_skills[:3]
        ]
        
        # Top evidence (placeholder - would fetch from profile)
        top_evidence = [
            {
                "type": "project",
                "id": str(uuid.uuid4()),
                "relevance": 0.85
            }
        ]
        
        # Identify gaps
        gaps = [
            skill for skill in required_skills[3:]
        ] if len(required_skills) > 3 else []
        
        return {
            "top_matching_skills": top_matching_skills,
            "top_evidence": top_evidence,
            "gaps": gaps,
            "vector_similarity": vector_similarity,
            "rule_score": rule_score
        }
    
    async def _store_match_results(
        self,
        role_descriptor: Dict[str, Any],
        matches: List[Dict[str, Any]],
        db: Session
    ):
        """Store match results in database for audit trail."""
        # Create or get role descriptor
        role_id = role_descriptor.get("id")
        
        # Store each match result
        for match in matches:
            match_result = MatchResult(
                candidate_profile_id=match["candidate_id"],
                role_id=role_id,
                score=match["score"],
                explanation=match["explanation"]
            )
            db.add(match_result)
        
        db.commit()
    
    async def batch_match(
        self,
        role_id: UUID,
        candidate_ids: List[UUID],
        db: Session
    ) -> List[Dict[str, Any]]:
        """
        Batch match specific candidates against a role.
        
        Args:
            role_id: Role descriptor ID
            candidate_ids: List of candidate profile IDs
            db: Database session
            
        Returns:
            List of match results
        """
        # Fetch role descriptor
        role = db.query(RoleDescriptor).filter(RoleDescriptor.id == role_id).first()
        if not role:
            raise ValueError(f"Role {role_id} not found")
        
        role_dict = {
            "title": role.title,
            "company": role.company,
            "description": role.description,
            "required_skills": role.required_skills,
            "preferred_skills": role.preferred_skills,
            "constraints": role.constraints
        }
        
        # Get role embedding
        if role.embedding_id:
            role_embedding_data = await vector_store.get_embedding(role.embedding_id)
            role_embedding = role_embedding_data["vector"]
        else:
            role_embedding = await embedding_service.embed_role_descriptor(role_dict)
        
        results = []
        
        for candidate_id in candidate_ids:
            # Fetch candidate profile
            profile = db.query(Profile).filter(Profile.id == candidate_id).first()
            if not profile or not profile.embedding_id:
                continue
            
            # Get profile embedding
            profile_embedding_data = await vector_store.get_embedding(profile.embedding_id)
            if not profile_embedding_data:
                continue
            
            # Calculate similarity (cosine similarity already done by vector store)
            # For batch, we'll use the stored embeddings
            vector_similarity = 0.85  # Placeholder - would calculate actual similarity
            
            # Calculate rule score
            profile_metadata = {
                "owner_id": str(profile.owner_id),
                "canonical_name": profile.canonical_name
            }
            rule_score = self._calculate_rule_score(profile_metadata, role_dict)
            
            # Hybrid score
            final_score = (
                self.vector_weight * vector_similarity +
                self.rule_weight * rule_score
            )
            
            # Generate explanation
            explanation = self._generate_explanation(
                profile_metadata,
                role_dict,
                vector_similarity,
                rule_score
            )
            
            results.append({
                "candidate_id": str(candidate_id),
                "score": final_score,
                "explanation": explanation
            })
        
        # Sort by score
        results.sort(key=lambda x: x["score"], reverse=True)
        
        return results


# Global service instance
match_service = MatchService()
