from fastapi import APIRouter
from app.api.v1.endpoints import auth, profiles, match, resumes, verification

api_router = APIRouter()

# Include all endpoint routers
api_router.include_router(
    auth.router,
    prefix="/auth",
    tags=["authentication"]
)

api_router.include_router(
    profiles.router,
    prefix="/profiles",
    tags=["profiles"]
)

api_router.include_router(
    match.router,
    prefix="/match",
    tags=["matching"]
)

api_router.include_router(
    resumes.router,
    prefix="/resumes",
    tags=["resumes"]
)

api_router.include_router(
    verification.router,
    prefix="/verification",
    tags=["verification"]
)
