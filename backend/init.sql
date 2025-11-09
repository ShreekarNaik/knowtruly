-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Create enum types
CREATE TYPE user_role AS ENUM ('student', 'recruiter', 'issuer', 'admin');
CREATE TYPE proficiency_level AS ENUM ('beginner', 'intermediate', 'advanced', 'expert');
CREATE TYPE claim_type AS ENUM ('degree', 'skill', 'employment', 'project', 'certification');
CREATE TYPE claim_status AS ENUM ('active', 'revoked', 'expired');

-- Initial setup complete
SELECT 'Database initialized successfully' AS status;
