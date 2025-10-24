import React, { useState } from 'react';

const NodeToolbar = ({ onAddNode }) => {
  const [isOpen, setIsOpen] = useState(true);

  const nodeTypes = [
    { type: 'registration', label: 'Registro', color: '#10B981' },
    { type: 'consultation', label: 'Consulta', color: '#0A74DA' },
    { type: 'diagnosis', label: 'Diagnóstico', color: '#7B68EE' },
    { type: 'treatment', label: 'Tratamiento', color: '#F59E0B' },
    { type: 'followup', label: 'Seguimiento', color: '#06B6D4' },
    { type: 'discharge', label: 'Alta', color: '#EC4899' },
    { type: 'custom', label: 'Personalizado', color: '#9CA3AF' },
  ];

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
        minWidth: '160px'
      }}>
        <div style={{
          padding: '12px 16px',
          borderBottom: '1px solid #E5E7EB',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h3 style={{
            fontSize: '13px',
            fontWeight: '500',
            color: '#1A1A1A',
            margin: 0,
            letterSpacing: '-0.01em'
          }}>
            Agregar Etapa
          </h3>
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
          <div style={{ padding: '8px' }}>
            {nodeTypes.map((node) => (
              <button
                key={node.type}
                onClick={() => onAddNode(node.type)}
                data-testid={`add-node-${node.type}`}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '8px 12px',
                  background: 'transparent',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  transition: 'background 0.15s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '12px',
                  color: '#1A1A1A',
                  fontWeight: '400',
                  marginBottom: '2px'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#F5F7FA'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <span style={{
                  width: '3px',
                  height: '16px',
                  borderRadius: '2px',
                  background: node.color,
                  flexShrink: 0
                }}></span>
                {node.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NodeToolbar;
