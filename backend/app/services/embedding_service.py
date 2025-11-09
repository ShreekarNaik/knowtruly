import google.generativeai as genai
from typing import List, Dict, Any, Optional
import asyncio
from functools import lru_cache
from app.core.config import settings

# Configure Gemini API
genai.configure(api_key=settings.GOOGLE_API_KEY)

class EmbeddingService:
    """Service for generating embeddings using Google Gemini API."""
    
    def __init__(self):
        self.model = settings.GEMINI_EMBEDDING_MODEL
        self.max_retries = 3
        self.retry_delay = 1  # seconds
    
    async def generate_embedding(self, text: str) -> List[float]:
        """
        Generate embedding for a single text.
        
        Args:
            text: Text to embed
            
        Returns:
            List of floats representing the embedding vector
        """
        for attempt in range(self.max_retries):
            try:
                # Gemini embedding API call
                result = genai.embed_content(
                    model=f"models/{self.model}",
                    content=text,
                    task_type="retrieval_document"
                )
                return result['embedding']
            except Exception as e:
                if attempt < self.max_retries - 1:
                    await asyncio.sleep(self.retry_delay * (2 ** attempt))  # Exponential backoff
                    continue
                raise Exception(f"Failed to generate embedding after {self.max_retries} attempts: {str(e)}")
    
    async def generate_embeddings_batch(self, texts: List[str]) -> List[List[float]]:
        """
        Generate embeddings for multiple texts in batch.
        
        Args:
            texts: List of texts to embed
            
        Returns:
            List of embedding vectors
        """
        embeddings = []
        # Process in batches of 10 to avoid rate limits
        batch_size = 10
        
        for i in range(0, len(texts), batch_size):
            batch = texts[i:i + batch_size]
            batch_embeddings = await asyncio.gather(
                *[self.generate_embedding(text) for text in batch]
            )
            embeddings.extend(batch_embeddings)
            
            # Small delay between batches to respect rate limits
            if i + batch_size < len(texts):
                await asyncio.sleep(0.5)
        
        return embeddings
    
    async def embed_profile(self, profile_data: Dict[str, Any]) -> List[float]:
        """
        Generate embedding for a complete profile.
        Combines multiple fields into a semantic representation.
        
        Args:
            profile_data: Profile dictionary with fields
            
        Returns:
            Embedding vector for the profile
        """
        # Construct a comprehensive text representation
        text_parts = []
        
        # Basic info
        if profile_data.get("canonical_name"):
            text_parts.append(f"Name: {profile_data['canonical_name']}")
        
        if profile_data.get("headline"):
            text_parts.append(f"Headline: {profile_data['headline']}")
        
        if profile_data.get("summary"):
            text_parts.append(f"Summary: {profile_data['summary']}")
        
        # Education
        for edu in profile_data.get("education", []):
            text_parts.append(
                f"Education: {edu.get('degree')} in {edu.get('field_of_study')} from {edu.get('institution')}"
            )
        
        # Skills
        skills = [skill.get("name") for skill in profile_data.get("skills", [])]
        if skills:
            text_parts.append(f"Skills: {', '.join(skills)}")
        
        # Experience
        for pos in profile_data.get("positions", []):
            text_parts.append(
                f"Experience: {pos.get('title')} at {pos.get('company')}. {pos.get('description', '')}"
            )
        
        # Projects
        for proj in profile_data.get("projects", []):
            text_parts.append(
                f"Project: {proj.get('title')}. {proj.get('role_description', '')}"
            )
        
        combined_text = " | ".join(text_parts)
        return await self.generate_embedding(combined_text)
    
    async def embed_role_descriptor(self, role_data: Dict[str, Any]) -> List[float]:
        """
        Generate embedding for a role/job description.
        
        Args:
            role_data: Role descriptor dictionary
            
        Returns:
            Embedding vector for the role
        """
        text_parts = [
            f"Job Title: {role_data.get('title', '')}",
            f"Company: {role_data.get('company', '')}",
            f"Description: {role_data.get('description', '')}",
        ]
        
        required_skills = role_data.get("required_skills", [])
        if required_skills:
            text_parts.append(f"Required Skills: {', '.join(required_skills)}")
        
        preferred_skills = role_data.get("preferred_skills", [])
        if preferred_skills:
            text_parts.append(f"Preferred Skills: {', '.join(preferred_skills)}")
        
        combined_text = " | ".join(text_parts)
        return await self.generate_embedding(combined_text)
    
    async def generate_query_embedding(self, query: str) -> List[float]:
        """
        Generate embedding for a search query.
        Uses 'retrieval_query' task type for better search performance.
        
        Args:
            query: Search query text
            
        Returns:
            Embedding vector for the query
        """
        try:
            result = genai.embed_content(
                model=f"models/{self.model}",
                content=query,
                task_type="retrieval_query"
            )
            return result['embedding']
        except Exception as e:
            raise Exception(f"Failed to generate query embedding: {str(e)}")

# Global service instance
embedding_service = EmbeddingService()
