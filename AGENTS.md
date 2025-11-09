# KnowTruly.me — Agents Reference Guide

## Purpose

This document is the **central technical reference** for AI agents and developers building KnowTruly.me. It contains API schemas, frontend routes, tech stack decisions, implementation priorities, and work protocols. Read CONSTITUTION.md first for product vision and architecture principles.

---

## Quick Start for Agents

1. **Read** CONSTITUTION.md to understand the mission and architecture
2. **Follow** the tech stack and API schemas defined below
3. **Document** all work in `documentation.md` (detailed technical docs) and `PROGRESS.md` (handoff notes)
4. **Prioritize** features in this order: Embeddings → Matchmaking → Resume Generation → Signatures → Auto-documentation
5. **Test** each component with sample data before integration

---

## Tech Stack (Proof of Concept)

### Backend

- **Framework**: FastAPI (Python 3.11+)
- **Database**: PostgreSQL (with pgvector extension for embeddings)
- **Vector Store**: Qdrant (cloud instance or Docker local - easy setup for POC)
- **LLM Provider**: Google Gemini API (gemini-pro for text, text-embedding-004 for embeddings)
- **Auth**: FastAPI-Users with JWT tokens
- **File Storage**: Local filesystem for POC, S3-compatible for production
- **PDF Generation**: WeasyPrint or ReportLab
- **API Documentation**: Auto-generated via FastAPI (Swagger UI)

### Frontend

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **State Management**: React Query (TanStack Query) + Zustand
- **HTTP Client**: Axios
- **UI Components**: Headless UI + custom components

### Infrastructure (POC)

- **Containerization**: Docker + Docker Compose
- **API Gateway**: Nginx (reverse proxy)
- **Environment Management**: python-dotenv, .env files

---

## Priority Order (Implementation Sequence)

### Phase 1: Core Embeddings & Matching (PRIORITY 1)

1. Embedding Service + Vector Store setup
2. Profile Store with basic CRUD
3. Semantic Matchmaker Engine
4. Test dataset and evaluation metrics

### Phase 2: Resume Generation (PRIORITY 2)

5. Template Engine with 2-3 basic templates
6. LLM Orchestration for AI rephrasing
7. PDF rendering pipeline

### Phase 3: Trust & Verification (PRIORITY 3)

8. Signature Service (cryptographic claims)
9. Audit & Compliance logging

### Phase 4: Enhanced Features (PRIORITY 4)

10. Auto Project Documentation
11. Recruiter Portal advanced features

---

## System Architecture Overview

```
┌─────────────────┐
│  Frontend (SPA) │ (React + Vite)
└────────┬────────┘
         │ HTTPS
         ▼
┌─────────────────┐
│  API Gateway    │ (Nginx)
└────────┬────────┘
         │
    ┌────┴─────────────────────────────┐
    │      FastAPI Backend             │
    │  ┌──────────────────────────┐   │
    │  │  Auth Service            │   │
    │  │  Profile Service         │   │
    │  │  Embedding Service       │   │
    │  │  Matchmaker Engine       │   │
    │  │  Template Engine         │   │
    │  │  LLM Orchestration       │   │
    │  │  Signature Service       │   │
    │  │  Recruiter Portal API    │   │
    │  └──────────────────────────┘   │
    └───┬─────────┬──────────┬────────┘
        │         │          │
   ┌────▼───┐ ┌──▼──────┐ ┌─▼────────┐
   │ Postgres│ │ Qdrant  │ │  Gemini  │
   │ +pgvector│ │ Vector  │ │   API    │
   │         │ │  Store  │ │          │
   └─────────┘ └─────────┘ └──────────┘
```

---

## Core Data Models

### Profile (Digital Twin)

```python
{
  "id": "uuid",
  "owner_id": "uuid",
  "version": "int",
  "canonical_name": "string",
  "contact_handles": {
    "email": "string",
    "phone": "string",
    "linkedin": "string",
    "github": "string"
  },
  "education": [
    {
      "institution": "string",
      "degree": "string",
      "field_of_study": "string",
      "start_date": "date",
      "end_date": "date",
      "gpa": "float",
      "achievements": ["string"]
    }
  ],
  "positions": [
    {
      "title": "string",
      "company": "string",
      "start_date": "date",
      "end_date": "date",
      "description": "string",
      "skills_used": ["string"]
    }
  ],
  "skills": [
    {
      "name": "string",
      "proficiency": "beginner|intermediate|advanced|expert",
      "evidence_ids": ["uuid"],
      "verified": "boolean"
    }
  ],
  "projects": [
    {
      "id": "uuid",
      "title": "string",
      "role_description": "string",
      "artifacts": ["url"],
      "start_date": "date",
      "end_date": "date",
      "technologies": ["string"],
      "metrics": {"key": "value"}
    }
  ],
  "verifiable_claims": ["uuid"],
  "embedding_id": "string",
  "created_at": "timestamp",
  "updated_at": "timestamp"
}
```

### Role Descriptor (Job Description)

```python
{
  "role_id": "uuid",
  "title": "string",
  "company": "string",
  "description": "string",
  "required_skills": ["string"],
  "preferred_skills": ["string"],
  "constraints": {
    "location": "string",
    "remote": "boolean",
    "availability": "string",
    "min_degree": "string"
  },
  "embedding_id": "string",
  "created_at": "timestamp"
}
```

### Match Result

```python
{
  "candidate_id": "uuid",
  "role_id": "uuid",
  "score": "float (0-1)",
  "explanation": {
    "top_matching_skills": [
      {"skill": "string", "confidence": "float"}
    ],
    "top_evidence": [
      {"type": "project|position|education", "id": "uuid", "relevance": "float"}
    ],
    "gaps": ["string"]
  },
  "matched_at": "timestamp"
}
```

### Verifiable Claim

```python
{
  "claim_id": "uuid",
  "issuer_id": "uuid",
  "issuer_name": "string",
  "subject_profile_id": "uuid",
  "claim_type": "degree|skill|employment|project",
  "claim_payload": "json",
  "signature": "string",
  "signature_algorithm": "RSA-SHA256|Ed25519",
  "issued_at": "timestamp",
  "expires_at": "timestamp",
  "status": "active|revoked|expired"
}
```

### Resume Template

```python
{
  "template_id": "uuid",
  "name": "string",
  "description": "string",
  "layout_type": "single_column|two_column|modern|academic",
  "page_constraints": {
    "max_pages": "int",
    "max_chars_per_section": {"summary": 500, "projects": 200}
  },
  "field_mappings": {
    "sections": ["header", "summary", "experience", "education", "skills", "projects"]
  },
  "style_metadata": "json"
}
```

---

## API Endpoints

### Base URL

- Development: `http://localhost:8000/api/v1`
- Production: `https://api.knowtruly.me/api/v1`

---

### Authentication

#### `POST /auth/register`

Register a new user.

```json
Request:
{
  "email": "string",
  "password": "string",
  "role": "student|recruiter|issuer"
}

Response: 201
{
  "user_id": "uuid",
  "email": "string",
  "access_token": "string"
}
```

#### `POST /auth/login`

Login and get access token.

```json
Request:
{
  "email": "string",
  "password": "string"
}

Response: 200
{
  "access_token": "string",
  "token_type": "bearer",
  "expires_in": "int"
}
```

---

### Profile Service

#### `POST /profiles`

Create a new profile.

```json
Request:
{
  "canonical_name": "string",
  "contact_handles": {...},
  "education": [...],
  "positions": [...],
  "skills": [...],
  "projects": [...]
}

Response: 201
{
  "profile_id": "uuid",
  "version": 1,
  "embedding_id": "string"
}
```

#### `GET /profiles/{profile_id}`

Get profile by ID.

```json
Query Params:
  ?version=int (optional, defaults to latest)

Response: 200
{
  "id": "uuid",
  "owner_id": "uuid",
  "version": "int",
  ... (full profile object)
}
```

#### `PATCH /profiles/{profile_id}`

Update profile (creates new version).

```json
Request:
{
  "skills": [...],  // partial update
  "projects": [...]
}

Response: 200
{
  "profile_id": "uuid",
  "version": "int (incremented)",
  "updated_fields": ["skills", "projects"]
}
```

---

### Embedding Service (PRIORITY 1)

#### `POST /embeddings/create`

Generate embeddings for text or profile.

```json
Request:
{
  "text": "string (optional if profile_id provided)",
  "profile_id": "uuid (optional if text provided)",
  "metadata": {"type": "profile|role|project"}
}

Response: 201
{
  "embedding_id": "uuid",
  "vector_dimensions": 768,
  "stored_in_vector_db": true
}
```

#### `POST /embeddings/search`

Vector similarity search.

```json
Request:
{
  "query_embedding_id": "uuid",
  "top_k": 10,
  "filters": {"skill": "Python", "min_experience": 2}
}

Response: 200
{
  "results": [
    {
      "id": "uuid",
      "score": 0.95,
      "metadata": {...}
    }
  ]
}
```

---

### Matchmaker Engine (PRIORITY 1)

#### `POST /match`

Semantic matching between candidates and roles.

```json
Request:
{
  "role_descriptor": {
    "title": "string",
    "description": "string",
    "required_skills": ["string"],
    "preferred_skills": ["string"],
    "constraints": {...}
  },
  "filters": {
    "min_experience_years": "int",
    "education_level": "string"
  },
  "top_k": 20
}

Response: 200
{
  "matches": [
    {
      "candidate_id": "uuid",
      "score": 0.89,
      "explanation": {
        "top_matching_skills": [
          {"skill": "Python", "confidence": 0.95}
        ],
        "top_evidence": [
          {"type": "project", "id": "uuid", "relevance": 0.87}
        ],
        "gaps": ["AWS experience"]
      }
    }
  ],
  "query_embedding_id": "uuid",
  "matched_at": "timestamp"
}
```

#### `POST /match/batch`

Batch matching for multiple candidates against one role.

```json
Request:
{
  "role_id": "uuid",
  "candidate_ids": ["uuid"],
  "return_explanations": true
}

Response: 200
{
  "matches": [...],
  "batch_id": "uuid"
}
```

---

### Resume Generation (PRIORITY 2)

#### `POST /resumes/generate`

Generate role-specific resume.

```json
Request:
{
  "profile_id": "uuid",
  "template_id": "uuid",
  "role_descriptor": {
    "title": "string",
    "description": "string",
    "required_skills": ["string"]
  },
  "options": {
    "ai_rephrase": true,
    "max_pages": 2,
    "format": "pdf|docx|html"
  }
}

Response: 200
{
  "resume_id": "uuid",
  "snapshot_id": "uuid",
  "download_url": "string",
  "generation_metadata": {
    "rephrased_sections": ["summary", "projects"],
    "template_used": "uuid",
    "generated_at": "timestamp"
  }
}
```

#### `GET /resumes/{resume_id}`

Retrieve generated resume.

```json
Response: 200
{
  "resume_id": "uuid",
  "profile_snapshot_id": "uuid",
  "download_url": "string",
  "format": "pdf",
  "created_at": "timestamp"
}
```

---

### Template Engine

#### `GET /templates`

List available resume templates.

```json
Response: 200
{
  "templates": [
    {
      "template_id": "uuid",
      "name": "Modern Tech",
      "layout_type": "two_column",
      "preview_url": "string"
    }
  ]
}
```

#### `GET /templates/{template_id}`

Get template details.

```json
Response: 200
{
  "template_id": "uuid",
  "name": "string",
  "layout_blocks": [...],
  "field_mappings": {...},
  "page_constraints": {...}
}
```

---

### LLM Orchestration (PRIORITY 2)

#### `POST /llm/rephrase`

Rephrase text using Gemini API.

```json
Request:
{
  "original_text": "string",
  "context": "resume_summary|project_description",
  "constraints": {
    "max_chars": 200,
    "preserve_claims": true,
    "tone": "professional|casual"
  }
}

Response: 200
{
  "rephrased_text": "string",
  "tokens_used": "int",
  "model_version": "gemini-pro",
  "preserved_claims": ["claim1", "claim2"]
}
```

---

### Signature Service (PRIORITY 3)

#### `POST /signatures/sign`

Sign a claim or snapshot.

```json
Request:
{
  "issuer_token": "string",
  "snapshot_id": "uuid (for full profile)",
  "claim": {
    "type": "degree|skill|employment",
    "payload": {...}
  }
}

Response: 201
{
  "signature_id": "uuid",
  "signature": "string",
  "algorithm": "RSA-SHA256",
  "signed_at": "timestamp"
}
```

#### `GET /signatures/verify/{signature_id}`

Verify a signature.

```json
Response: 200
{
  "valid": true,
  "issuer_id": "uuid",
  "issuer_name": "string",
  "signed_at": "timestamp",
  "claim_payload": {...}
}
```

---

### Recruiter Portal

#### `POST /recruiter/search`

Search for candidates (requires recruiter auth).

```json
Request:
{
  "query": "string",
  "filters": {
    "skills": ["Python", "FastAPI"],
    "min_experience": 2,
    "location": "string"
  },
  "top_k": 10
}

Response: 200
{
  "candidates": [
    {
      "candidate_id": "uuid",
      "name": "string (if consent given)",
      "headline": "string",
      "match_score": 0.85,
      "preview_only": true
    }
  ]
}
```

#### `POST /recruiter/request-access`

Request access to full profile (requires student consent).

```json
Request:
{
  "candidate_id": "uuid",
  "role_id": "uuid",
  "message": "string"
}

Response: 201
{
  "request_id": "uuid",
  "status": "pending",
  "expires_at": "timestamp"
}
```

---

### Audit & Compliance

#### `GET /audit/{entity_id}`

Get audit logs for an entity.

```json
Response: 200
{
  "entity_id": "uuid",
  "logs": [
    {
      "action": "profile_updated|signature_verified|access_granted",
      "actor_id": "uuid",
      "timestamp": "timestamp",
      "metadata": {...}
    }
  ]
}
```

---

## Frontend Routes & Pages

### Public Routes

- `/` - Landing Page
- `/login` - Login Page
- `/register` - Registration Page
- `/about` - About KnowTruly
- `/templates` - Browse Resume Templates

### Student Dashboard (Protected)

- `/dashboard` - Main Dashboard
- `/profile` - Edit Profile
- `/profile/education` - Manage Education
- `/profile/experience` - Manage Experience
- `/profile/skills` - Manage Skills
- `/profile/projects` - Manage Projects
- `/resumes` - My Resumes
- `/resumes/generate` - Generate New Resume
- `/resumes/:id` - View/Download Resume
- `/verification` - Verification Requests & Signed Claims
- `/settings` - Account Settings

### Recruiter Portal (Protected)

- `/recruiter/dashboard` - Recruiter Dashboard
- `/recruiter/search` - Talent Search (current: TalentSearchPage.tsx)
- `/recruiter/search/results` - Search Results with Matches
- `/recruiter/candidates/:id` - Candidate Profile View
- `/recruiter/requests` - Access Requests & Status

### Issuer Portal (Protected)

- `/issuer/dashboard` - Issuer Dashboard
- `/issuer/claims` - Manage Claims
- `/issuer/sign` - Sign New Claim
- `/issuer/verify/:signature_id` - Verify Signature

### Admin (Protected)

- `/admin/dashboard` - Admin Dashboard
- `/admin/users` - User Management
- `/admin/templates` - Template Management
- `/admin/analytics` - System Analytics

---

## Frontend Component Structure

```
src/
├── App.tsx (Main App with Router)
├── main.tsx (Entry point)
├── components/
│   ├── AppLayout.tsx (Main layout wrapper)
│   ├── Header.tsx (Navigation)
│   ├── Sidebar.tsx (Dashboard sidebar)
│   ├── ProfileCard.tsx
│   ├── SkillTag.tsx
│   ├── ProjectCard.tsx
│   ├── MatchScoreDisplay.tsx
│   └── SignatureVerificationBadge.tsx
├── pages/
│   ├── LandingPage.tsx
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   ├── student/
│   │   ├── DashboardPage.tsx
│   │   ├── ProfilePage.tsx
│   │   ├── ResumeDashboardPage.tsx (current)
│   │   └── GenerateResumePage.tsx
│   └── recruiter/
│       ├── DashboardPage.tsx
│       ├── TalentSearchPage.tsx (current)
│       └── CandidateDetailPage.tsx
├── services/
│   ├── api.ts (Axios instance with auth)
│   ├── profileService.ts
│   ├── matchService.ts
│   ├── resumeService.ts
│   └── authService.ts
├── hooks/
│   ├── useProfile.ts
│   ├── useMatchResults.ts
│   └── useAuth.ts
├── stores/
│   ├── authStore.ts (Zustand)
│   └── profileStore.ts
├── types/
│   ├── profile.ts
│   ├── match.ts
│   └── resume.ts
└── styles/
    └── global.css (Tailwind)
```

---

## Environment Variables

### Backend (.env)

```bash
# API Configuration
API_HOST=0.0.0.0
API_PORT=8000
API_VERSION=v1

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/knowtruly
POSTGRES_USER=knowtruly
POSTGRES_PASSWORD=your_secure_password
POSTGRES_DB=knowtruly

# Vector Database (Qdrant)
QDRANT_HOST=localhost
QDRANT_PORT=6333
QDRANT_API_KEY=your_qdrant_api_key
QDRANT_COLLECTION_NAME=profiles

# Gemini API
GOOGLE_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-pro
GEMINI_EMBEDDING_MODEL=text-embedding-004

# JWT Auth
SECRET_KEY=your_secret_key_min_32_chars
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# File Storage
UPLOAD_DIR=./uploads
MAX_FILE_SIZE_MB=10

# Signature Service
RSA_KEY_SIZE=2048
SIGNATURE_ALGORITHM=RS256
```

### Frontend (.env)

```bash
VITE_API_BASE_URL=http://localhost:8000/api/v1
VITE_APP_NAME=KnowTruly
VITE_ENABLE_ANALYTICS=false
```

---

## Development Workflow for Agents

### Before Starting Work

1. **Check** `PROGRESS.md` to see what's already done
2. **Read** relevant sections in `documentation.md`
3. **Identify** dependencies (e.g., can't build matchmaker without embeddings)

### During Development

1. **Write tests** before implementation (TDD approach)
2. **Document APIs** with FastAPI docstrings and examples
3. **Use type hints** extensively in Python
4. **Log important operations** (use structured logging)
5. **Handle errors gracefully** with proper HTTP status codes

### After Completing Work

1. **Update** `PROGRESS.md` with:
   - What you completed
   - What works/what's tested
   - Known issues or blockers
   - Next steps for the next agent
2. **Update** `documentation.md` with:
   - Technical implementation details
   - API usage examples
   - Database schema changes
   - Configuration changes
3. **Commit** with clear messages: `feat: implement semantic matching endpoint`

---

## Testing Requirements

### Backend Tests

- **Unit Tests**: Each service function (pytest)
- **Integration Tests**: API endpoint testing (httpx + pytest)
- **Embedding Tests**: Vector similarity accuracy
- **Match Tests**: NDCG@k, precision@k on labeled dataset

### Frontend Tests

- **Component Tests**: React Testing Library
- **E2E Tests**: Playwright (critical flows only for POC)

### Test Data

Create mock data in `backend/tests/fixtures/`:

- 10 sample student profiles
- 5 role descriptors
- Expected match scores for evaluation

---

## Deployment (POC)

### Docker Compose Setup

```yaml
services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    env_file: .env
    depends_on:
      - postgres
      - qdrant

  postgres:
    image: pgvector/pgvector:pg16
    environment:
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: ${POSTGRES_DB}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  qdrant:
    image: qdrant/qdrant
    ports:
      - "6333:6333"
    volumes:
      - qdrant_data:/qdrant/storage

  frontend:
    build: ./frontend
    ports:
      - "5173:5173"
    depends_on:
      - backend

volumes:
  postgres_data:
  qdrant_data:
```

---

## Common Gotchas & Best Practices

### For Embedding Service

- **Batch operations**: Embed multiple items in one API call to Gemini
- **Cache embeddings**: Store in Qdrant with metadata for reuse
- **Normalize vectors**: Ensure unit length for cosine similarity
- **Version models**: Track which embedding model version was used

### For Matchmaker

- **Hybrid scoring**: Combine vector similarity (0.7 weight) + rule filters (0.3 weight)
- **Explainability**: Always return top contributing features
- **Performance**: Pre-filter with rules before vector search
- **Evaluation**: Maintain a labeled test set and track NDCG@10

### For LLM Orchestration

- **Prompt versioning**: Keep prompts in version control
- **Temperature**: Use 0.3-0.5 for deterministic rephrasing
- **Token limits**: Monitor Gemini API quotas
- **Fallbacks**: If rephrasing fails, return original text

### For Resume Generation

- **Layout constraints**: Check overflow before rendering PDF
- **Fonts**: Embed fonts in PDF for portability
- **Accessibility**: Ensure PDF has proper structure tags

---

## Critical Documentation Files

### `PROGRESS.md` (Create this)

Track daily/weekly progress with structure:

```markdown
# Progress Log

## [Date] - [Agent/Developer Name]

### Completed

- Feature X implemented
- API endpoint Y tested
- Bug Z fixed

### In Progress

- Feature A (50% done)

### Blocked

- Waiting for Gemini API key

### Next Steps

- Implement feature B
- Write tests for endpoint Y
```

### `documentation.md` (Create this)

Technical deep-dive documentation:

```markdown
# Technical Documentation

## Architecture Decisions

### Why FastAPI?

- Async support for embeddings
- Auto-generated OpenAPI docs
- Type safety with Pydantic

## Database Schema

### profiles table

...

## API Implementation Details

### Embedding Service

Implementation notes, code examples, performance benchmarks

## Deployment Guide

Step-by-step setup instructions
```

---

## Quick Reference Commands

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On macOS/Linux
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend Setup

```bash
cd frontend
pnpm install
pnpm dev
```

### Run Tests

```bash
# Backend
pytest

# Frontend
pnpm test
```

### Docker Compose

```bash
docker-compose up -d
docker-compose logs -f backend
```

---

## Success Metrics for POC

### Phase 1 Complete When:

- [ ] Gemini embeddings integrated and stored in Qdrant
- [ ] 10 test profiles embedded and searchable
- [ ] Semantic match API returns scores with >0.7 accuracy on test set
- [ ] Match explainability shows top 3 contributing factors

### Phase 2 Complete When:

- [ ] 2 resume templates implemented
- [ ] AI rephrasing works within character limits
- [ ] PDF generation produces valid, formatted output
- [ ] End-to-end: profile → template → PDF in <10 seconds

### Phase 3 Complete When:

- [ ] RSA signature generation and verification works
- [ ] Signed claims stored and retrievable
- [ ] Audit logs capture all signature operations

---

## Getting Help

### When Stuck

1. Check `documentation.md` for implementation details
2. Review CONSTITUTION.md for architectural guidance
3. Look at existing code patterns in the repo
4. Search FastAPI docs: https://fastapi.tiangolo.com
5. Check Gemini API docs: https://ai.google.dev/docs

### When Handing Off

Update `PROGRESS.md` with:

- **Current state**: What works, what doesn't
- **Context**: Why you made certain decisions
- **Blockers**: What's preventing progress
- **Next agent should**: Clear action items

---

## Important Notes

1. **POC Focus**: Prioritize working features over perfect code. Document tech debt in `documentation.md`
2. **Gemini API**: Watch rate limits (60 requests/minute on free tier). Implement retry with exponential backoff
3. **Embeddings**: Use `text-embedding-004` model (768 dimensions). Cache aggressively
4. **Security**: For POC, basic JWT auth is fine. Plan for OAuth2 in production
5. **Frontend State**: Use React Query for server state, Zustand for UI state
6. **Error Handling**: Return structured error responses: `{"detail": "Error message", "error_code": "PROFILE_NOT_FOUND"}`

---

## Version History

- **v1.0** (2025-11-09): Initial AGENTS.md created with core API schemas and frontend routes

---

## End of Document

**Remember**: Read CONSTITUTION.md for "why", read AGENTS.md for "how". Document everything in `documentation.md` and `PROGRESS.md` for seamless handoffs.
