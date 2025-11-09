# KnowTruly.me Testing Guide

## Overview

This document covers testing strategies, test setup, and running tests for the KnowTruly.me backend.

## Test Structure

```
backend/
├── tests/
│   ├── __init__.py
│   ├── conftest.py                 # Pytest fixtures
│   ├── test_auth.py                # Authentication tests
│   ├── test_profiles.py            # Profile CRUD tests
│   ├── test_embeddings.py          # Embedding service tests
│   ├── test_matching.py            # Semantic matching tests
│   ├── test_resumes.py             # Resume generation tests
│   ├── test_verification.py        # Signature verification tests
│   ├── test_audit.py               # Audit & compliance tests
│   └── fixtures/
│       ├── sample_profiles.json    # Test data
│       ├── sample_jds.json         # Job descriptions
│       └── expected_matches.json   # Ground truth for matching
```

## Test Categories

### 1. Unit Tests
Test individual functions and methods in isolation.

### 2. Integration Tests
Test API endpoints and service interactions.

### 3. End-to-End Tests
Test complete user workflows.

### 4. Performance Tests
Test response times and resource usage.

## Setup

### Install Test Dependencies

```bash
pip install pytest pytest-asyncio pytest-cov httpx faker
```

### Environment Setup

Create `.env.test`:

```bash
DATABASE_URL=postgresql://knowtruly:test@localhost:5432/knowtruly_test
QDRANT_HOST=localhost
QDRANT_PORT=6333
QDRANT_COLLECTION_NAME=profiles_test
GOOGLE_API_KEY=your_test_api_key
SECRET_KEY=test_secret_key_for_testing_only
ENVIRONMENT=test
```

### Initialize Test Database

```bash
# Create test database
docker compose exec postgres psql -U knowtruly -c "CREATE DATABASE knowtruly_test;"

# Run migrations
DATABASE_URL=postgresql://knowtruly:test@localhost:5432/knowtruly_test python -m app.init_db_tables
```

## Running Tests

### All Tests

```bash
pytest
```

### Specific Test File

```bash
pytest tests/test_auth.py
```

### Specific Test Function

```bash
pytest tests/test_auth.py::test_register_user
```

### With Coverage

```bash
pytest --cov=app --cov-report=html
# Open htmlcov/index.html to view coverage report
```

### Verbose Output

```bash
pytest -v -s
```

### Stop on First Failure

```bash
pytest -x
```

### Run Only Fast Tests

```bash
pytest -m "not slow"
```

## Test Examples

### 1. Authentication Tests

```python
# tests/test_auth.py
import pytest
from httpx import AsyncClient
from app.main import app

@pytest.mark.asyncio
async def test_register_user():
    """Test user registration."""
    async with AsyncClient(app=app, base_url="http://test") as client:
        response = await client.post(
            "/api/v1/auth/register",
            json={
                "email": "test@example.com",
                "password": "SecurePass123!",
                "role": "student"
            }
        )
    
    assert response.status_code == 201
    data = response.json()
    assert "access_token" in data
    assert data["email"] == "test@example.com"

@pytest.mark.asyncio
async def test_login_user():
    """Test user login."""
    # Register first
    async with AsyncClient(app=app, base_url="http://test") as client:
        await client.post(
            "/api/v1/auth/register",
            json={
                "email": "login_test@example.com",
                "password": "SecurePass123!",
                "role": "student"
            }
        )
        
        # Now login
        response = await client.post(
            "/api/v1/auth/login",
            json={
                "email": "login_test@example.com",
                "password": "SecurePass123!"
            }
        )
    
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"

@pytest.mark.asyncio
async def test_login_invalid_credentials():
    """Test login with invalid credentials."""
    async with AsyncClient(app=app, base_url="http://test") as client:
        response = await client.post(
            "/api/v1/auth/login",
            json={
                "email": "nonexistent@example.com",
                "password": "WrongPassword"
            }
        )
    
    assert response.status_code == 401
```

### 2. Profile Tests

```python
# tests/test_profiles.py
import pytest
from httpx import AsyncClient
from app.main import app

@pytest.fixture
async def auth_token():
    """Create a user and return auth token."""
    async with AsyncClient(app=app, base_url="http://test") as client:
        response = await client.post(
            "/api/v1/auth/register",
            json={
                "email": f"test_{uuid.uuid4()}@example.com",
                "password": "SecurePass123!",
                "role": "student"
            }
        )
        return response.json()["access_token"]

@pytest.mark.asyncio
async def test_create_profile(auth_token):
    """Test profile creation."""
    headers = {"Authorization": f"Bearer {auth_token}"}
    
    async with AsyncClient(app=app, base_url="http://test") as client:
        response = await client.post(
            "/api/v1/profiles",
            headers=headers,
            json={
                "canonical_name": "John Doe",
                "headline": "Software Engineer",
                "summary": "Experienced developer",
                "skills": [
                    {"name": "Python", "proficiency": "advanced"},
                    {"name": "FastAPI", "proficiency": "intermediate"}
                ],
                "education": [
                    {
                        "institution": "MIT",
                        "degree": "BS Computer Science",
                        "start_date": "2018-09-01",
                        "end_date": "2022-05-31"
                    }
                ]
            }
        )
    
    assert response.status_code == 201
    data = response.json()
    assert data["canonical_name"] == "John Doe"
    assert "embedding_id" in data

@pytest.mark.asyncio
async def test_get_profile(auth_token):
    """Test profile retrieval."""
    headers = {"Authorization": f"Bearer {auth_token}"}
    
    async with AsyncClient(app=app, base_url="http://test") as client:
        # Create profile first
        create_response = await client.post(
            "/api/v1/profiles",
            headers=headers,
            json={"canonical_name": "Jane Doe"}
        )
        profile_id = create_response.json()["id"]
        
        # Get profile
        response = await client.get(
            f"/api/v1/profiles/{profile_id}",
            headers=headers
        )
    
    assert response.status_code == 200
    data = response.json()
    assert data["canonical_name"] == "Jane Doe"
```

### 3. Matching Tests

```python
# tests/test_matching.py
import pytest
from httpx import AsyncClient
from app.main import app

@pytest.mark.asyncio
async def test_semantic_matching(auth_token):
    """Test semantic candidate matching."""
    headers = {"Authorization": f"Bearer {auth_token}"}
    
    async with AsyncClient(app=app, base_url="http://test") as client:
        response = await client.post(
            "/api/v1/match",
            headers=headers,
            json={
                "role_descriptor": {
                    "title": "Senior Python Developer",
                    "description": "Looking for experienced Python developer",
                    "required_skills": ["Python", "FastAPI", "PostgreSQL"],
                    "preferred_skills": ["Docker", "AWS"]
                },
                "top_k": 10
            }
        )
    
    assert response.status_code == 200
    data = response.json()
    assert "matches" in data
    assert len(data["matches"]) <= 10
    
    # Check match structure
    if data["matches"]:
        match = data["matches"][0]
        assert "candidate_id" in match
        assert "score" in match
        assert 0 <= match["score"] <= 1
        assert "explanation" in match

@pytest.mark.slow
@pytest.mark.asyncio
async def test_matching_accuracy():
    """Test matching accuracy against ground truth."""
    # Load test fixtures
    with open("tests/fixtures/expected_matches.json") as f:
        ground_truth = json.load(f)
    
    for test_case in ground_truth:
        async with AsyncClient(app=app, base_url="http://test") as client:
            response = await client.post(
                "/api/v1/match",
                json=test_case["role_descriptor"]
            )
            
            matches = response.json()["matches"]
            # Calculate NDCG or other metrics
            assert calculate_ndcg(matches, test_case["expected"]) > 0.7
```

### 4. Resume Generation Tests

```python
# tests/test_resumes.py
import pytest
from httpx import AsyncClient
from app.main import app

@pytest.mark.asyncio
async def test_generate_resume(auth_token, profile_id):
    """Test resume generation."""
    headers = {"Authorization": f"Bearer {auth_token}"}
    
    async with AsyncClient(app=app, base_url="http://test") as client:
        response = await client.post(
            "/api/v1/resumes/generate",
            headers=headers,
            json={
                "profile_id": str(profile_id),
                "template_id": "modern_tech",
                "role_descriptor": {
                    "title": "Software Engineer",
                    "description": "Full stack development role"
                },
                "options": {
                    "ai_rephrase": True,
                    "max_pages": 2,
                    "format": "pdf"
                }
            }
        )
    
    assert response.status_code == 200
    data = response.json()
    assert "resume_id" in data
    assert "download_url" in data
    assert data["generation_metadata"]["template_used"] == "modern_tech"

@pytest.mark.asyncio
async def test_resume_download(auth_token, resume_id):
    """Test resume PDF download."""
    headers = {"Authorization": f"Bearer {auth_token}"}
    
    async with AsyncClient(app=app, base_url="http://test") as client:
        response = await client.get(
            f"/api/v1/resumes/{resume_id}",
            headers=headers
        )
    
    assert response.status_code == 200
    assert response.headers["content-type"] == "application/pdf"
```

### 5. Audit & Compliance Tests

```python
# tests/test_audit.py
import pytest
from httpx import AsyncClient
from app.main import app

@pytest.mark.asyncio
async def test_consent_request_flow():
    """Test complete consent request and approval flow."""
    # Create student
    async with AsyncClient(app=app, base_url="http://test") as client:
        student_resp = await client.post(
            "/api/v1/auth/register",
            json={
                "email": "student@test.com",
                "password": "Pass123!",
                "role": "student"
            }
        )
        student_token = student_resp.json()["access_token"]
        
        # Create student profile
        profile_resp = await client.post(
            "/api/v1/profiles",
            headers={"Authorization": f"Bearer {student_token}"},
            json={"canonical_name": "Test Student"}
        )
        profile_id = profile_resp.json()["id"]
        
        # Create recruiter
        recruiter_resp = await client.post(
            "/api/v1/auth/register",
            json={
                "email": "recruiter@test.com",
                "password": "Pass123!",
                "role": "recruiter"
            }
        )
        recruiter_token = recruiter_resp.json()["access_token"]
        
        # Recruiter requests access
        consent_resp = await client.post(
            "/api/v1/audit/consent/request",
            headers={"Authorization": f"Bearer {recruiter_token}"},
            json={
                "subject_id": profile_id,
                "data_type": "full_profile",
                "purpose": "Job application review"
            }
        )
        assert consent_resp.status_code == 200
        consent_id = consent_resp.json()["id"]
        
        # Student checks pending requests
        pending_resp = await client.get(
            "/api/v1/audit/consent/pending",
            headers={"Authorization": f"Bearer {student_token}"}
        )
        assert len(pending_resp.json()) == 1
        
        # Student grants consent
        grant_resp = await client.post(
            "/api/v1/audit/consent/decide",
            headers={"Authorization": f"Bearer {student_token}"},
            json={
                "consent_id": consent_id,
                "decision": "grant"
            }
        )
        assert grant_resp.status_code == 200
        assert grant_resp.json()["granted"] == "granted"

@pytest.mark.asyncio
async def test_gdpr_data_export():
    """Test GDPR data export."""
    async with AsyncClient(app=app, base_url="http://test") as client:
        # Register and create profile
        auth_resp = await client.post(
            "/api/v1/auth/register",
            json={
                "email": "gdpr_test@example.com",
                "password": "Pass123!",
                "role": "student"
            }
        )
        token = auth_resp.json()["access_token"]
        headers = {"Authorization": f"Bearer {token}"}
        
        await client.post(
            "/api/v1/profiles",
            headers=headers,
            json={"canonical_name": "GDPR Test User"}
        )
        
        # Export data
        export_resp = await client.post(
            "/api/v1/audit/gdpr/export",
            headers=headers,
            json={
                "format": "json",
                "include_audit_logs": True,
                "include_access_logs": True
            }
        )
        
        assert export_resp.status_code == 200
        data = export_resp.json()
        assert "user" in data
        assert "profile" in data
        assert "audit_logs" in data
```

## Performance Testing

### Load Testing with Locust

```python
# locustfile.py
from locust import HttpUser, task, between

class KnowTrulyUser(HttpUser):
    wait_time = between(1, 3)
    
    def on_start(self):
        """Register and login."""
        response = self.client.post("/api/v1/auth/register", json={
            "email": f"load_test_{uuid.uuid4()}@example.com",
            "password": "Pass123!",
            "role": "student"
        })
        self.token = response.json()["access_token"]
        self.headers = {"Authorization": f"Bearer {self.token}"}
    
    @task(3)
    def get_profile(self):
        """Get profile (most common operation)."""
        self.client.get("/api/v1/profiles/me", headers=self.headers)
    
    @task(1)
    def perform_match(self):
        """Perform semantic matching."""
        self.client.post("/api/v1/match", headers=self.headers, json={
            "role_descriptor": {
                "title": "Software Engineer",
                "description": "Looking for Python developer"
            }
        })
    
    @task(1)
    def generate_resume(self):
        """Generate resume."""
        self.client.post("/api/v1/resumes/generate", headers=self.headers, json={
            "template_id": "modern",
            "role_descriptor": {"title": "Developer"}
        })

# Run: locust -f locustfile.py --host=http://localhost:8000
```

## CI/CD Integration

### GitHub Actions

```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      postgres:
        image: pgvector/pgvector:pg16
        env:
          POSTGRES_USER: knowtruly
          POSTGRES_PASSWORD: test
          POSTGRES_DB: knowtruly_test
        ports:
          - 5432:5432
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Set up Python
      uses: actions/setup-python@v2
      with:
        python-version: '3.11'
    
    - name: Install dependencies
      run: |
        pip install -r requirements.txt
        pip install pytest pytest-cov
    
    - name: Run tests
      env:
        DATABASE_URL: postgresql://knowtruly:test@localhost:5432/knowtruly_test
        GOOGLE_API_KEY: ${{ secrets.GOOGLE_API_KEY }}
      run: |
        pytest --cov=app --cov-report=xml
    
    - name: Upload coverage
      uses: codecov/codecov-action@v2
```

## Best Practices

### 1. Test Isolation
- Each test should be independent
- Use fixtures for setup/teardown
- Clean up test data after tests

### 2. Test Data
- Use factories or fixtures for test data
- Don't rely on production data
- Use realistic but anonymized data

### 3. Mocking
- Mock external services (Gemini API, Qdrant)
- Don't mock what you don't own
- Use dependency injection

### 4. Coverage Goals
- Aim for >80% code coverage
- Focus on critical paths
- Don't chase 100% coverage

### 5. Test Naming
- Use descriptive names: `test_user_cannot_access_other_profiles`
- Follow pattern: `test_<what>_<condition>_<expected>`

## Troubleshooting Tests

### Database Issues
```bash
# Reset test database
docker compose exec postgres psql -U knowtruly -c "DROP DATABASE IF EXISTS knowtruly_test;"
docker compose exec postgres psql -U knowtruly -c "CREATE DATABASE knowtruly_test;"
```

### Qdrant Issues
```bash
# Clear test collection
curl -X DELETE http://localhost:6333/collections/profiles_test
```

### Slow Tests
```bash
# Profile slow tests
pytest --durations=10
```

## Resources

- [Pytest Documentation](https://docs.pytest.org/)
- [FastAPI Testing](https://fastapi.tiangolo.com/tutorial/testing/)
- [Coverage.py](https://coverage.readthedocs.io/)
- [Locust Documentation](https://docs.locust.io/)
