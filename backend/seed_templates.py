"""Seed database with basic resume templates."""
from app.db.base import SessionLocal
from app.models.resume import ResumeTemplate

def seed_templates():
    """Create basic resume templates in database."""
    db = SessionLocal()
    
    try:
        # Check if templates already exist
        existing = db.query(ResumeTemplate).count()
        if existing > 0:
            print(f"Templates already exist ({existing} found). Skipping seed.")
            return
        
        templates = [
            {
                "name": "modern_tech",
                "description": "Modern template for tech professionals with emphasis on projects and skills",
                "layout_type": "two_column",
                "typst_file": "modern_tech.typ",
                "page_constraints": {"max_pages": 2, "max_chars_per_section": {"summary": 500, "projects": 200}},
                "field_mappings": {
                    "sections": ["header", "summary", "experience", "projects", "education", "skills"]
                },
                "is_active": True
            },
            {
                "name": "academic",
                "description": "Academic CV template with emphasis on publications and research",
                "layout_type": "single_column",
                "typst_file": "academic.typ",
                "page_constraints": {"max_pages": 3, "max_chars_per_section": {"summary": 800}},
                "field_mappings": {
                    "sections": ["header", "education", "research", "publications", "teaching", "skills"]
                },
                "is_active": True
            },
            {
                "name": "classic",
                "description": "Classic professional resume with traditional layout",
                "layout_type": "single_column",
                "typst_file": "classic.typ",
                "page_constraints": {"max_pages": 1, "max_chars_per_section": {"summary": 300}},
                "field_mappings": {
                    "sections": ["header", "summary", "experience", "education", "skills"]
                },
                "is_active": True
            }
        ]
        
        for template_data in templates:
            template = ResumeTemplate(**template_data)
            db.add(template)
            print(f"✓ Created template: {template_data['name']}")
        
        db.commit()
        print(f"\n✅ Successfully seeded {len(templates)} templates")
        
    except Exception as e:
        print(f"❌ Error seeding templates: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_templates()
