#!/usr/bin/env python3
"""
Database initialization script.
Creates all tables defined in SQLAlchemy models.
"""

from app.db.base import Base, engine
from app.models import user, profile, claim, resume

def init_db():
    """Create all database tables."""
    print("Creating database tables...")
    Base.metadata.create_all(bind=engine)
    print("✅ Database tables created successfully!")
    print("\nCreated tables:")
    for table in Base.metadata.sorted_tables:
        print(f"  - {table.name}")

if __name__ == "__main__":
    init_db()
