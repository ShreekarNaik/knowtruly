from typing import Dict, Any, Optional
import subprocess
import os
import json
from pathlib import Path
from app.core.config import settings
import uuid

class TypstService:
    """Service for Typst resume compilation."""
    
    def __init__(self):
        self.templates_dir = Path(settings.TYPST_TEMPLATES_DIR)
        self.output_dir = Path(settings.TYPST_OUTPUT_DIR)
        self.typst_cli = settings.TYPST_CLI_PATH
        self.timeout = settings.TYPST_TIMEOUT_SECONDS
        
        # Ensure directories exist
        self.templates_dir.mkdir(parents=True, exist_ok=True)
        self.output_dir.mkdir(parents=True, exist_ok=True)
    
    async def compile_resume(
        self,
        template_name: str,
        profile_data: Dict[str, Any],
        options: Optional[Dict[str, Any]] = None
    ) -> Dict[str, Any]:
        """
        Compile a resume using Typst template and profile data.
        
        Args:
            template_name: Name of the Typst template (without .typ extension)
            profile_data: Profile data to inject into template
            options: Compilation options (format, etc.)
            
        Returns:
            Dict with file_path, success status, and metadata
        """
        options = options or {}
        output_format = options.get("format", "pdf")
        
        # Generate unique output filename
        output_id = str(uuid.uuid4())
        output_filename = f"resume_{output_id}.{output_format}"
        output_path = self.output_dir / output_filename
        
        # Prepare template path
        template_path = self.templates_dir / f"{template_name}.typ"
        
        if not template_path.exists():
            raise FileNotFoundError(f"Template {template_name}.typ not found")
        
        # Create data file for Typst to read
        data_file = self.output_dir / f"data_{output_id}.json"
        with open(data_file, 'w') as f:
            json.dump(profile_data, f, indent=2)
        
        try:
            # Compile with Typst
            result = await self._run_typst_compile(
                template_path=str(template_path),
                output_path=str(output_path),
                data_file=str(data_file)
            )
            
            # Clean up data file
            data_file.unlink()
            
            if result["success"]:
                return {
                    "success": True,
                    "file_path": str(output_path),
                    "filename": output_filename,
                    "format": output_format,
                    "size_bytes": output_path.stat().st_size if output_path.exists() else 0,
                    "compilation_time": result["compilation_time"]
                }
            else:
                return {
                    "success": False,
                    "error": result["error"],
                    "stderr": result.get("stderr", "")
                }
                
        except Exception as e:
            # Clean up data file on error
            if data_file.exists():
                data_file.unlink()
            raise Exception(f"Typst compilation failed: {str(e)}")
    
    async def _run_typst_compile(
        self,
        template_path: str,
        output_path: str,
        data_file: str
    ) -> Dict[str, Any]:
        """Run Typst CLI compilation."""
        import time
        start_time = time.time()
        
        try:
            # Typst command: typst compile template.typ output.pdf
            # Pass data file path as environment variable for template to read
            env = os.environ.copy()
            env["TYPST_DATA_FILE"] = data_file
            
            result = subprocess.run(
                [self.typst_cli, "compile", template_path, output_path],
                capture_output=True,
                text=True,
                timeout=self.timeout,
                env=env
            )
            
            compilation_time = time.time() - start_time
            
            if result.returncode == 0:
                return {
                    "success": True,
                    "compilation_time": compilation_time,
                    "stdout": result.stdout,
                    "stderr": result.stderr
                }
            else:
                return {
                    "success": False,
                    "error": f"Typst compilation failed with code {result.returncode}",
                    "stdout": result.stdout,
                    "stderr": result.stderr,
                    "compilation_time": compilation_time
                }
                
        except subprocess.TimeoutExpired:
            return {
                "success": False,
                "error": f"Compilation timeout after {self.timeout} seconds"
            }
        except FileNotFoundError:
            return {
                "success": False,
                "error": f"Typst CLI not found at {self.typst_cli}"
            }
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }
    
    def generate_typst_source(
        self,
        template_name: str,
        profile_data: Dict[str, Any]
    ) -> str:
        """
        Generate Typst source code with injected data (for preview/debugging).
        
        Args:
            template_name: Template name
            profile_data: Profile data
            
        Returns:
            Typst source code as string
        """
        template_path = self.templates_dir / f"{template_name}.typ"
        
        if not template_path.exists():
            raise FileNotFoundError(f"Template {template_name}.typ not found")
        
        # Read template
        with open(template_path, 'r') as f:
            template_content = f.read()
        
        # Simple variable substitution (basic version)
        # In production, would use proper template engine
        source = template_content
        
        # Replace common variables
        replacements = {
            "{{NAME}}": profile_data.get("canonical_name", ""),
            "{{EMAIL}}": profile_data.get("contact_handles", {}).get("email", ""),
            "{{PHONE}}": profile_data.get("contact_handles", {}).get("phone", ""),
            "{{HEADLINE}}": profile_data.get("headline", ""),
            "{{SUMMARY}}": profile_data.get("summary", ""),
        }
        
        for placeholder, value in replacements.items():
            source = source.replace(placeholder, value)
        
        return source
    
    def list_templates(self) -> list[Dict[str, Any]]:
        """List available Typst templates."""
        templates = []
        
        for template_file in self.templates_dir.glob("*.typ"):
            templates.append({
                "name": template_file.stem,
                "filename": template_file.name,
                "path": str(template_file),
                "size_bytes": template_file.stat().st_size
            })
        
        return templates
    
    def validate_template(self, template_name: str) -> Dict[str, Any]:
        """Validate that a template exists and is readable."""
        template_path = self.templates_dir / f"{template_name}.typ"
        
        if not template_path.exists():
            return {
                "valid": False,
                "error": "Template file not found"
            }
        
        if not template_path.is_file():
            return {
                "valid": False,
                "error": "Template path is not a file"
            }
        
        try:
            with open(template_path, 'r') as f:
                content = f.read()
            
            return {
                "valid": True,
                "size_bytes": len(content),
                "lines": len(content.splitlines())
            }
        except Exception as e:
            return {
                "valid": False,
                "error": f"Failed to read template: {str(e)}"
            }

# Global service instance
typst_service = TypstService()
