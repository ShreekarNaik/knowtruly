# KnowTruly.me - API Reference

**Base URL**: `http://localhost:8000/api/v1`

**Interactive Documentation**: http://localhost:8000/api/v1/docs

---

## Table of Contents

1. [Authentication](#authentication)
2. [Profiles](#profiles)
3. [Matching](#matching)
4. [Resumes](#resumes)
5. [Verification](#verification)
6. [Response Codes](#response-codes)
7. [Error Handling](#error-handling)

---

## Authentication

All authenticated endpoints require a JWT token in the `Authorization` header:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

### Register User

**POST** `/auth/register`

Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123",
  "role": "student"
}
```

**Roles**: `student`, `recruiter`, `issuer`, `admin`

**Response:** `201 Created`
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "role": "student",
  "is_active": true,
  "created_at": "2025-01-09T12:00:00Z",
  "access_token": "eyJhbGc..."
}
```

### Login

**POST** `/auth/login`

Login and receive JWT token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Response:** `200 OK`
```json
{
  "access_token": "eyJhbGc...",
  "token_type": "bearer"
}
```

### Get Current User

**GET** `/auth/me`

Get current authenticated user information.

**Response:** `200 OK`
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "role": "student",
  "is_active": true,
  "created_at": "2025-01-09T12:00:00Z"
}
```

---

## Profiles

### Create Profile

**POST** `/profiles`

Create a new profile with automatic semantic embedding.

**Auth Required**: Student

**Request Body:**
```json
{
  "canonical_name": "John Doe",
  "headline": "Full Stack Developer",
  "summary": "Experienced developer with 3 years in web applications",
  "contact_handles": {
    "email": "john@example.com",
    "phone": "+1234567890",
    "linkedin": "linkedin.com/in/johndoe",
    "github": "github.com/johndoe"
  },
  "education": [
    {
      "institution": "MIT",
      "degree": "B.S. Computer Science",
      "field_of_study": "Computer Science",
      "start_date": "2018-09-01",
      "end_date": "2022-05-31",
      "gpa": 3.8,
      "achievements": ["Dean's List", "Graduated with Honors"]
    }
  ],
  "positions": [
    {
      "title": "Software Engineer",
      "company": "TechCorp",
      "start_date": "2022-06-01",
      "end_date": null,
      "description": "Developed scalable web applications",
      "skills_used": ["Python", "React", "PostgreSQL"]
    }
  ],
  "skills": [
    {
      "name": "Python",
      "proficiency": "advanced",
      "evidence_ids": [],
      "verified": false
    }
  ],
  "projects": [
    {
      "title": "E-commerce Platform",
      "role_description": "Lead Developer",
      "description": "Built full-stack e-commerce solution",
      "technologies": ["Python", "FastAPI", "React"],
      "start_date": "2023-01-01",
      "end_date": "2023-06-30",
      "artifacts": ["github.com/johndoe/ecommerce"],
      "metrics": {"users": 1000, "revenue": 50000}
    }
  ],
  "badges": []
}
```

**Response:** `201 Created`
```json
{
  "id": "uuid",
  "owner_id": "uuid",
  "version": 1,
  "embedding_id": "emb_uuid",
  "canonical_name": "John Doe",
  "created_at": "2025-01-09T12:00:00Z"
}
```

### Get Profile

**GET** `/profiles/{profile_id}`

**Query Parameters:**
- `version` (optional): Specific version number

**Response:** `200 OK`
```json
{
  "id": "uuid",
  "owner_id": "uuid",
  "version": 1,
  "canonical_name": "John Doe",
  "headline": "Full Stack Developer",
  "...": "..."
}
```

### Update Profile

**PATCH** `/profiles/{profile_id}`

Update profile (increments version and regenerates embedding).

**Request Body:** (partial update)
```json
{
  "summary": "Updated summary",
  "skills": [...]
}
```

**Response:** `200 OK`

### Create Snapshot

**POST** `/profiles/{profile_id}/snapshots`

Create immutable snapshot of current profile version.

**Response:** `201 Created`
```json
{
  "id": "uuid",
  "profile_id": "uuid",
  "version": 1,
  "snapshot_data": {...},
  "created_at": "2025-01-09T12:00:00Z"
}
```

### List Snapshots

**GET** `/profiles/{profile_id}/snapshots`

**Response:** `200 OK` (array of snapshots)

---

## Matching

### Semantic Match

**POST** `/match`

Find best matching candidates for a role using hybrid AI scoring.

**Auth Required**: Recruiter

**Request Body:**
```json
{
  "role_descriptor": {
    "title": "Senior Python Developer",
    "company": "TechCorp",
    "description": "Looking for experienced Python developer",
    "required_skills": ["Python", "FastAPI", "PostgreSQL"],
    "preferred_skills": ["Docker", "AWS"],
    "constraints": {
      "min_experience_years": 3,
      "location": "Remote",
      "min_degree": "Bachelor's"
    }
  },
  "top_k": 20,
  "filters": {
    "min_experience": 2
  }
}
```

**Response:** `200 OK`
```json
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
        "gaps": ["AWS experience"],
        "vector_similarity": 0.85,
        "rule_score": 0.92
      }
    }
  ],
  "query_embedding_id": "uuid",
  "matched_at": "2025-01-09T12:00:00Z"
}
```

### Batch Match

**POST** `/match/batch`

Match specific candidates against a saved role.

**Request Body:**
```json
{
  "role_id": "uuid",
  "candidate_ids": ["uuid1", "uuid2"],
  "return_explanations": true
}
```

**Response:** `200 OK`

### Create Role Descriptor

**POST** `/match/roles`

Save job description for reuse.

**Request Body:**
```json
{
  "title": "Senior Python Developer",
  "company": "TechCorp",
  "description": "...",
  "required_skills": ["Python", "FastAPI"],
  "preferred_skills": ["Docker"],
  "constraints": {}
}
```

**Response:** `201 Created`

### List Role Descriptors

**GET** `/match/roles`

List all roles created by current recruiter.

**Response:** `200 OK` (array)

### Get Role Descriptor

**GET** `/match/roles/{role_id}`

**Response:** `200 OK`

---

## Resumes

### Generate Resume

**POST** `/resumes/generate`

Generate role-specific resume with optional AI rephrasing.

**Auth Required**: Student

**Request Body:**
```json
{
  "profile_id": "uuid",
  "template_name": "basic_resume",
  "role_descriptor": {
    "title": "Software Engineer",
    "description": "..."
  },
  "options": {
    "ai_rephrase": true,
    "max_pages": 2,
    "format": "pdf",
    "tone": "professional"
  }
}
```

**Response:** `200 OK`
```json
{
  "resume_id": "uuid",
  "snapshot_id": "uuid",
  "download_url": "/api/v1/resumes/uuid/download",
  "format": "pdf",
  "generation_metadata": {
    "rephrased_sections": ["summary", "projects"],
    "template_used": "basic_resume",
    "llm_model": "gemini-pro",
    "generation_time_seconds": 3.5,
    "ai_rephrase_used": true
  }
}
```

### Get Resume

**GET** `/resumes/{resume_id}`

Get resume metadata.

**Response:** `200 OK`

### Download Resume

**GET** `/resumes/{resume_id}/download`

Download PDF file.

**Response:** `200 OK` (PDF binary)
**Content-Type:** `application/pdf`

### List User Resumes

**GET** `/resumes`

List all resumes for current user.

**Response:** `200 OK` (array)

### List Templates

**GET** `/resumes/templates/list`

**Response:** `200 OK`
```json
[
  {
    "id": "uuid",
    "name": "basic_resume",
    "description": "Clean single-column layout",
    "layout_type": "single_column",
    "preview_url": null,
    "is_active": true
  }
]
```

### Rephrase Text

**POST** `/resumes/rephrase`

Test AI rephrasing (utility endpoint).

**Request Body:**
```json
{
  "original_text": "I worked on many projects...",
  "context": "project_description",
  "max_chars": 200,
  "tone": "professional",
  "preserve_claims": true
}
```

**Response:** `200 OK`
```json
{
  "rephrased_text": "Led development of multiple projects...",
  "tokens_used": 50,
  "model_version": "gemini-pro",
  "preserved_claims": ["numeric: 5", "numeric: 1000"],
  "original_length": 150,
  "rephrased_length": 120,
  "fallback": false
}
```

---

## Verification

### Generate Key Pair

**POST** `/verification/keys/generate`

Generate RSA-2048 key pair for issuer.

**Auth Required**: Issuer

**Response:** `200 OK`
```json
{
  "private_key": "-----BEGIN PRIVATE KEY-----\n...",
  "public_key": "-----BEGIN PUBLIC KEY-----\n...",
  "algorithm": "RSA-SHA256",
  "key_size": 2048
}
```

**⚠️ IMPORTANT**: Store private key securely! It cannot be recovered.

### Sign Claim

**POST** `/verification/sign`

Sign a verifiable credential.

**Auth Required**: Issuer

**Request Body:**
```json
{
  "subject_profile_id": "uuid",
  "claim_type": "degree",
  "claim_payload": {
    "degree": "Bachelor of Science",
    "major": "Computer Science",
    "institution": "MIT",
    "graduation_date": "2022-05-31",
    "gpa": 3.8
  },
  "expires_in_days": 1825,
  "issuer_private_key": "-----BEGIN PRIVATE KEY-----\n..."
}
```

**Claim Types**: `degree`, `skill`, `employment`, `project`

**Response:** `200 OK`
```json
{
  "claim_id": "uuid",
  "signature": "base64_encoded_signature",
  "algorithm": "RSA-SHA256",
  "claim_data": {...},
  "signed_at": "2025-01-09T12:00:00Z"
}
```

### Verify Claim

**POST** `/verification/verify`

Verify a signed claim.

**Request Body:**
```json
{
  "claim_id": "uuid",
  "issuer_public_key": "-----BEGIN PUBLIC KEY-----\n..."
}
```

**Response:** `200 OK`
```json
{
  "valid": true,
  "claim_id": "uuid",
  "issuer_id": "uuid",
  "subject_profile_id": "uuid",
  "claim_type": "degree",
  "claim_payload": {...},
  "issued_at": "2025-01-09T12:00:00Z",
  "expires_at": "2030-01-09T12:00:00Z",
  "verified_at": "2025-01-09T12:30:00Z"
}
```

**If Invalid:**
```json
{
  "valid": false,
  "error": "Invalid signature - claim data has been tampered with"
}
```

### Revoke Claim

**POST** `/verification/revoke`

Revoke a previously issued claim.

**Auth Required**: Issuer (must be original issuer)

**Request Body:**
```json
{
  "claim_id": "uuid",
  "reason": "Student withdrew from program"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "claim_id": "uuid",
  "revoked_at": "2025-01-09T12:00:00Z",
  "reason": "Student withdrew from program"
}
```

### Get Claim

**GET** `/verification/claims/{claim_id}`

**Response:** `200 OK`

### List Profile Claims

**GET** `/verification/claims/profile/{profile_id}`

List all claims for a profile.

**Response:** `200 OK` (array)

### List Issued Claims

**GET** `/verification/claims/issuer/me`

List all claims issued by current issuer.

**Response:** `200 OK` (array)

---

## Response Codes

- **200 OK**: Request successful
- **201 Created**: Resource created successfully
- **400 Bad Request**: Invalid request data
- **401 Unauthorized**: Authentication required
- **403 Forbidden**: Insufficient permissions
- **404 Not Found**: Resource not found
- **422 Unprocessable Entity**: Validation error
- **500 Internal Server Error**: Server error

---

## Error Handling

All errors return JSON with detail:

```json
{
  "detail": "Error message here"
}
```

Validation errors (422):
```json
{
  "detail": [
    {
      "loc": ["body", "field_name"],
      "msg": "field required",
      "type": "value_error.missing"
    }
  ]
}
```

---

## Rate Limits

- **Gemini API**: 60 requests/minute (free tier)
- **General API**: No hard limits (use responsibly)

---

## Best Practices

1. **Store JWT tokens securely** (httpOnly cookies recommended for web)
2. **Never commit private keys** to version control
3. **Cache embeddings** - they're expensive to generate
4. **Use batch operations** when possible
5. **Handle rate limits** with exponential backoff
6. **Validate inputs** on client side before API calls
7. **Keep tokens fresh** - refresh before expiration

---

## Examples

See `QUICKSTART.md` for complete usage examples.

Interactive API playground: http://localhost:8000/api/v1/docs
