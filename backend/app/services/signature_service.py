from typing import Dict, Any, Optional
from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric import rsa, padding
from cryptography.hazmat.backends import default_backend
from cryptography.exceptions import InvalidSignature
import base64
import json
from datetime import datetime, timedelta
from sqlalchemy.orm import Session

from app.models.claim import VerifiableClaim, Signature
from app.models.user import User
import uuid

class SignatureService:
    """Service for cryptographic signing and verification of claims."""
    
    def __init__(self):
        self.algorithm = "RSA-SHA256"
        self.key_size = 2048
    
    def generate_key_pair(self) -> Dict[str, str]:
        """
        Generate RSA key pair for issuer.
        
        Returns:
            Dict with private_key and public_key in PEM format
        """
        # Generate private key
        private_key = rsa.generate_private_key(
            public_exponent=65537,
            key_size=self.key_size,
            backend=default_backend()
        )
        
        # Get public key
        public_key = private_key.public_key()
        
        # Serialize to PEM format
        private_pem = private_key.private_bytes(
            encoding=serialization.Encoding.PEM,
            format=serialization.PrivateFormat.PKCS8,
            encryption_algorithm=serialization.NoEncryption()
        ).decode('utf-8')
        
        public_pem = public_key.public_bytes(
            encoding=serialization.Encoding.PEM,
            format=serialization.PublicFormat.SubjectPublicKeyInfo
        ).decode('utf-8')
        
        return {
            "private_key": private_pem,
            "public_key": public_pem,
            "algorithm": self.algorithm,
            "key_size": self.key_size
        }
    
    async def sign_claim(
        self,
        issuer_id: uuid.UUID,
        issuer_private_key: str,
        subject_profile_id: uuid.UUID,
        claim_type: str,
        claim_payload: Dict[str, Any],
        expires_in_days: Optional[int] = None,
        db: Session = None
    ) -> Dict[str, Any]:
        """
        Sign a claim using issuer's private key.
        
        Args:
            issuer_id: UUID of the issuer (university, employer, etc.)
            issuer_private_key: Issuer's private key in PEM format
            subject_profile_id: Profile being claimed about
            claim_type: Type of claim (degree, skill, employment, project)
            claim_payload: Claim data to sign
            expires_in_days: Optional expiration period
            db: Database session to store claim
            
        Returns:
            Dict with claim_id, signature, and signed claim data
        """
        # Create claim data structure
        claim_data = {
            "issuer_id": str(issuer_id),
            "subject_profile_id": str(subject_profile_id),
            "claim_type": claim_type,
            "claim_payload": claim_payload,
            "issued_at": datetime.utcnow().isoformat(),
            "expires_at": (datetime.utcnow() + timedelta(days=expires_in_days)).isoformat() if expires_in_days else None
        }
        
        # Serialize claim data for signing
        claim_bytes = json.dumps(claim_data, sort_keys=True).encode('utf-8')
        
        # Load private key
        private_key = serialization.load_pem_private_key(
            issuer_private_key.encode('utf-8'),
            password=None,
            backend=default_backend()
        )
        
        # Sign the claim
        signature_bytes = private_key.sign(
            claim_bytes,
            padding.PSS(
                mgf=padding.MGF1(hashes.SHA256()),
                salt_length=padding.PSS.MAX_LENGTH
            ),
            hashes.SHA256()
        )
        
        # Encode signature to base64
        signature_b64 = base64.b64encode(signature_bytes).decode('utf-8')
        
        # Store in database if session provided
        claim_id = uuid.uuid4()
        if db:
            # Create VerifiableClaim record
            verifiable_claim = VerifiableClaim(
                id=claim_id,
                issuer_id=issuer_id,
                subject_profile_id=subject_profile_id,
                claim_type=claim_type,
                claim_payload=claim_payload,
                issued_at=datetime.utcnow(),
                expires_at=datetime.utcnow() + timedelta(days=expires_in_days) if expires_in_days else None,
                status="active"
            )
            db.add(verifiable_claim)
            
            # Create Signature record
            signature_record = Signature(
                claim_id=claim_id,
                signature=signature_b64,
                algorithm=self.algorithm,
                signed_at=datetime.utcnow()
            )
            db.add(signature_record)
            
            db.commit()
            db.refresh(verifiable_claim)
            db.refresh(signature_record)
        
        return {
            "claim_id": str(claim_id),
            "signature": signature_b64,
            "algorithm": self.algorithm,
            "claim_data": claim_data,
            "signed_at": datetime.utcnow().isoformat()
        }
    
    async def verify_signature(
        self,
        claim_id: uuid.UUID,
        issuer_public_key: str,
        db: Session
    ) -> Dict[str, Any]:
        """
        Verify a signed claim using issuer's public key.
        
        Args:
            claim_id: UUID of the claim to verify
            issuer_public_key: Issuer's public key in PEM format
            db: Database session
            
        Returns:
            Dict with verification result and claim data
        """
        # Fetch claim and signature from database
        claim = db.query(VerifiableClaim).filter(
            VerifiableClaim.id == claim_id
        ).first()
        
        if not claim:
            return {
                "valid": False,
                "error": "Claim not found"
            }
        
        signature_record = db.query(Signature).filter(
            Signature.claim_id == claim_id
        ).first()
        
        if not signature_record:
            return {
                "valid": False,
                "error": "Signature not found"
            }
        
        # Check if claim is expired
        if claim.expires_at and datetime.utcnow() > claim.expires_at:
            return {
                "valid": False,
                "error": "Claim expired",
                "expired_at": claim.expires_at.isoformat()
            }
        
        # Check if claim is revoked
        if claim.status == "revoked":
            return {
                "valid": False,
                "error": "Claim revoked",
                "revoked_at": claim.revoked_at.isoformat() if claim.revoked_at else None
            }
        
        # Reconstruct claim data
        claim_data = {
            "issuer_id": str(claim.issuer_id),
            "subject_profile_id": str(claim.subject_profile_id),
            "claim_type": claim.claim_type,
            "claim_payload": claim.claim_payload,
            "issued_at": claim.issued_at.isoformat(),
            "expires_at": claim.expires_at.isoformat() if claim.expires_at else None
        }
        
        claim_bytes = json.dumps(claim_data, sort_keys=True).encode('utf-8')
        
        # Decode signature from base64
        signature_bytes = base64.b64decode(signature_record.signature)
        
        # Load public key
        try:
            public_key = serialization.load_pem_public_key(
                issuer_public_key.encode('utf-8'),
                backend=default_backend()
            )
        except Exception as e:
            return {
                "valid": False,
                "error": f"Invalid public key: {str(e)}"
            }
        
        # Verify signature
        try:
            public_key.verify(
                signature_bytes,
                claim_bytes,
                padding.PSS(
                    mgf=padding.MGF1(hashes.SHA256()),
                    salt_length=padding.PSS.MAX_LENGTH
                ),
                hashes.SHA256()
            )
            
            # Signature is valid
            return {
                "valid": True,
                "claim_id": str(claim_id),
                "issuer_id": str(claim.issuer_id),
                "subject_profile_id": str(claim.subject_profile_id),
                "claim_type": claim.claim_type,
                "claim_payload": claim.claim_payload,
                "issued_at": claim.issued_at.isoformat(),
                "expires_at": claim.expires_at.isoformat() if claim.expires_at else None,
                "verified_at": datetime.utcnow().isoformat()
            }
            
        except InvalidSignature:
            return {
                "valid": False,
                "error": "Invalid signature - claim data has been tampered with"
            }
        except Exception as e:
            return {
                "valid": False,
                "error": f"Verification failed: {str(e)}"
            }
    
    async def revoke_claim(
        self,
        claim_id: uuid.UUID,
        issuer_id: uuid.UUID,
        reason: Optional[str],
        db: Session
    ) -> Dict[str, Any]:
        """
        Revoke a previously issued claim.
        
        Args:
            claim_id: UUID of claim to revoke
            issuer_id: UUID of issuer (must match claim issuer)
            reason: Optional reason for revocation
            db: Database session
            
        Returns:
            Dict with revocation status
        """
        claim = db.query(VerifiableClaim).filter(
            VerifiableClaim.id == claim_id
        ).first()
        
        if not claim:
            return {
                "success": False,
                "error": "Claim not found"
            }
        
        # Verify issuer matches
        if claim.issuer_id != issuer_id:
            return {
                "success": False,
                "error": "Unauthorized - only issuer can revoke claim"
            }
        
        # Check if already revoked
        if claim.status == "revoked":
            return {
                "success": False,
                "error": "Claim already revoked",
                "revoked_at": claim.revoked_at.isoformat()
            }
        
        # Revoke claim
        claim.status = "revoked"
        claim.revoked_at = datetime.utcnow()
        claim.revocation_reason = reason
        
        db.commit()
        
        return {
            "success": True,
            "claim_id": str(claim_id),
            "revoked_at": claim.revoked_at.isoformat(),
            "reason": reason
        }

# Global service instance
signature_service = SignatureService()
