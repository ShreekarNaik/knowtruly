# KnowTruly Backend API

Backend service for KnowTruly - A semantic profile platform for students and recruiters.

## Overview

FastAPI-based backend providing:
- **Semantic Profile Management**: Living, versioned student profiles with embedding-based representation
- **Vector Search**: Qdrant-powered similarity search for talent matching
- **Resume Generation**: Typst-based PDF generation with AI rephrasing
- **Cryptographic Verification**: Digital signatures for claims and credentials
- **Role-Based Access**: Student, Recruiter, Issuer, and Admin roles

## Tech Stack

- **Framework**: FastAPI 0.104.1 (Python 3.11+)
- **Database**: PostgreSQL 16 + pgvector extension
- **Vector Store**: Qdrant
- **LLM/Embeddings**: Google Gemini API
- **Authentication**: JWT tokens
- **Resume Engine**: Typst
- **Containerization**: Docker + Docker Compose

## Quick Start

### Prerequisites

- Docker and Docker Compose
- Google Gemini API key

### Setup

1. **Clone and navigate to backend**:
   ```bash
   cd backend
   ```

2. **Create environment file**:
   ```bash
   cp .env.example .env
   ```

3. **Configure environment variables** in `.env`:
   ```bash
   # Required: Add your Gemini API key
   GOOGLE_API_KEY=your_gemini_api_key_here
   
   # Required: Generate a secure secret key
   SECRET_KEY=$(python -c "import secrets; print(secrets.token_urlsafe(32))")
   ```

4. **Start services**:
   ```bash
   docker-compose up -d
   ```

5. **Check health**:
   ```bash
   curl http://localhost:8000/health
   ```

6. **Access API documentation**:
   - Swagger UI: http://localhost:8000/api/v1/docs
   - ReDoc: http://localhost:8000/api/v1/redoc

## Project Structure

```
backend/
├── app/
│   ├── api/
│   │   └── v1/
│   │       └── endpoints/       # API route handlers
│   ├── core/
│   │   ├── config.py           # Configuration management
│   │   └── security.py         # Auth utilities
│   ├── db/
│   │   └── base.py             # Database session
│   ├── models/                 # SQLAlchemy models
│   │   ├── user.py
│   │   ├── profile.py
│   │   ├── claim.py
│   │   └── resume.py
│   ├── schemas/                # Pydantic schemas
│   │   ├── auth.py
│   │   ├── profile.py
│   │   └── match.py
│   ├── services/               # Business logic
│   │   ├── embedding_service.py
│   │   ├── vector_store.py
│   │   └── match_service.py
│   ├── utils/                  # Helper functions
│   └── main.py                 # FastAPI app
├── templates/                  # Typst resume templates
├── generated_resumes/          # Output directory
├── tests/                      # Test suite
├── docker-compose.yml
├── Dockerfile
├── requirements.txt
└── .env.example
```

## API Endpoints (Planned)

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login and get JWT token

### Profiles
- `POST /api/v1/profiles` - Create profile with automatic embedding
- `GET /api/v1/profiles/{id}` - Get profile by ID
- `PATCH /api/v1/profiles/{id}` - Update profile (increments version)
- `GET /api/v1/profiles/{id}/snapshots` - Get profile snapshots

### Embeddings
- `POST /api/v1/embeddings/create` - Generate embeddings
- `POST /api/v1/embeddings/search` - Vector similarity search

### Matching
- `POST /api/v1/match` - Semantic candidate-role matching
- `POST /api/v1/match/batch` - Batch matching

### Resumes
- `POST /api/v1/resumes/generate` - Generate role-specific resume
- `GET /api/v1/resumes/{id}` - Download resume
- `GET /api/v1/templates` - List resume templates

### Signatures
- `POST /api/v1/signatures/sign` - Sign claim or snapshot
- `GET /api/v1/signatures/verify/{id}` - Verify signature

## Development

### Local Development (without Docker)

1. **Create virtual environment**:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Start PostgreSQL and Qdrant** (via Docker):
   ```bash
   docker-compose up postgres qdrant -d
   ```

4. **Run development server**:
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

### Running Tests

```bash
pytest
pytest --cov=app tests/  # With coverage
```

### Code Formatting

```bash
black app/
ruff check app/
```

## Configuration

Key environment variables (see `.env.example` for full list):

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | Required |
| `GOOGLE_API_KEY` | Gemini API key | Required |
| `SECRET_KEY` | JWT signing key | Required |
| `QDRANT_HOST` | Qdrant server host | localhost |
| `QDRANT_PORT` | Qdrant server port | 6333 |
| `API_PORT` | Backend API port | 8000 |

## Database Migrations

Using Alembic for database migrations:

```bash
# Create migration
alembic revision --autogenerate -m "description"

# Apply migrations
alembic upgrade head

# Rollback
alembic downgrade -1
```

## Docker Commands

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f backend

# Stop services
docker-compose down

# Rebuild after code changes
docker-compose up -d --build

# Access backend shell
docker-compose exec backend bash

# Access PostgreSQL
docker-compose exec postgres psql -U knowtruly -d knowtruly
```

## Monitoring

- **Health Check**: `GET /health`
- **Database**: pgAdmin available at http://localhost:5050 (if configured)
- **Qdrant Dashboard**: http://localhost:6333/dashboard
- **Logs**: `docker-compose logs -f backend`

## Performance Optimization

- Connection pooling for PostgreSQL
- Batch embedding generation (10 per batch)
- Async/await for I/O operations
- Qdrant vector caching
- Rate limiting for Gemini API with exponential backoff

## Security

- JWT token authentication
- Password hashing with bcrypt
- CORS properly configured
- Input validation via Pydantic
- SQL injection prevention via ORM
- Environment-based secrets

## Troubleshooting

### Common Issues

**1. Qdrant connection failed**
```bash
# Check Qdrant is running
docker-compose ps qdrant
docker-compose logs qdrant
```

**2. Database connection error**
```bash
# Check PostgreSQL is running
docker-compose ps postgres
# Check DATABASE_URL in .env
```

**3. Gemini API errors**
- Verify `GOOGLE_API_KEY` in `.env`
- Check API quota limits
- Review rate limiting logs

**4. Port already in use**
```bash
# Change API_PORT in .env or
docker-compose down
# Kill process using port 8000
lsof -ti:8000 | xargs kill -9
```

## Contributing

1. Create feature branch
2. Make changes with tests
3. Run linting: `black app/ && ruff check app/`
4. Run tests: `pytest`
5. Update `PROGRESS.md`
6. Submit pull request

## Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [SQLAlchemy ORM](https://docs.sqlalchemy.org/)
- [Qdrant Documentation](https://qdrant.tech/documentation/)
- [Gemini API](https://ai.google.dev/docs)
- [Typst Documentation](https://typst.app/docs/)

## License

Proprietary - KnowTruly.me

## Support

For issues and questions:
- Check `PROGRESS.md` for current status
- Review `CONSTITUTION.md` for architecture decisions
- See `AGENTS.md` for API specifications
