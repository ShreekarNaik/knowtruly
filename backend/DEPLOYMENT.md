# KnowTruly.me Deployment Guide

## Prerequisites

- Docker & Docker Compose
- Google Gemini API key
- Qdrant Cloud account (or local Qdrant)
- Domain name (for production)
- SSL certificates (for production)

## Environment Setup

### 1. Create Environment File

```bash
cp .env.example .env
```

### 2. Configure Environment Variables

```bash
# API Configuration
API_HOST=0.0.0.0
API_PORT=8000
API_VERSION=v1
ENVIRONMENT=production  # or development

# Database
DATABASE_URL=postgresql://knowtruly:YOUR_PASSWORD@postgres:5432/knowtruly
POSTGRES_USER=knowtruly
POSTGRES_PASSWORD=YOUR_SECURE_PASSWORD_HERE
POSTGRES_DB=knowtruly

# Vector Database (Qdrant)
QDRANT_HOST=your-cluster.qdrant.io
QDRANT_PORT=6333
QDRANT_API_KEY=your_qdrant_api_key
QDRANT_COLLECTION_NAME=profiles

# Google Gemini API
GOOGLE_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-pro
GEMINI_EMBEDDING_MODEL=text-embedding-004
GEMINI_MAX_RETRIES=3

# JWT Authentication
SECRET_KEY=$(openssl rand -hex 32)  # Generate a random 32-byte key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# CORS Settings
ALLOWED_ORIGINS=https://knowtruly.me,https://app.knowtruly.me

# File Storage
UPLOAD_DIR=/app/uploads
MAX_FILE_SIZE_MB=10

# Typst Configuration
TYPST_CLI_PATH=/usr/local/bin/typst
TYPST_TEMPLATES_DIR=/app/templates
TYPST_OUTPUT_DIR=/app/generated_resumes
TYPST_TIMEOUT_SECONDS=30

# Signature Service
RSA_KEY_SIZE=2048
SIGNATURE_ALGORITHM=RS256
SIGNATURE_KEY_PATH=/app/keys

# Logging
LOG_LEVEL=INFO  # DEBUG for development, INFO for production
```

## Local Development Deployment

### 1. Start Services

```bash
docker compose up -d
```

### 2. Initialize Database

```bash
docker compose exec backend python -m app.init_db_tables
```

### 3. Create Admin User (Optional)

```bash
docker compose exec backend python -m app.scripts.create_admin
```

### 4. Verify Services

```bash
# Check backend
curl http://localhost:8000/api/v1/health

# Check Swagger docs
open http://localhost:8000/api/v1/docs

# Check database
docker compose exec postgres psql -U knowtruly -d knowtruly -c "\dt"

# Check Qdrant
curl http://localhost:6333/collections
```

## Production Deployment

### Option 1: Docker Compose (Single Server)

#### 1. Update docker-compose.prod.yml

```yaml
version: '3.8'

services:
  backend:
    build: 
      context: .
      dockerfile: Dockerfile
    environment:
      - ENVIRONMENT=production
    env_file:
      - .env.production
    volumes:
      - ./uploads:/app/uploads
      - ./generated_resumes:/app/generated_resumes
      - ./keys:/app/keys
    restart: always
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"

  postgres:
    image: pgvector/pgvector:pg16
    environment:
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: ${POSTGRES_DB}
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./backups:/backups
    restart: always

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - backend
    restart: always

volumes:
  postgres_data:
```

#### 2. Configure Nginx

```nginx
# nginx.conf
upstream backend {
    server backend:8000;
}

server {
    listen 80;
    server_name api.knowtruly.me;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name api.knowtruly.me;

    ssl_certificate /etc/nginx/ssl/cert.pem;
    ssl_certificate_key /etc/nginx/ssl/key.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    client_max_body_size 10M;

    location / {
        proxy_pass http://backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 300s;
    }

    location /api/v1/docs {
        proxy_pass http://backend;
    }
}
```

#### 3. Deploy

```bash
# Build and start
docker compose -f docker-compose.prod.yml up -d --build

# Initialize database
docker compose -f docker-compose.prod.yml exec backend python -m app.init_db_tables

# Check logs
docker compose -f docker-compose.prod.yml logs -f backend
```

### Option 2: Kubernetes

#### 1. Create Kubernetes Manifests

```yaml
# k8s/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: knowtruly-backend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: knowtruly-backend
  template:
    metadata:
      labels:
        app: knowtruly-backend
    spec:
      containers:
      - name: backend
        image: knowtruly/backend:latest
        ports:
        - containerPort: 8000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: knowtruly-secrets
              key: database-url
        - name: GOOGLE_API_KEY
          valueFrom:
            secretKeyRef:
              name: knowtruly-secrets
              key: gemini-api-key
        resources:
          requests:
            memory: "512Mi"
            cpu: "500m"
          limits:
            memory: "1Gi"
            cpu: "1000m"
        livenessProbe:
          httpGet:
            path: /api/v1/health
            port: 8000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /api/v1/health
            port: 8000
          initialDelaySeconds: 5
          periodSeconds: 5

---
apiVersion: v1
kind: Service
metadata:
  name: knowtruly-backend
spec:
  selector:
    app: knowtruly-backend
  ports:
  - protocol: TCP
    port: 80
    targetPort: 8000
  type: LoadBalancer
```

#### 2. Deploy to Kubernetes

```bash
# Create secrets
kubectl create secret generic knowtruly-secrets \
  --from-literal=database-url='postgresql://...' \
  --from-literal=gemini-api-key='your-key' \
  --from-literal=jwt-secret='your-secret'

# Apply manifests
kubectl apply -f k8s/

# Check status
kubectl get pods
kubectl get services
kubectl logs -f deployment/knowtruly-backend
```

## Database Migrations

### Backup Database

```bash
# Automated backup
docker compose exec postgres pg_dump -U knowtruly knowtruly > backup_$(date +%Y%m%d).sql

# Restore backup
docker compose exec -T postgres psql -U knowtruly knowtruly < backup_20250109.sql
```

### Schema Updates

```bash
# Run migrations
docker compose exec backend python -m app.init_db_tables

# Check tables
docker compose exec postgres psql -U knowtruly -d knowtruly -c "\dt"
```

## Monitoring & Logging

### Health Check Endpoint

```bash
curl https://api.knowtruly.me/api/v1/health
```

### Log Aggregation

```bash
# View all logs
docker compose logs -f

# Backend logs only
docker compose logs -f backend

# Last 100 lines
docker compose logs --tail=100 backend
```

### Metrics (Optional - Prometheus)

```yaml
# Add to docker-compose.yml
  prometheus:
    image: prom/prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml

  grafana:
    image: grafana/grafana
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
```

## Security Checklist

### Before Production:

- [ ] Change all default passwords
- [ ] Generate new JWT secret key (32+ bytes)
- [ ] Configure HTTPS with valid SSL certificates
- [ ] Set up firewall rules
- [ ] Enable database backups
- [ ] Configure CORS for production domains only
- [ ] Set proper file permissions on uploads directory
- [ ] Rotate API keys regularly
- [ ] Enable audit logging
- [ ] Set up monitoring and alerts
- [ ] Review and limit exposed ports
- [ ] Enable rate limiting (via nginx or API gateway)
- [ ] Set up WAF (Web Application Firewall)
- [ ] Regular security updates

## Scaling

### Horizontal Scaling

```bash
# Scale backend replicas
docker compose up -d --scale backend=3

# Or in Kubernetes
kubectl scale deployment knowtruly-backend --replicas=5
```

### Database Optimization

```sql
-- Add indexes for common queries
CREATE INDEX idx_profiles_owner_id ON profiles(owner_id);
CREATE INDEX idx_audit_logs_actor_timestamp ON audit_logs(actor_id, timestamp);
CREATE INDEX idx_consent_subject_granted ON consent_records(subject_id, granted);

-- Analyze query performance
EXPLAIN ANALYZE SELECT * FROM profiles WHERE owner_id = 'uuid';
```

### Caching (Redis - Optional)

```yaml
# Add to docker-compose.yml
  redis:
    image: redis:alpine
    ports:
      - "6379:6379"
```

## Backup Strategy

### Automated Backups

```bash
# Create backup script
cat > backup.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/backups"
DATE=$(date +%Y%m%d_%H%M%S)

# Database backup
docker compose exec -T postgres pg_dump -U knowtruly knowtruly | gzip > "$BACKUP_DIR/db_$DATE.sql.gz"

# Uploads backup
tar -czf "$BACKUP_DIR/uploads_$DATE.tar.gz" uploads/

# Keep last 7 days
find "$BACKUP_DIR" -name "*.gz" -mtime +7 -delete

echo "Backup completed: $DATE"
EOF

chmod +x backup.sh

# Add to crontab
crontab -e
# Add: 0 2 * * * /path/to/backup.sh
```

## Troubleshooting

### Backend Won't Start

```bash
# Check logs
docker compose logs backend

# Verify environment variables
docker compose exec backend env | grep API

# Test database connection
docker compose exec backend python -c "from app.db.base import engine; print(engine.connect())"
```

### Database Connection Issues

```bash
# Check PostgreSQL status
docker compose ps postgres

# Test connection
docker compose exec postgres psql -U knowtruly -d knowtruly -c "SELECT 1;"

# Reset database (CAUTION: destroys data)
docker compose down -v
docker compose up -d
docker compose exec backend python -m app.init_db_tables
```

### Qdrant Connection Issues

```bash
# Check Qdrant status
curl http://localhost:6333/collections

# Recreate collection
docker compose exec backend python -c "from app.services.embedding_service import embedding_service; embedding_service.init_collection()"
```

### High Memory Usage

```bash
# Check container stats
docker stats

# Limit memory (add to docker-compose.yml)
services:
  backend:
    deploy:
      resources:
        limits:
          memory: 1G
```

## Performance Tuning

### Database Connection Pooling

```python
# In app/db/base.py
engine = create_engine(
    DATABASE_URL,
    pool_size=20,
    max_overflow=0,
    pool_pre_ping=True
)
```

### Gunicorn Workers

```bash
# Update Dockerfile CMD
CMD ["gunicorn", "app.main:app", "-w", "4", "-k", "uvicorn.workers.UvicornWorker", "--bind", "0.0.0.0:8000"]
```

## Support

- Documentation: https://docs.knowtruly.me
- API Docs: https://api.knowtruly.me/api/v1/docs
- Issues: https://github.com/knowtruly/backend/issues
