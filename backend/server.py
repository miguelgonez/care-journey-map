from fastapi import FastAPI, APIRouter, Depends, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import logging
from pathlib import Path
from typing import List
import uuid
import json

from database import init_db, get_db, Journey
from models import (
    JourneyCreate, JourneyUpdate, JourneyResponse, TemplateResponse, 
    NodeData, EdgeData, CareGap, Metric, ClinicalOutcome
)
from sqlalchemy.orm import Session

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Initialize database
init_db()

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Patient Journey Designer API"}

# Journey CRUD endpoints
@api_router.post("/journeys", response_model=JourneyResponse)
async def create_journey(journey: JourneyCreate, db: Session = Depends(get_db)):
    """Create a new patient journey"""
    journey_id = str(uuid.uuid4())
    
    db_journey = Journey(
        id=journey_id,
        name=journey.name,
        description=journey.description,
        nodes_data=json.dumps([node.model_dump() for node in journey.nodes]),
        edges_data=json.dumps([edge.model_dump() for edge in journey.edges]),
        care_gaps_data=json.dumps([gap.model_dump() for gap in (journey.care_gaps or [])]),
        metrics_data=json.dumps([metric.model_dump() for metric in (journey.metrics or [])]),
        outcomes_data=json.dumps([outcome.model_dump() for outcome in (journey.clinical_outcomes or [])])
    )
    
    db.add(db_journey)
    db.commit()
    db.refresh(db_journey)
    
    return JourneyResponse(
        id=db_journey.id,
        name=db_journey.name,
        description=db_journey.description,
        nodes=[NodeData(**node) for node in json.loads(db_journey.nodes_data)],
        edges=[EdgeData(**edge) for edge in json.loads(db_journey.edges_data)],
        care_gaps=[CareGap(**gap) for gap in json.loads(db_journey.care_gaps_data or "[]")],
        metrics=[Metric(**metric) for metric in json.loads(db_journey.metrics_data or "[]")],
        clinical_outcomes=[ClinicalOutcome(**outcome) for outcome in json.loads(db_journey.outcomes_data or "[]")],
        created_at=db_journey.created_at,
        updated_at=db_journey.updated_at
    )

@api_router.get("/journeys", response_model=List[JourneyResponse])
async def get_all_journeys(db: Session = Depends(get_db)):
    """Get all patient journeys"""
    journeys = db.query(Journey).all()
    
    return [
        JourneyResponse(
            id=j.id,
            name=j.name,
            description=j.description,
            nodes=[NodeData(**node) for node in json.loads(j.nodes_data)],
            edges=[EdgeData(**edge) for edge in json.loads(j.edges_data)],
            care_gaps=[CareGap(**gap) for gap in json.loads(j.care_gaps_data or "[]")],
            metrics=[Metric(**metric) for metric in json.loads(j.metrics_data or "[]")],
            clinical_outcomes=[ClinicalOutcome(**outcome) for outcome in json.loads(j.outcomes_data or "[]")],
            created_at=j.created_at,
            updated_at=j.updated_at
        )
        for j in journeys
    ]

@api_router.get("/journeys/{journey_id}", response_model=JourneyResponse)
async def get_journey(journey_id: str, db: Session = Depends(get_db)):
    """Get a specific patient journey"""
    journey = db.query(Journey).filter(Journey.id == journey_id).first()
    
    if not journey:
        raise HTTPException(status_code=404, detail="Journey not found")
    
    return JourneyResponse(
        id=journey.id,
        name=journey.name,
        description=journey.description,
        nodes=[NodeData(**node) for node in json.loads(journey.nodes_data)],
        edges=[EdgeData(**edge) for edge in json.loads(journey.edges_data)],
        care_gaps=[CareGap(**gap) for gap in json.loads(journey.care_gaps_data or "[]")],
        metrics=[Metric(**metric) for metric in json.loads(journey.metrics_data or "[]")],
        clinical_outcomes=[ClinicalOutcome(**outcome) for outcome in json.loads(journey.outcomes_data or "[]")],
        created_at=journey.created_at,
        updated_at=journey.updated_at
    )

@api_router.put("/journeys/{journey_id}", response_model=JourneyResponse)
async def update_journey(journey_id: str, journey_update: JourneyUpdate, db: Session = Depends(get_db)):
    """Update a patient journey"""
    db_journey = db.query(Journey).filter(Journey.id == journey_id).first()
    
    if not db_journey:
        raise HTTPException(status_code=404, detail="Journey not found")
    
    if journey_update.name is not None:
        db_journey.name = journey_update.name
    if journey_update.description is not None:
        db_journey.description = journey_update.description
    if journey_update.nodes is not None:
        db_journey.nodes_data = json.dumps([node.model_dump() for node in journey_update.nodes])
    if journey_update.edges is not None:
        db_journey.edges_data = json.dumps([edge.model_dump() for edge in journey_update.edges])
    
    db.commit()
    db.refresh(db_journey)
    
    return JourneyResponse(
        id=db_journey.id,
        name=db_journey.name,
        description=db_journey.description,
        nodes=[NodeData(**node) for node in json.loads(db_journey.nodes_data)],
        edges=[EdgeData(**edge) for edge in json.loads(db_journey.edges_data)],
        created_at=db_journey.created_at,
        updated_at=db_journey.updated_at
    )

@api_router.delete("/journeys/{journey_id}")
async def delete_journey(journey_id: str, db: Session = Depends(get_db)):
    """Delete a patient journey"""
    db_journey = db.query(Journey).filter(Journey.id == journey_id).first()
    
    if not db_journey:
        raise HTTPException(status_code=404, detail="Journey not found")
    
    db.delete(db_journey)
    db.commit()
    
    return {"message": "Journey deleted successfully"}

@api_router.get("/templates", response_model=List[TemplateResponse])
async def get_templates():
    """Get predefined patient journey templates"""
    templates = [
        {
            "id": "template-1",
            "name": "Journey Básico de Paciente Ambulatorio",
            "description": "Flujo estándar para pacientes ambulatorios",
            "nodes": [
                {
                    "id": "1",
                    "type": "registration",
                    "position": {"x": 100, "y": 100},
                    "data": {
                        "label": "Registro/Admisión",
                        "stage_type": "registration",
                        "description": "Primera toma de contacto y registro del paciente",
                        "duration": "15 minutos",
                        "department": "Admisiones",
                        "responsible": "Personal administrativo",
                        "touchpoint": "Presencial/Online",
                        "patient_emotion": "Ansioso, esperanzado",
                        "pain_points": "Tiempo de espera, formularios complejos",
                        "opportunities": "Digitalización del proceso, check-in online",
                        "resources": "Sistema de gestión, personal capacitado"
                    }
                },
                {
                    "id": "2",
                    "type": "consultation",
                    "position": {"x": 400, "y": 100},
                    "data": {
                        "label": "Consulta Médica",
                        "stage_type": "consultation",
                        "description": "Evaluación inicial con el médico",
                        "duration": "30 minutos",
                        "department": "Medicina General",
                        "responsible": "Médico general",
                        "touchpoint": "Presencial",
                        "patient_emotion": "Nervioso, expectante",
                        "pain_points": "Tiempos de espera prolongados",
                        "opportunities": "Recordatorios automáticos, historiales digitales",
                        "resources": "Consultorio equipado, historia clínica electrónica"
                    }
                },
                {
                    "id": "3",
                    "type": "diagnosis",
                    "position": {"x": 700, "y": 100},
                    "data": {
                        "label": "Diagnóstico",
                        "stage_type": "diagnosis",
                        "description": "Análisis de síntomas y determinación del diagnóstico",
                        "duration": "1-2 días",
                        "department": "Laboratorio/Radiología",
                        "responsible": "Especialistas",
                        "touchpoint": "Presencial/Telefónico",
                        "patient_emotion": "Ansioso, preocupado",
                        "pain_points": "Incertidumbre, falta de comunicación",
                        "opportunities": "Notificaciones de resultados, portal del paciente",
                        "resources": "Equipamiento diagnóstico, laboratorio"
                    }
                },
                {
                    "id": "4",
                    "type": "treatment",
                    "position": {"x": 1000, "y": 100},
                    "data": {
                        "label": "Tratamiento",
                        "stage_type": "treatment",
                        "description": "Implementación del plan de tratamiento",
                        "duration": "Variable",
                        "department": "Especialidad correspondiente",
                        "responsible": "Médico tratante",
                        "touchpoint": "Presencial/Telemedicina",
                        "patient_emotion": "Esperanzado, comprometido",
                        "pain_points": "Adherencia al tratamiento, efectos secundarios",
                        "opportunities": "Seguimiento digital, educación del paciente",
                        "resources": "Medicamentos, equipamiento médico"
                    }
                },
                {
                    "id": "5",
                    "type": "followup",
                    "position": {"x": 1300, "y": 100},
                    "data": {
                        "label": "Seguimiento",
                        "stage_type": "followup",
                        "description": "Monitoreo post-tratamiento",
                        "duration": "Continuo",
                        "department": "Atención primaria",
                        "responsible": "Médico de cabecera",
                        "touchpoint": "Telemedicina/Presencial",
                        "patient_emotion": "Recuperándose, optimista",
                        "pain_points": "Falta de recordatorios, acceso limitado",
                        "opportunities": "Monitoreo remoto, apps de salud",
                        "resources": "Sistema de seguimiento, telemedicina"
                    }
                }
            ],
            "edges": [
                {"id": "e1-2", "source": "1", "target": "2", "animated": True},
                {"id": "e2-3", "source": "2", "target": "3", "animated": True},
                {"id": "e3-4", "source": "3", "target": "4", "animated": True},
                {"id": "e4-5", "source": "4", "target": "5", "animated": True}
            ]
        },
        {
            "id": "template-2",
            "name": "Journey de Cirugía Programada",
            "description": "Flujo para procedimientos quirúrgicos programados",
            "nodes": [
                {
                    "id": "1",
                    "type": "registration",
                    "position": {"x": 100, "y": 100},
                    "data": {
                        "label": "Consulta Inicial",
                        "stage_type": "consultation",
                        "description": "Evaluación pre-quirúrgica",
                        "duration": "45 minutos",
                        "department": "Cirugía",
                        "responsible": "Cirujano",
                        "touchpoint": "Presencial",
                        "patient_emotion": "Ansioso",
                        "pain_points": "Desconocimiento del proceso",
                        "opportunities": "Material educativo previo",
                        "resources": "Consultorio especializado"
                    }
                },
                {
                    "id": "2",
                    "type": "diagnosis",
                    "position": {"x": 400, "y": 100},
                    "data": {
                        "label": "Estudios Pre-operatorios",
                        "stage_type": "diagnosis",
                        "description": "Análisis y estudios necesarios",
                        "duration": "1-2 semanas",
                        "department": "Laboratorio/Cardiología",
                        "responsible": "Especialistas",
                        "touchpoint": "Presencial",
                        "patient_emotion": "Preocupado",
                        "pain_points": "Múltiples visitas",
                        "opportunities": "Centralizar estudios",
                        "resources": "Laboratorio completo"
                    }
                },
                {
                    "id": "3",
                    "type": "treatment",
                    "position": {"x": 700, "y": 100},
                    "data": {
                        "label": "Cirugía",
                        "stage_type": "treatment",
                        "description": "Procedimiento quirúrgico",
                        "duration": "2-6 horas",
                        "department": "Quirófano",
                        "responsible": "Equipo quirúrgico",
                        "touchpoint": "Presencial",
                        "patient_emotion": "Nervioso, confiado",
                        "pain_points": "Ansiedad pre-operatoria",
                        "opportunities": "Comunicación con familia en tiempo real",
                        "resources": "Quirófano equipado, equipo médico"
                    }
                },
                {
                    "id": "4",
                    "type": "followup",
                    "position": {"x": 1000, "y": 100},
                    "data": {
                        "label": "Recuperación Post-operatoria",
                        "stage_type": "followup",
                        "description": "Monitoreo inmediato post-cirugía",
                        "duration": "1-3 días",
                        "department": "Hospitalización",
                        "responsible": "Equipo de enfermería",
                        "touchpoint": "Presencial",
                        "patient_emotion": "Vulnerable, recuperándose",
                        "pain_points": "Dolor, incomodidad",
                        "opportunities": "Control del dolor mejorado",
                        "resources": "Camas hospitalarias, monitoreo"
                    }
                },
                {
                    "id": "5",
                    "type": "discharge",
                    "position": {"x": 1300, "y": 100},
                    "data": {
                        "label": "Alta y Seguimiento",
                        "stage_type": "discharge",
                        "description": "Alta hospitalaria y plan de seguimiento",
                        "duration": "Continuo",
                        "department": "Atención primaria",
                        "responsible": "Médico de cabecera",
                        "touchpoint": "Presencial/Telemedicina",
                        "patient_emotion": "Aliviado, expectante",
                        "pain_points": "Instrucciones poco claras",
                        "opportunities": "App de seguimiento post-alta",
                        "resources": "Línea de consulta 24/7"
                    }
                }
            ],
            "edges": [
                {"id": "e1-2", "source": "1", "target": "2", "animated": True},
                {"id": "e2-3", "source": "2", "target": "3", "animated": True},
                {"id": "e3-4", "source": "3", "target": "4", "animated": True},
                {"id": "e4-5", "source": "4", "target": "5", "animated": True}
            ]
        }
    ]
    
    return [TemplateResponse(**template) for template in templates]

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)