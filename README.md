# 🏥 Care Journey Map - Patient Journey Designer

Aplicación profesional para diseño de **Patient Journeys** (Viajes del Paciente) cumpliendo con estándares **BPMN 2.0** y **FHIR R4**, con diseño minimalista inspirado en NextHealth y analytics basado en NEJM AI.

![BPMN 2.0](https://img.shields.io/badge/BPMN-2.0-blue)
![FHIR](https://img.shields.io/badge/FHIR-R4-green)
![React](https://img.shields.io/badge/React-19-61dafb)
![FastAPI](https://img.shields.io/badge/FastAPI-Latest-009688)

---

## 🎯 Características Principales

### ✨ Diseño de Workflows Clínicos
- **Notación BPMN 2.0 Standard** - Cumple con ISO/IEC 19510:2013
- **Integración FHIR R4** - Compatible con Fast Healthcare Interoperability Resources
- **Canvas Interactivo** - Basado en React Flow para modelado visual
- **Elementos BPMN Completos** - Eventos, Tareas, Compuertas, Subprocesos

### 📊 Analytics Avanzado (NEJM AI-inspired)
- **Métricas & KPIs** - Tracking de tiempos, adherencia, satisfacción
- **Brechas de Atención** - Identificación automática con severidad
- **Outcomes Clínicos** - Mortalidad, readmisión, tiempos de tratamiento
- **Referencias a Guidelines** - AHA/ACC, ESC, HL7

### 🎨 Diseño Minimalista NextHealth
- **Paleta Suave** - Colores neutros que reducen fatiga visual
- **Tipografía Limpia** - Inter/System fonts, tamaños consistentes
- **Sin Iconos Estridentes** - Enfoque en claridad y función
- **Espaciado Generoso** - Whitespace optimizado para lectura

---

## 🚀 Instalación y Uso

### Prerequisitos
- Python 3.11+
- Node.js 18+
- Yarn

### Backend Setup

```bash
cd backend
pip install -r requirements.txt
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

### Frontend Setup

```bash
cd frontend
yarn install
yarn start
```

### Acceso
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8001/api

---

## 🎨 Elementos BPMN 2.0

- **○** Evento Inicio | **◉** Evento Fin | **◎** Evento Intermedio
- **▭** Tarea | **⚙** Servicio | **👤** Usuario | **✋** Manual
- **◇×** XOR | **◇+** AND | **◇○** OR
- **📋 Evaluación** (FHIR: Observation) | **💊 Medicación** (FHIR: MedicationRequest)
- **🔬 Procedimiento** (FHIR: Procedure) | **📅 Cita** (FHIR: Appointment)

---

## 📊 Analytics Dashboard

- ✅ Métricas & KPIs con estados (On track / At risk / Critical)
- ⚠️ Brechas de Atención con severidad y guidelines
- 📈 Outcomes Clínicos con tendencias

---

## 🌐 API Endpoints

```
GET/POST   /api/journeys
GET/PUT    /api/journeys/{id}
DELETE     /api/journeys/{id}
GET        /api/templates
```

---

## 📄 Licencia

MIT License

---

**Desarrollado con ❤️ para mejorar la experiencia del paciente** 🏥✨
