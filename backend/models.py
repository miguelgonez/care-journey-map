from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime
import uuid

class NodeData(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    type: str = "task"  # BPMN 2.0 types: task, start_event, end_event, gateway_exclusive, gateway_parallel, gateway_inclusive, intermediate_event, subprocess
    position: Dict[str, float]
    data: Dict[str, Any]
    
class BPMNGateway(BaseModel):
    gateway_type: str  # exclusive, parallel, inclusive, event_based
    condition: Optional[str] = None
    default_flow: Optional[str] = None
    
class BPMNEvent(BaseModel):
    event_type: str  # start, end, intermediate, timer, message, signal
    trigger: Optional[str] = None
    time_duration: Optional[str] = None
    
class FHIRResource(BaseModel):
    resource_type: str  # PlanDefinition, ActivityDefinition, Task, Appointment, Observation
    resource_id: Optional[str] = None
    reference: Optional[str] = None
    coding: Optional[Dict[str, Any]] = None
    
class CareGap(BaseModel):
    gap_type: str  # missing_intervention, delayed_treatment, guideline_violation
    severity: str  # high, medium, low
    description: str
    guideline_reference: Optional[str] = None
    recommended_action: str
    
class Metric(BaseModel):
    metric_name: str
    value: float
    unit: str  # minutes, hours, days, percentage
    target_value: Optional[float] = None
    status: str  # on_track, at_risk, critical
    
class ClinicalOutcome(BaseModel):
    outcome_type: str  # mortality_rate, readmission_rate, time_to_treatment, patient_satisfaction
    current_value: float
    target_value: float
    trend: str  # improving, stable, declining
    measurement_period: str

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
    care_gaps: Optional[List[CareGap]] = []
    metrics: Optional[List[Metric]] = []
    clinical_outcomes: Optional[List[ClinicalOutcome]] = []
    bpmn_version: str = "2.0"
    fhir_version: str = "R4"
    fhir_plan_definition_id: Optional[str] = None

class JourneyUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    nodes: Optional[List[NodeData]] = None
    edges: Optional[List[EdgeData]] = None
    care_gaps: Optional[List[CareGap]] = None
    metrics: Optional[List[Metric]] = None
    clinical_outcomes: Optional[List[ClinicalOutcome]] = None
    fhir_plan_definition_id: Optional[str] = None

class JourneyResponse(BaseModel):
    id: str
    name: str
    description: Optional[str]
    nodes: List[NodeData]
    edges: List[EdgeData]
    care_gaps: Optional[List[CareGap]] = []
    metrics: Optional[List[Metric]] = []
    clinical_outcomes: Optional[List[ClinicalOutcome]] = []
    bpmn_version: str = "2.0"
    fhir_version: str = "R4"
    fhir_plan_definition_id: Optional[str] = None
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
    bpmn_compliant: bool = True
    fhir_compliant: bool = True
