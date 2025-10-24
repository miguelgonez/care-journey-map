from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime
import uuid

class NodeData(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    type: str = "default"  # registration, consultation, diagnosis, treatment, followup, discharge, custom
    position: Dict[str, float]
    data: Dict[str, Any]

class EdgeData(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    source: str
    target: str
    type: Optional[str] = "default"
    animated: Optional[bool] = False
    label: Optional[str] = None

class JourneyCreate(BaseModel):
    name: str
    description: Optional[str] = None
    nodes: List[NodeData] = []
    edges: List[EdgeData] = []

class JourneyUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    nodes: Optional[List[NodeData]] = None
    edges: Optional[List[EdgeData]] = None

class JourneyResponse(BaseModel):
    id: str
    name: str
    description: Optional[str]
    nodes: List[NodeData]
    edges: List[EdgeData]
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

class TemplateResponse(BaseModel):
    id: str
    name: str
    description: str
    nodes: List[NodeData]
    edges: List[EdgeData]
