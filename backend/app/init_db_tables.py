#!/usr/bin/env python3
"""
Database table initialization - run this inside the container.
"""
from app.db.base import Base, engine
from app.models import user, profile, claim, resume

print("Creating database tables...")
Base.metadata.create_all(bind=engine)
print("✅ Database tables created successfully!")

print("\nCreated tables:")
for table in Base.metadata.sorted_tables:
    print(f"  - {table.name}")
