# KnowTruly Backend - Quick Start Guide

## Prerequisites

- Docker and Docker Compose installed
- Google Gemini API key ([Get one here](https://ai.google.dev/))
- Python 3.11+ (for local development without Docker)

## 🚀 Quick Start (5 minutes)

### 1. Setup Environment

```bash
cd backend

# Copy environment template
cp .env.example .env
```

### 2. Configure API Keys

Edit `.env` and add your keys:

```bash
# Required: Add your Gemini API key
GOOGLE_API_KEY=your_gemini_api_key_here

# Required: Generate a secure secret key
SECRET_KEY=$(python3 -c "import secrets; print(secrets.token_urlsafe(32))")
```

Or generate SECRET_KEY manually:
```bash
python3 -c "import secrets; print(secrets.token_urlsafe(32))"
```

### 3. Start All Services

```bash
docker-compose up -d
```

This starts:
- PostgreSQL (port 5432) with pgvector extension
- Qdrant vector database (ports 6333, 6334)
- FastAPI backend (port 8000)

### 4. Verify Services

```bash
# Check health
curl http://localhost:8000/health

# Expected response:
# {"status":"healthy","environment":"development"}
```

### 5. Access API Documentation

Open in browser:
- **Swagger UI**: http://localhost:8000/api/v1/docs
- **ReDoc**: http://localhost:8000/api/v1/redoc

## 📝 Test the API

### Register a Student User

```bash
curl -X POST "http://localhost:8000/api/v1/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@example.com",
    "password": "securepassword123",
    "role": "student"
  }'
```

Response includes `access_token` - save this!

### Create a Profile

```bash
curl -X POST "http://localhost:8000/api/v1/profiles" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "canonical_name": "John Doe",
    "headline": "Full Stack Developer",
    "summary": "Passionate developer with 3 years of experience",
    "contact_handles": {
      "email": "john@example.com",
      "github": "johndoe"
    },
    "skills": [
      {
        "name": "Python",
        "proficiency": "advanced",
        "evidence_ids": [],
        "verified": false
      }
    ],
    "education": [],
    "positions": [],
    "projects": [],
    "badges": []
  }'
```

This automatically:
- Creates profile in PostgreSQL
- Generates semantic embedding via Gemini
- Stores embedding in Qdrant for similarity search

## 🔍 Available Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register user
- `POST /api/v1/auth/login` - Login (get JWT token)
- `GET /api/v1/auth/me` - Get current user info

### Profiles
- `POST /api/v1/profiles` - Create profile (with automatic embedding)
- `GET /api/v1/profiles/{id}` - Get profile
- `PATCH /api/v1/profiles/{id}` - Update profile (re-embeds)
- `POST /api/v1/profiles/{id}/snapshots` - Create immutable snapshot
- `GET /api/v1/profiles/{id}/snapshots` - List snapshots

## 🛠️ Development Commands

### View Logs
```bash
docker-compose logs -f backend    # Backend logs
docker-compose logs -f postgres   # Database logs
docker-compose logs -f qdrant     # Vector DB logs
```

### Stop Services
```bash
docker-compose down
```

### Rebuild After Code Changes
```bash
docker-compose up -d --build
```

### Access Database
```bash
docker-compose exec postgres psql -U knowtruly -d knowtruly
```

### Access Qdrant Dashboard
Open: http://localhost:6333/dashboard

## 🧪 Testing

```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=app tests/

# Run specific test file
pytest tests/test_auth.py
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Check what's using port 8000
lsof -ti:8000

# Kill the process
lsof -ti:8000 | xargs kill -9

# Or change port in .env
API_PORT=8001
```

### Qdrant Connection Error
```bash
# Check Qdrant is running
docker-compose ps qdrant
docker-compose logs qdrant

# Restart Qdrant
docker-compose restart qdrant
```

### Database Connection Error
```bash
# Check PostgreSQL
docker-compose ps postgres
docker-compose logs postgres

# Check DATABASE_URL in .env matches docker-compose.yml
```

### Gemini API Rate Limit
- Free tier: 60 requests/minute
- The code includes exponential backoff retry
- Consider upgrading if hitting limits

## 📚 Next Steps

1. **Implement Matching**: See Phase 3 in PROGRESS.md
2. **Add Resume Generation**: Integrate Typst templates
3. **Implement Signatures**: Cryptographic verification
4. **Write Tests**: Unit and integration tests
5. **Add More Endpoints**: Recruiter portal, admin panel

## 🔗 Resources

- [CONSTITUTION.md](../CONSTITUTION.md) - Product vision & architecture
- [AGENTS.md](../AGENTS.md) - API specs & technical details
- [PROGRESS.md](PROGRESS.md) - Current status & handoff notes
- [README.md](README.md) - Full documentation

## 💡 Tips

1. **Use Swagger UI** for interactive API testing
2. **Check PROGRESS.md** for latest implementation status
3. **JWT tokens expire** in 30 minutes (configurable in .env)
4. **Embeddings are cached** in Qdrant - delete/recreate if needed
5. **Profile updates create new versions** - old versions preserved

## 🆘 Getting Help

- Check logs: `docker-compose logs -f backend`
- Verify environment: `.env` has all required values
- Test health endpoint: `curl http://localhost:8000/health`
- Review PROGRESS.md for known issues

---

**Happy Hacking! 🚀**
