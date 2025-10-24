# 🏥 Patient Journey Designer - Enhanced with NEJM AI Insights

Una aplicación completa para diseñar y gestionar **Patient Journeys** (Viajes del Paciente) utilizando React Flow, adaptada desde [xyflow/xyflow](https://github.com/xyflow/xyflow) e **mejorada con conceptos de NEJM AI** sobre redesigning clinical workflows con AI generativa.

## 🆕 Mejoras Basadas en NEJM AI (2025)

Inspirados por el artículo ["From Promise to Proof: Redesigning Clinical Workflows with Generative AI"](https://ai.nejm.org/doi/full/10.1056/AI-S2501083), hemos integrado:

### 1. **Dashboard de Analítica Avanzada** 📊
- **Métricas & KPIs**: Seguimiento de tiempos de revisión, adherencia a protocolos, satisfacción del paciente
- **Brechas de Atención (Care Gaps)**: Identificación automática de:
  - Intervenciones faltantes
  - Tratamientos retrasados  
  - Violaciones de guidelines clínicas
- **Outcomes Clínicos**: Monitoreo de resultados medibles:
  - Tasas de mortalidad
  - Tasas de readmisión
  - Tiempo a tratamiento
  - Satisfacción del paciente

### 2. **Enfoque en ROI Medible**
- Métricas de tiempo: Chart review time, time to treatment
- Indicadores de calidad: Guideline adherence, care gap closure
- Outcomes financieros: Improved coding, reduced readmissions

### 3. **Transparencia y Referencias**
- Cada brecha de atención vinculada a guidelines específicas
- Referencias a guías clínicas (AHA/ACC, ESC, etc.)
- Acciones recomendadas basadas en evidencia

### 4. **Workflow Integration**
- No es una herramienta aislada, sino integrada al proceso de diseño del journey
- Métricas contextuales a cada etapa del patient journey
- Análisis holístico del flujo completo de atención

## 📋 Características Principales

### 🎨 Diseño Visual Interactivo
- **Canvas interactivo** con React Flow para diseñar flujos de paciente
- **Drag & Drop** de nodos y conexiones
- **7 tipos de nodos** predefinidos con iconos y colores específicos:
  - 📋 Registro/Admisión (verde)
  - 👨‍⚕️ Consulta (azul)
  - 🔬 Diagnóstico (morado)
  - 💊 Tratamiento (naranja)
  - ✅ Seguimiento (cyan)
  - 🎉 Alta (rosa)
  - ⭐ Personalizado (gris)

### 📊 Información Completa del Patient Journey
Cada nodo captura información según mejores prácticas:
- **Información Básica**: Título, descripción
- **Detalles Operacionales**: Duración, departamento, responsable, touchpoint/canal
- **Experiencia del Paciente**: Emociones, pain points, oportunidades de mejora
- **Recursos**: Equipamiento, personal, sistemas necesarios

### 🗂️ Gestión de Journeys
- **Menú lateral tipo Streamlit** con dos pestañas:
  - **Mis Journeys**: Lista de todos los journeys guardados
  - **Plantillas**: Templates predefinidos para comenzar rápidamente
- **CRUD completo**: Crear, leer, actualizar y eliminar journeys
- **Auto-guardado** con indicador de cambios pendientes
- **Exportar a JSON** para compartir o respaldo

### 📈 **Dashboard de Analítica (NUEVO)**
Basado en mejores prácticas de NEJM AI para optimización de workflows clínicos:

#### **Métricas & KPIs**
- Tiempo de revisión de historia clínica
- Tiempo a primer contacto
- Adherencia a guías clínicas
- Satisfacción del paciente
- Estados visuales: On track, At risk, Critical

#### **Brechas de Atención (Care Gaps)**
Sistema de alertas basado en guidelines:
- **Alta severidad**: Intervenciones críticas faltantes (ej: ICD en HCM)
- **Media severidad**: Tratamientos retrasados (ej: anticoagulación en FA)
- **Baja severidad**: Screening familiar pendiente
- Referencias a guidelines: AHA/ACC, ESC, etc.
- Acciones recomendadas específicas

#### **Outcomes Clínicos**
Tracking de resultados medibles con tendencias:
- **Mortalidad**: Reducción de 74% documentada en estudios con Viz PE
- **Readmisión**: Monitoreo de tasas a 30 días
- **Tiempo a Tratamiento**: De 4 horas a 6 minutos (caso TriHealth)
- **Satisfacción**: Patient experience scoring

### 🎯 Plantillas Predefinidas
1. **Journey Básico de Paciente Ambulatorio**
   - Flujo estándar con 5 etapas
   - Desde registro hasta seguimiento

2. **Journey de Cirugía Programada**
   - Flujo quirúrgico completo
   - Desde consulta inicial hasta alta y seguimiento post-operatorio

## 🏗️ Arquitectura Técnica

### Backend
- **Framework**: FastAPI (Python)
- **Base de Datos**: SQLite3 con SQLAlchemy ORM
- **Características**:
  - APIs RESTful con validación Pydantic
  - Almacenamiento eficiente en SQLite (sin dependencias externas)
  - Documentación automática en `/docs`

### Frontend
- **Framework**: React 19
- **Librería de Flujos**: @xyflow/react (React Flow v12)
- **UI Components**: Radix UI + Tailwind CSS
- **Características**:
  - Componentes reutilizables
  - Estado local con React Hooks
  - Diseño responsivo y profesional

## 📁 Estructura del Proyecto

```
/app/
├── backend/
│   ├── server.py              # FastAPI application with analytics endpoints
│   ├── database.py            # SQLAlchemy setup + Journey model (enhanced)
│   ├── models.py              # Pydantic models (NodeData, CareGap, Metric, ClinicalOutcome)
│   ├── patient_journeys.db    # SQLite database with analytics tables
│   └── requirements.txt       # Python dependencies
│
├── frontend/
│   ├── src/
│   │   ├── App.js                     # Main application with analytics integration
│   │   ├── App.css                    # Custom styles
│   │   └── components/
│   │       ├── PatientJourneyDesigner.js  # Main canvas
│   │       ├── PatientJourneyNode.js      # Custom node component
│   │       ├── NodeToolbar.js             # Add node toolbar
│   │       ├── EditNodeModal.js           # Edit node modal
│   │       ├── Sidebar.js                 # Streamlit-style sidebar
│   │       ├── AnalyticsDashboard.js      # 🆕 Analytics dashboard
│   │       ├── MetricsPanel.js            # 🆕 Metrics & KPIs panel
│   │       ├── CareGapsPanel.js           # 🆕 Care gaps identification
│   │       └── OutcomesPanel.js           # 🆕 Clinical outcomes tracking
│   └── package.json
│
└── README_PATIENT_JOURNEY.md              # This file
```

## 🚀 Instalación y Uso

### Prerequisitos
- Python 3.11+
- Node.js 18+
- Yarn

### Backend Setup

```bash
cd /app/backend

# Instalar dependencias
pip install -r requirements.txt

# Iniciar servidor (auto-crea la base de datos)
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

### Frontend Setup

```bash
cd /app/frontend

# Instalar dependencias
yarn install

# Iniciar aplicación
yarn start
```

### Acceso
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8001/api
- **API Docs**: http://localhost:8001/docs

## 🔌 API Endpoints

### Journeys
- `GET /api/journeys` - Obtener todos los journeys
- `POST /api/journeys` - Crear nuevo journey
- `GET /api/journeys/{id}` - Obtener journey específico
- `PUT /api/journeys/{id}` - Actualizar journey
- `DELETE /api/journeys/{id}` - Eliminar journey

### Templates
- `GET /api/templates` - Obtener plantillas predefinidas

### Ejemplo de Request

```bash
# Crear nuevo journey
curl -X POST http://localhost:8001/api/journeys \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Mi Journey",
    "description": "Descripción del journey",
    "nodes": [],
    "edges": []
  }'
```

## 🎨 Uso de la Aplicación

### 1. Crear un Nuevo Journey
- Click en **"Nuevo Journey"** en el sidebar
- Ingresa nombre y descripción
- Click en **"Crear"**

### 2. Agregar Nodos
- Usa el toolbar en la esquina superior izquierda
- Click en el tipo de nodo que deseas agregar
- El nodo aparecerá en el canvas

### 3. Conectar Nodos
- Arrastra desde el punto de conexión derecho (source) de un nodo
- Suelta en el punto de conexión izquierdo (target) de otro nodo
- Las conexiones se crean automáticamente con animación

### 4. Editar Nodos
- Click en un nodo para seleccionarlo
- Aparecerá un panel de información en la esquina inferior izquierda
- Click en **"Editar"** para abrir el formulario completo
- Completa todos los campos según necesites
- Click en **"Guardar Cambios"**

### 5. Guardar y Exportar
- Los cambios se detectan automáticamente
- Click en **"Guardar Cambios"** (botón azul superior derecha)
- Usa **"Exportar JSON"** para descargar el journey

### 6. Usar Plantillas
- Ve a la pestaña **"Plantillas"** en el sidebar
- Click en cualquier plantilla
- Se creará una copia que puedes modificar

### 7. **Analizar Métricas y Outcomes (NUEVO)** 📊
- Click en **"Analítica & Métricas"** en el header
- Explora las tres pestañas:
  - **Métricas & KPIs**: Visualiza tiempos, adherencia y satisfacción
  - **Brechas de Atención**: Identifica care gaps con severidad y acciones
  - **Outcomes Clínicos**: Monitorea resultados con tendencias
- Exporta reportes en JSON para análisis externo

## 🎯 Mejores Prácticas Implementadas (Enhanced)

### Basado en NEJM AI Insights:

1. **Workflow-Integrated Analytics**: No solo mapear el journey, sino medir su efectividad
2. **Care Gap Identification**: Sistema proactivo para identificar y cerrar brechas de atención
3. **Guideline Adherence**: Verificación contra protocolos establecidos (AHA/ACC, ESC)
4. **Time Metrics**: "For every hour with patients, nearly two hours on EHR" - optimizamos esto
5. **ROI Measurement**: Métricas financieras y clínicas tangibles
6. **Transparency**: Cada recomendación vinculada a su fuente y guideline

### Tradicionales (Mantenidos):

1. **Mapeo de Touchpoints**: Identifica todos los puntos de contacto paciente-sistema
2. **Análisis Emocional**: Captura emociones del paciente en cada etapa
3. **Identificación de Pain Points**: Documenta problemas y frustraciones
4. **Oportunidades de Mejora**: Registra ideas para optimizar la experiencia
5. **Gestión de Recursos**: Identifica equipamiento y personal necesario
6. **Responsabilidades Claras**: Asigna responsables a cada etapa
7. **Métricas Temporales**: Documenta duración de cada proceso

## 🔒 Base de Datos

El sistema usa **SQLite3** para máxima portabilidad:
- Archivo: `/app/backend/patient_journeys.db`
- Sin configuración adicional necesaria
- Respaldo simple (copiar el archivo .db)
- Fácil migración a PostgreSQL/MySQL si es necesario

## 🎨 Personalización de Colores

Los colores están definidos en `/app/frontend/src/App.css`:

```css
.node-registration { border-color: #10b981; } /* Verde */
.node-consultation { border-color: #3b82f6; } /* Azul */
.node-diagnosis    { border-color: #8b5cf6; } /* Morado */
.node-treatment    { border-color: #f59e0b; } /* Naranja */
.node-followup     { border-color: #06b6d4; } /* Cyan */
.node-discharge    { border-color: #ec4899; } /* Rosa */
```

## 🧪 Testing

El proyecto incluye tests básicos de API:

```bash
bash /tmp/test_patient_journey.sh
```

## 🚀 Deployment

### Producción
1. Configurar variables de entorno
2. Usar Gunicorn para el backend
3. Build de producción del frontend
4. Configurar CORS apropiadamente
5. Considerar migración a PostgreSQL para mayor concurrencia

## 📝 Roadmap Futuro

- [ ] Versionado de journeys
- [ ] Colaboración en tiempo real
- [ ] Exportar a PDF/PNG
- [ ] Analytics y métricas
- [ ] Integración con sistemas hospitalarios
- [ ] Multi-idioma
- [ ] Roles y permisos

## 🤝 Contribuciones

Este proyecto es una adaptación de [xyflow/xyflow](https://github.com/xyflow/xyflow) específicamente para el diseño de Patient Journeys en el sector salud.

## 📄 Licencia

MIT License - Ver archivo LICENSE

## 🙏 Agradecimientos

- [xyflow](https://xyflow.com) - Por la excelente librería React Flow
- Comunidad de diseño de experiencia del paciente
- Profesionales de la salud que inspiraron las mejores prácticas

---

**Desarrollado con ❤️ para mejorar la experiencia del paciente**
