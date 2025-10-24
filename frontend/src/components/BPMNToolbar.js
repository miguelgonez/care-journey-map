import React, { useState } from 'react';

const BPMNToolbar = ({ onAddNode }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeCategory, setActiveCategory] = useState('events');

  const bpmnElements = {
    events: [
      { type: 'start_event', label: 'Evento Inicio', color: '#10B981', symbol: '○' },
      { type: 'end_event', label: 'Evento Fin', color: '#EF4444', symbol: '◉' },
      { type: 'intermediate_event', label: 'Evento Intermedio', color: '#06B6D4', symbol: '◎' },
    ],
    tasks: [
      { type: 'task', label: 'Tarea', color: '#0A74DA', symbol: '▭' },
      { type: 'service_task', label: 'Tarea de Servicio', color: '#0A74DA', symbol: '⚙' },
      { type: 'user_task', label: 'Tarea de Usuario', color: '#0A74DA', symbol: '👤' },
      { type: 'manual_task', label: 'Tarea Manual', color: '#0A74DA', symbol: '✋' },
    ],
    gateways: [
      { type: 'gateway_exclusive', label: 'Compuerta Exclusiva (XOR)', color: '#F59E0B', symbol: '◇×' },
      { type: 'gateway_parallel', label: 'Compuerta Paralela (AND)', color: '#7B68EE', symbol: '◇+' },
      { type: 'gateway_inclusive', label: 'Compuerta Inclusiva (OR)', color: '#EC4899', symbol: '◇○' },
    ],
    clinical: [
      { type: 'clinical_assessment', label: 'Evaluación Clínica', color: '#10B981', symbol: '📋', fhir: 'Observation' },
      { type: 'medication_task', label: 'Medicación', color: '#F59E0B', symbol: '💊', fhir: 'MedicationRequest' },
      { type: 'procedure_task', label: 'Procedimiento', color: '#EF4444', symbol: '🔬', fhir: 'Procedure' },
      { type: 'appointment_task', label: 'Cita Médica', color: '#06B6D4', symbol: '📅', fhir: 'Appointment' },
    ]
  };

  return (
    <div style={{
      position: 'absolute',
      top: '16px',
      left: '16px',
      zIndex: 10
    }}>
      <div style={{
        background: '#FFFFFF',
        borderRadius: '8px',
        boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.04)',
        border: '1px solid #E5E7EB',
        overflow: 'hidden',
        minWidth: '240px',
        maxWidth: '280px'
      }}>
        <div style={{
          padding: '12px 16px',
          borderBottom: '1px solid #E5E7EB',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h3 style={{
              fontSize: '13px',
              fontWeight: '500',
              color: '#1A1A1A',
              margin: 0,
              letterSpacing: '-0.01em'
            }}>
              BPMN 2.0 Elements
            </h3>
            <p style={{
              fontSize: '10px',
              color: '#9CA3AF',
              margin: '2px 0 0 0'
            }}>
              Notación de Flujo Clínico
            </p>
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              background: 'transparent',
              border: 'none',
              padding: '4px',
              cursor: 'pointer',
              color: '#6B7280',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <svg
              style={{
                width: '14px',
                height: '14px',
                transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.15s ease'
              }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
        
        {isOpen && (
          <>
            {/* Category tabs */}
            <div style={{
              display: 'flex',
              borderBottom: '1px solid #E5E7EB',
              background: '#F5F7FA'
            }}>
              {Object.keys(bpmnElements).map((category) => {
                const categoryLabels = {
                  events: 'Eventos',
                  tasks: 'Tareas',
                  gateways: 'Compuertas',
                  clinical: 'Clínico'
                };
                return (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      background: activeCategory === category ? '#FFFFFF' : 'transparent',
                      border: 'none',
                      borderBottom: activeCategory === category ? '2px solid #0A74DA' : '2px solid transparent',
                      fontSize: '11px',
                      fontWeight: activeCategory === category ? '500' : '400',
                      color: activeCategory === category ? '#0A74DA' : '#6B7280',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {categoryLabels[category]}
                  </button>
                );
              })}
            </div>

            {/* Elements list */}
            <div style={{ padding: '8px', maxHeight: '400px', overflowY: 'auto' }}>
              {bpmnElements[activeCategory].map((element) => (
                <button
                  key={element.type}
                  onClick={() => onAddNode(element.type, element.fhir)}
                  data-testid={`add-bpmn-${element.type}`}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '10px 12px',
                    background: 'transparent',
                    border: '1px solid transparent',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontSize: '12px',
                    color: '#1A1A1A',
                    fontWeight: '400',
                    marginBottom: '4px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#F5F7FA';
                    e.currentTarget.style.borderColor = '#E5E7EB';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.borderColor = 'transparent';
                  }}
                >
                  <div style={{
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    color: element.color,
                    flexShrink: 0,
                    fontWeight: '600'
                  }}>
                    {element.symbol}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ 
                      fontSize: '12px',
                      marginBottom: element.fhir ? '2px' : '0'
                    }}>
                      {element.label}
                    </div>
                    {element.fhir && (
                      <div style={{
                        fontSize: '9px',
                        color: '#9CA3AF',
                        fontFamily: 'monospace'
                      }}>
                        FHIR: {element.fhir}
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* BPMN Legend */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: '8px',
        boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.04)',
        border: '1px solid #E5E7EB',
        marginTop: '12px',
        padding: '12px'
      }}>
        <div style={{
          fontSize: '10px',
          color: '#6B7280',
          marginBottom: '8px',
          fontWeight: '500'
        }}>
          Estándar BPMN 2.0
        </div>
        <div style={{ fontSize: '9px', color: '#9CA3AF', lineHeight: '1.5' }}>
          ○ Inicio | ◉ Fin | ◇ Compuerta<br/>
          ▭ Tarea | Compatible FHIR R4
        </div>
      </div>
    </div>
  );
};

export default BPMNToolbar;
