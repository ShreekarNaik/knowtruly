# KnowTruly Backend - Progress Log

## [2025-01-09] - Initial Backend Setup

### Completed

#### Phase 1: Project Setup & Core Infrastructure ✅
- [x] Created complete backend directory structure
- [x] Set up `requirements.txt` with all dependencies:
  - FastAPI 0.104.1
  - SQLAlchemy 2.0.23 + Alembic for database
  - Qdrant client for vector storage
  - Google Generative AI for embeddings
  - JWT authentication libraries
  - Testing frameworks (pytest)
- [x] Created `.env.example` with all configuration variables
- [x] Implemented `app/core/config.py` with Pydantic settings
- [x] Created Docker Compose configuration:
  - PostgreSQL with pgvector extension
  - Qdrant vector database
  - Backend FastAPI service
  - Proper health checks and networking
- [x] Created `Dockerfile` with Typst installation for resume generation
- [x] Database initialization script (`init.sql`) with pgvector extension
- [x] Database models created:
  - User model with role-based access
  - Profile model with JSON fields for flexibility
  - ProfileSnapshot for immutable profile versions
  - VerifiableClaim and Signature models
  - ResumeTemplate, GeneratedResume, RoleDescriptor, MatchResult models
- [x] Core security utilities (`app/core/security.py`):
  - Password hashing with bcrypt
  - JWT token creation and verification
- [x] Main FastAPI application (`app/main.py`) with:
  - CORS configuration
  - Health check endpoint
  - Auto-generated API docs at `/api/v1/docs`

#### Phase 2: Embedding Service & Vector Store (In Progress)
- [x] Implemented `EmbeddingService` (`app/services/embedding_service.py`):
  - Gemini API integration for text embeddings
  - Batch embedding generation with rate limiting
  - Profile embedding (combines all fields semantically)
  - Role descriptor embedding
  - Query embedding for search
  - Exponential backoff retry logic
- [x] Implemented `VectorStore` (`app/services/vector_store.py`):
  - Qdrant client wrapper
  - Automatic collection initialization
  - Store/retrieve embeddings with metadata
  - Similarity search with filters
  - Batch operations
  - Metadata updates
- [x] Created Pydantic schemas:
  - Profile schemas (`app/schemas/profile.py`)
  - Match schemas (`app/schemas/match.py`)
  - Auth schemas (`app/schemas/auth.py`)

### In Progress

#### Phase 2: Embedding Service & Vector Store
- [ ] API endpoints for embeddings and profiles
- [ ] Authentication endpoints
- [ ] Profile CRUD operations with automatic embedding generation

### Next Steps

1. **Complete Phase 2**:
   - Create API endpoint files in `app/api/v1/endpoints/`
   - Implement authentication endpoints (register, login)
   - Implement profile endpoints (create, read, update with embeddings)
   - Create dependency injection for current user
   - Test embedding generation and vector storage

2. **Phase 3: Semantic Matchmaker Engine**:
   - Implement match service with hybrid scoring
   - Create match API endpoints
   - Build explainability logic
   - Create test dataset for evaluation

3. **Phase 4: Resume Generation**:
   - Copy Typst template from aidump/resume.typ
   - Implement Typst compilation service
   - Create LLM service for text rephrasing
   - Build resume generation endpoint

### Technical Notes

**Database Schema**:
- Using PostgreSQL with pgvector for embedding storage alongside relational data
- JSON columns for flexible nested data (education, skills, projects)
- UUID primary keys throughout
- Enum types for user roles, proficiency levels, claim types, claim status

**Vector Storage Strategy**:
- Qdrant for fast similarity search
- 768-dimensional vectors (Gemini text-embedding-004)
- Cosine similarity metric
- Metadata stored with vectors for filtering

**Embedding Strategy**:
- Profile embedding combines: name, headline, summary, education, skills, experience, projects
- Role embedding combines: title, company, description, required/preferred skills
- Batch processing with rate limit respect (60 req/min on free tier)
- Retry with exponential backoff

**Authentication**:
- JWT tokens with configurable expiration (default 30 min)
- Password hashing with bcrypt
- Role-based access control (student, recruiter, issuer, admin)

### Known Issues / Blockers

None currently. Ready to proceed with API endpoint implementation.

### Environment Setup Instructions

1. **Copy environment file**:
   ```bash
   cd backend
   cp .env.example .env
   ```

2. **Add your Gemini API key** to `.env`:
   ```
   GOOGLE_API_KEY=your_actual_gemini_api_key_here
   ```

3. **Generate a secure SECRET_KEY** for JWT:
   ```bash
   python -c "import secrets; print(secrets.token_urlsafe(32))"
   ```
   Add to `.env`

4. **Start services with Docker Compose**:
   ```bash
   docker-compose up -d
   ```

5. **Access API documentation**:
   - Swagger UI: http://localhost:8000/api/v1/docs
   - Health check: http://localhost:8000/health

### Testing Strategy

**Unit Tests** (to be created):
- `tests/test_embedding_service.py` - Test embedding generation
- `tests/test_vector_store.py` - Test Qdrant operations
- `tests/test_auth.py` - Test authentication flows
- `tests/test_profiles.py` - Test profile CRUD

**Integration Tests**:
- End-to-end profile creation with embedding
- Search functionality
- Match scoring accuracy

**Test Fixtures** (to be created):
- 10 sample student profiles
- 5 role descriptors
- Expected match results for evaluation

### Performance Considerations

- Batch embed operations to reduce API calls
- Cache embeddings in Qdrant aggressively
- Use async/await throughout for non-blocking I/O
- Connection pooling for PostgreSQL
- Rate limit handling for Gemini API

### Security Considerations

- Passwords hashed with bcrypt (never stored plain)
- JWT tokens for stateless authentication
- CORS properly configured
- Input validation via Pydantic schemas
- SQL injection prevention via SQLAlchemy ORM
- Environment variables for secrets (never committed)

---

## For Next Developer

**Priority Tasks**:
1. Create `.env` file with actual API keys
2. Test Docker Compose setup
3. Implement authentication endpoints
4. Implement profile endpoints with embedding generation
5. Write integration tests

**Reference Documents**:
- CONSTITUTION.md - Overall architecture and principles
- AGENTS.md - Technical specs and API contracts
- This file - Current progress and next steps
