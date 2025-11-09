from pydantic import BaseModel, EmailStr
from typing import Optional
from uuid import UUID
from datetime import datetime

# User Registration
class UserRegister(BaseModel):
    email: EmailStr
    password: str
    role: str = "student"  # student, recruiter, issuer, admin

# User Login
class UserLogin(BaseModel):
    email: EmailStr
    password: str

# Token Response
class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in: int

# User Response
class UserResponse(BaseModel):
    id: UUID
    email: str
    role: str
    is_active: bool
    is_verified: bool
    created_at: datetime

    class Config:
        from_attributes = True

# Registration Response
class RegisterResponse(BaseModel):
    user_id: UUID
    email: str
    access_token: str
