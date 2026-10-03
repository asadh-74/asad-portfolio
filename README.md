# CloudOps AI — Azure Cloud Operations & Incident Intelligence

Portfolio-grade cloud operations platform built with Next.js, FastAPI, PostgreSQL, Docker, GitHub Actions and Azure Container Apps.

## Highlights
- Service health monitoring and SLA-style metrics
- Incident tracking with AI-ready summaries
- Responsive recruiter-friendly dashboard
- FastAPI OpenAPI docs
- PostgreSQL-ready SQLAlchemy models
- Docker Compose local stack
- GitHub Actions CI
- Azure Container Apps deployment workflow

## Local run
```bash
docker compose up --build
```
Dashboard: http://localhost:3000  
API docs: http://localhost:8000/docs

Seed demo data:
```bash
curl -X POST http://localhost:8000/api/demo/seed
```

## Architecture
Browser → Next.js → FastAPI → PostgreSQL, deployed with Azure Container Apps.

## Portfolio statement
Designed and built an Azure-ready cloud operations and incident-intelligence platform using Next.js, FastAPI, PostgreSQL, Docker and GitHub Actions. Implemented service-health monitoring, incident workflows, reliability metrics, CI and automated Azure deployment.

See `infra/azure/README.md` for deployment setup.

**Author:** Asad Hussain
