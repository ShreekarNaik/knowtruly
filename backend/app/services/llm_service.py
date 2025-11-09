from typing import Dict, Any, Optional
import google.generativeai as genai
from app.core.config import settings
import asyncio
import time

class LLMService:
    """Service for LLM operations (text generation, rephrasing, etc.)"""
    
    def __init__(self):
        genai.configure(api_key=settings.GOOGLE_API_KEY)
        self.model = genai.GenerativeModel(settings.GEMINI_MODEL)
        self.max_retries = 3
        self.retry_delay = 1.0
    
    async def rephrase_text(
        self,
        original_text: str,
        context: str,
        max_chars: Optional[int] = None,
        tone: str = "professional",
        preserve_claims: bool = True
    ) -> Dict[str, Any]:
        """
        Rephrase text using Gemini API for resume generation.
        
        Args:
            original_text: Text to rephrase
            context: Context (e.g., 'resume_summary', 'project_description')
            max_chars: Maximum character limit
            tone: Tone of rephrased text (professional, casual)
            preserve_claims: Whether to preserve factual claims
            
        Returns:
            Dict with rephrased_text, tokens_used, model_version, preserved_claims
        """
        # Build prompt based on requirements
        prompt = self._build_rephrase_prompt(
            original_text,
            context,
            max_chars,
            tone,
            preserve_claims
        )
        
        # Call Gemini with retries
        for attempt in range(self.max_retries):
            try:
                response = await self._call_gemini_async(prompt)
                
                # Extract rephrased text
                rephrased_text = response.text.strip()
                
                # Validate length if max_chars specified
                if max_chars and len(rephrased_text) > max_chars:
                    # Try again with stricter constraint
                    if attempt < self.max_retries - 1:
                        prompt = self._build_rephrase_prompt(
                            original_text,
                            context,
                            int(max_chars * 0.9),  # 10% buffer
                            tone,
                            preserve_claims
                        )
                        continue
                    else:
                        # Truncate if final attempt
                        rephrased_text = rephrased_text[:max_chars]
                
                # Extract preserved claims (placeholder - would use NER/parsing)
                preserved_claims = self._extract_claims(original_text) if preserve_claims else []
                
                return {
                    "rephrased_text": rephrased_text,
                    "tokens_used": response.usage_metadata.total_token_count if hasattr(response, 'usage_metadata') else 0,
                    "model_version": settings.GEMINI_MODEL,
                    "preserved_claims": preserved_claims,
                    "original_length": len(original_text),
                    "rephrased_length": len(rephrased_text)
                }
                
            except Exception as e:
                if attempt < self.max_retries - 1:
                    await asyncio.sleep(self.retry_delay * (2 ** attempt))
                else:
                    # If all retries fail, return original text
                    return {
                        "rephrased_text": original_text,
                        "tokens_used": 0,
                        "model_version": settings.GEMINI_MODEL,
                        "preserved_claims": [],
                        "error": str(e),
                        "fallback": True
                    }
    
    def _build_rephrase_prompt(
        self,
        text: str,
        context: str,
        max_chars: Optional[int],
        tone: str,
        preserve_claims: bool
    ) -> str:
        """Build prompt for rephrasing."""
        base_prompt = f"""Rephrase the following {context} text to be more concise and impactful for a professional resume.

Original text:
{text}

Requirements:
- Tone: {tone}
- Keep it factual and specific
"""
        
        if max_chars:
            base_prompt += f"- Maximum {max_chars} characters\n"
        
        if preserve_claims:
            base_prompt += "- Preserve all factual claims, numbers, and achievements\n"
        
        base_prompt += """
- Use action verbs
- Be concise but informative
- Remove filler words

Rephrased text:"""
        
        return base_prompt
    
    async def _call_gemini_async(self, prompt: str):
        """Async wrapper for Gemini API call."""
        loop = asyncio.get_event_loop()
        return await loop.run_in_executor(
            None,
            lambda: self.model.generate_content(
                prompt,
                generation_config=genai.types.GenerationConfig(
                    temperature=0.3,  # Lower temperature for more deterministic output
                    max_output_tokens=500
                )
            )
        )
    
    def _extract_claims(self, text: str) -> list:
        """Extract factual claims from text (placeholder)."""
        # In production, would use NER or claim extraction model
        # For now, extract numbers and proper nouns as proxy
        import re
        claims = []
        
        # Extract numbers with context
        number_pattern = r'\d+(?:\.\d+)?(?:%|K|M|years?|months?)?'
        numbers = re.findall(number_pattern, text)
        claims.extend([f"numeric: {num}" for num in numbers])
        
        return claims[:5]  # Limit to top 5 claims
    
    async def generate_project_documentation(
        self,
        project_data: Dict[str, Any]
    ) -> str:
        """
        Generate structured project documentation from profile data.
        
        Args:
            project_data: Dict with project details
            
        Returns:
            Markdown-formatted project documentation
        """
        prompt = f"""Generate a professional project documentation in markdown format based on the following information:

Project Title: {project_data.get('title', 'Untitled Project')}
Role: {project_data.get('role_description', 'N/A')}
Technologies: {', '.join(project_data.get('technologies', []))}
Description: {project_data.get('description', 'N/A')}
Achievements: {', '.join(project_data.get('achievements', []))}

Create a structured README with:
1. Project Overview (2-3 sentences)
2. Key Features (bullet points)
3. Technologies Used
4. Your Contributions
5. Outcomes/Impact

Use professional technical writing style. Be specific and quantitative where possible."""
        
        try:
            response = await self._call_gemini_async(prompt)
            return response.text.strip()
        except Exception as e:
            # Fallback to template-based generation
            return self._generate_documentation_fallback(project_data)
    
    def _generate_documentation_fallback(self, project_data: Dict[str, Any]) -> str:
        """Fallback documentation generator."""
        title = project_data.get('title', 'Untitled Project')
        description = project_data.get('description', 'No description provided')
        technologies = project_data.get('technologies', [])
        
        doc = f"""# {title}

## Overview
{description}

## Technologies
{chr(10).join(f'- {tech}' for tech in technologies)}

## Role
{project_data.get('role_description', 'Contributor')}
"""
        return doc

# Global service instance
llm_service = LLMService()
