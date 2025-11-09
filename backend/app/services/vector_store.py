from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams, PointStruct, Filter, FieldCondition, MatchValue
from typing import List, Dict, Any, Optional
import uuid
from app.core.config import settings

class VectorStore:
    """Service for managing vector storage and retrieval using Qdrant."""
    
    def __init__(self):
        self.client = QdrantClient(
            host=settings.QDRANT_HOST,
            port=settings.QDRANT_PORT,
            api_key=settings.QDRANT_API_KEY if settings.QDRANT_API_KEY else None
        )
        self.collection_name = settings.QDRANT_COLLECTION_NAME
        self.vector_size = settings.QDRANT_VECTOR_SIZE
        self._initialize_collection()
    
    def _initialize_collection(self):
        """Initialize Qdrant collection if it doesn't exist."""
        try:
            # Check if collection exists
            collections = self.client.get_collections().collections
            collection_exists = any(
                col.name == self.collection_name for col in collections
            )
            
            if not collection_exists:
                # Create collection with cosine distance metric
                self.client.create_collection(
                    collection_name=self.collection_name,
                    vectors_config=VectorParams(
                        size=self.vector_size,
                        distance=Distance.COSINE
                    )
                )
                print(f"Created Qdrant collection: {self.collection_name}")
        except Exception as e:
            print(f"Error initializing Qdrant collection: {str(e)}")
    
    async def store_embedding(
        self,
        embedding_id: str,
        vector: List[float],
        metadata: Dict[str, Any]
    ) -> str:
        """
        Store an embedding vector with metadata.
        
        Args:
            embedding_id: Unique identifier for the embedding
            vector: Embedding vector
            metadata: Associated metadata (profile_id, type, etc.)
            
        Returns:
            Embedding ID
        """
        try:
            point = PointStruct(
                id=embedding_id,
                vector=vector,
                payload=metadata
            )
            
            self.client.upsert(
                collection_name=self.collection_name,
                points=[point]
            )
            
            return embedding_id
        except Exception as e:
            raise Exception(f"Failed to store embedding: {str(e)}")
    
    async def store_embeddings_batch(
        self,
        embeddings: List[Dict[str, Any]]
    ) -> List[str]:
        """
        Store multiple embeddings in batch.
        
        Args:
            embeddings: List of dicts with 'id', 'vector', and 'metadata'
            
        Returns:
            List of embedding IDs
        """
        try:
            points = [
                PointStruct(
                    id=emb["id"],
                    vector=emb["vector"],
                    payload=emb["metadata"]
                )
                for emb in embeddings
            ]
            
            self.client.upsert(
                collection_name=self.collection_name,
                points=points
            )
            
            return [emb["id"] for emb in embeddings]
        except Exception as e:
            raise Exception(f"Failed to store embeddings batch: {str(e)}")
    
    async def search_similar(
        self,
        query_vector: List[float],
        top_k: int = 10,
        filters: Optional[Dict[str, Any]] = None,
        score_threshold: Optional[float] = None
    ) -> List[Dict[str, Any]]:
        """
        Search for similar vectors.
        
        Args:
            query_vector: Query embedding vector
            top_k: Number of results to return
            filters: Optional filters on metadata
            score_threshold: Minimum similarity score (0-1)
            
        Returns:
            List of search results with scores and metadata
        """
        try:
            # Build filter if provided
            query_filter = None
            if filters:
                conditions = []
                for key, value in filters.items():
                    conditions.append(
                        FieldCondition(
                            key=key,
                            match=MatchValue(value=value)
                        )
                    )
                if conditions:
                    query_filter = Filter(must=conditions)
            
            # Perform search
            search_result = self.client.search(
                collection_name=self.collection_name,
                query_vector=query_vector,
                limit=top_k,
                query_filter=query_filter,
                score_threshold=score_threshold
            )
            
            # Format results
            results = []
            for hit in search_result:
                results.append({
                    "id": hit.id,
                    "score": hit.score,
                    "metadata": hit.payload
                })
            
            return results
        except Exception as e:
            raise Exception(f"Failed to search similar vectors: {str(e)}")
    
    async def get_embedding(self, embedding_id: str) -> Optional[Dict[str, Any]]:
        """
        Retrieve an embedding by ID.
        
        Args:
            embedding_id: Embedding identifier
            
        Returns:
            Dict with vector and metadata, or None if not found
        """
        try:
            result = self.client.retrieve(
                collection_name=self.collection_name,
                ids=[embedding_id]
            )
            
            if result:
                point = result[0]
                return {
                    "id": point.id,
                    "vector": point.vector,
                    "metadata": point.payload
                }
            return None
        except Exception as e:
            raise Exception(f"Failed to retrieve embedding: {str(e)}")
    
    async def delete_embedding(self, embedding_id: str) -> bool:
        """
        Delete an embedding.
        
        Args:
            embedding_id: Embedding identifier
            
        Returns:
            True if successful
        """
        try:
            self.client.delete(
                collection_name=self.collection_name,
                points_selector=[embedding_id]
            )
            return True
        except Exception as e:
            raise Exception(f"Failed to delete embedding: {str(e)}")
    
    async def update_metadata(
        self,
        embedding_id: str,
        metadata: Dict[str, Any]
    ) -> bool:
        """
        Update metadata for an existing embedding.
        
        Args:
            embedding_id: Embedding identifier
            metadata: New metadata to merge
            
        Returns:
            True if successful
        """
        try:
            self.client.set_payload(
                collection_name=self.collection_name,
                payload=metadata,
                points=[embedding_id]
            )
            return True
        except Exception as e:
            raise Exception(f"Failed to update metadata: {str(e)}")
    
    async def count_vectors(self, filters: Optional[Dict[str, Any]] = None) -> int:
        """
        Count vectors in the collection.
        
        Args:
            filters: Optional filters on metadata
            
        Returns:
            Number of vectors
        """
        try:
            collection_info = self.client.get_collection(self.collection_name)
            return collection_info.points_count
        except Exception as e:
            raise Exception(f"Failed to count vectors: {str(e)}")

# Global service instance
vector_store = VectorStore()
