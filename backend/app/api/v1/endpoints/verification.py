from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID

from app.db.base import get_db
from app.api.deps import get_current_user, get_current_active_issuer
from app.models.user import User
from app.models.claim import VerifiableClaim
from app.schemas.verification import (
    KeyPairResponse,
    SignClaimRequest,
    SignClaimResponse,
    VerifyClaimRequest,
    VerificationResult,
    RevokeClaimRequest,
    RevokeClaimResponse,
    VerifiableClaimResponse
)
from app.services.signature_service import signature_service
from datetime import datetime

router = APIRouter()

@router.post("/keys/generate", response_model=KeyPairResponse)
async def generate_issuer_keys(
    current_user: User = Depends(get_current_active_issuer)
):
    """
    Generate RSA key pair for issuer.
    
    **Important**: Store private key securely! It cannot be recovered.
    
    Returns public and private keys in PEM format.
    """
    try:
        key_pair = signature_service.generate_key_pair()
        return KeyPairResponse(**key_pair)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Key generation failed: {str(e)}"
        )

@router.post("/sign", response_model=SignClaimResponse)
async def sign_claim(
    request: SignClaimRequest,
    current_user: User = Depends(get_current_active_issuer),
    db: Session = Depends(get_db)
):
    """
    Sign a verifiable claim using issuer's private key.
    
    - **subject_profile_id**: Profile UUID being claimed about
    - **claim_type**: Type (degree, skill, employment, project)
    - **claim_payload**: Claim data (e.g., degree name, institution, date)
    - **expires_in_days**: Optional expiration period
    - **issuer_private_key**: Your private key in PEM format
    
    Creates immutable, cryptographically signed credential.
    """
    try:
        result = await signature_service.sign_claim(
            issuer_id=current_user.id,
            issuer_private_key=request.issuer_private_key,
            subject_profile_id=request.subject_profile_id,
            claim_type=request.claim_type,
            claim_payload=request.claim_payload,
            expires_in_days=request.expires_in_days,
            db=db
        )
        
        return SignClaimResponse(
            claim_id=UUID(result["claim_id"]),
            signature=result["signature"],
            algorithm=result["algorithm"],
            claim_data=result["claim_data"],
            signed_at=datetime.fromisoformat(result["signed_at"])
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Signing failed: {str(e)}"
        )

@router.post("/verify", response_model=VerificationResult)
async def verify_claim(
    request: VerifyClaimRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Verify a signed claim using issuer's public key.
    
    - **claim_id**: UUID of claim to verify
    - **issuer_public_key**: Issuer's public key in PEM format
    
    Returns verification result with claim data if valid.
    """
    try:
        result = await signature_service.verify_signature(
            claim_id=request.claim_id,
            issuer_public_key=request.issuer_public_key,
            db=db
        )
        
        # Convert string UUIDs to UUID objects if present
        if result.get("claim_id"):
            result["claim_id"] = UUID(result["claim_id"])
        if result.get("issuer_id"):
            result["issuer_id"] = UUID(result["issuer_id"])
        if result.get("subject_profile_id"):
            result["subject_profile_id"] = UUID(result["subject_profile_id"])
        
        # Convert ISO strings to datetime if present
        if result.get("issued_at"):
            result["issued_at"] = datetime.fromisoformat(result["issued_at"])
        if result.get("expires_at"):
            result["expires_at"] = datetime.fromisoformat(result["expires_at"])
        if result.get("verified_at"):
            result["verified_at"] = datetime.fromisoformat(result["verified_at"])
        
        return VerificationResult(**result)
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Verification failed: {str(e)}"
        )

@router.post("/revoke", response_model=RevokeClaimResponse)
async def revoke_claim(
    request: RevokeClaimRequest,
    current_user: User = Depends(get_current_active_issuer),
    db: Session = Depends(get_db)
):
    """
    Revoke a previously issued claim.
    
    - **claim_id**: UUID of claim to revoke
    - **reason**: Optional reason for revocation
    
    Only the original issuer can revoke a claim.
    """
    try:
        result = await signature_service.revoke_claim(
            claim_id=request.claim_id,
            issuer_id=current_user.id,
            reason=request.reason,
            db=db
        )
        
        if not result["success"]:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=result.get("error", "Revocation failed")
            )
        
        return RevokeClaimResponse(
            success=True,
            claim_id=UUID(result["claim_id"]),
            revoked_at=datetime.fromisoformat(result["revoked_at"]),
            reason=result.get("reason")
        )
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Revocation failed: {str(e)}"
        )

@router.get("/claims/{claim_id}", response_model=VerifiableClaimResponse)
async def get_claim(
    claim_id: UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get claim details by ID."""
    claim = db.query(VerifiableClaim).filter(
        VerifiableClaim.id == claim_id
    ).first()
    
    if not claim:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Claim not found"
        )
    
    # Get issuer name
    issuer = db.query(User).filter(User.id == claim.issuer_id).first()
    issuer_name = issuer.email if issuer else "Unknown"
    
    return VerifiableClaimResponse(
        id=claim.id,
        issuer_id=claim.issuer_id,
        issuer_name=issuer_name,
        subject_profile_id=claim.subject_profile_id,
        claim_type=claim.claim_type,
        claim_payload=claim.claim_payload,
        issued_at=claim.issued_at,
        expires_at=claim.expires_at,
        status=claim.status,
        revoked_at=claim.revoked_at,
        revocation_reason=claim.revocation_reason
    )

@router.get("/claims/profile/{profile_id}", response_model=List[VerifiableClaimResponse])
async def list_profile_claims(
    profile_id: UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """List all claims for a specific profile."""
    claims = db.query(VerifiableClaim).filter(
        VerifiableClaim.subject_profile_id == profile_id
    ).order_by(VerifiableClaim.issued_at.desc()).all()
    
    # Enrich with issuer names
    results = []
    for claim in claims:
        issuer = db.query(User).filter(User.id == claim.issuer_id).first()
        results.append(VerifiableClaimResponse(
            id=claim.id,
            issuer_id=claim.issuer_id,
            issuer_name=issuer.email if issuer else "Unknown",
            subject_profile_id=claim.subject_profile_id,
            claim_type=claim.claim_type,
            claim_payload=claim.claim_payload,
            issued_at=claim.issued_at,
            expires_at=claim.expires_at,
            status=claim.status,
            revoked_at=claim.revoked_at,
            revocation_reason=claim.revocation_reason
        ))
    
    return results

@router.get("/claims/issuer/me", response_model=List[VerifiableClaimResponse])
async def list_my_issued_claims(
    current_user: User = Depends(get_current_active_issuer),
    db: Session = Depends(get_db)
):
    """List all claims issued by current issuer."""
    claims = db.query(VerifiableClaim).filter(
        VerifiableClaim.issuer_id == current_user.id
    ).order_by(VerifiableClaim.issued_at.desc()).all()
    
    results = []
    for claim in claims:
        results.append(VerifiableClaimResponse(
            id=claim.id,
            issuer_id=claim.issuer_id,
            issuer_name=current_user.email,
            subject_profile_id=claim.subject_profile_id,
            claim_type=claim.claim_type,
            claim_payload=claim.claim_payload,
            issued_at=claim.issued_at,
            expires_at=claim.expires_at,
            status=claim.status,
            revoked_at=claim.revoked_at,
            revocation_reason=claim.revocation_reason
        ))
    
    return results
