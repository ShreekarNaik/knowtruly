from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""
    
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False
    )
    
    # API Configuration
    API_HOST: str = "0.0.0.0"
    API_PORT: int = 8000
    API_VERSION: str = "v1"
    API_TITLE: str = "KnowTruly API"
    CORS_ORIGINS: str = "http://localhost:5173,http://localhost:3000"
    
    # Database
    DATABASE_URL: str
    POSTGRES_USER: str = "knowtruly"
    POSTGRES_PASSWORD: str
    POSTGRES_DB: str = "knowtruly"
    
    # Vector Database (Qdrant)
    QDRANT_HOST: str = "localhost"
    QDRANT_PORT: int = 6333
    QDRANT_API_KEY: str = ""
    QDRANT_COLLECTION_NAME: str = "profiles"
    QDRANT_VECTOR_SIZE: int = 768
    
    # Gemini API
    GOOGLE_API_KEY: str
    GEMINI_MODEL: str = "gemini-pro"
    GEMINI_EMBEDDING_MODEL: str = "text-embedding-004"
    GEMINI_TEMPERATURE: float = 0.3
    GEMINI_MAX_TOKENS: int = 1024
    
    # JWT Auth
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # File Storage
    UPLOAD_DIR: str = "./uploads"
    MAX_FILE_SIZE_MB: int = 10
    
    # Typst Configuration
    TYPST_CLI_PATH: str = "/usr/local/bin/typst"
    TYPST_TEMPLATES_DIR: str = "./templates"
    TYPST_OUTPUT_DIR: str = "./generated_resumes"
    TYPST_TIMEOUT_SECONDS: int = 30
    
    # Signature Service
    RSA_KEY_SIZE: int = 2048
    SIGNATURE_ALGORITHM: str = "RS256"
    
    # Environment
    ENVIRONMENT: str = "development"
    DEBUG: bool = True
    
    @property
    def cors_origins_list(self) -> List[str]:
        """Parse CORS origins from comma-separated string."""
        return [origin.strip() for origin in self.CORS_ORIGINS.split(",")]
    
    @property
    def is_development(self) -> bool:
        """Check if running in development mode."""
        return self.ENVIRONMENT == "development"


# Global settings instance
settings = Settings()
