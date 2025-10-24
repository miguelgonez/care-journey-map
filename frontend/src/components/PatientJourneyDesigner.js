import React, { useState, useCallback, useEffect } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import BPMNNode from './BPMNNode';
import BPMNToolbar from './BPMNToolbar';
import EditNodeModal from './EditNodeModal';

const nodeTypes = {
  // BPMN 2.0 Standard Elements
  start_event: BPMNNode,
  end_event: BPMNNode,
  intermediate_event: BPMNNode,
  task: BPMNNode,
  service_task: BPMNNode,
  user_task: BPMNNode,
  manual_task: BPMNNode,
  gateway_exclusive: BPMNNode,
  gateway_parallel: BPMNNode,
  gateway_inclusive: BPMNNode,
  clinical_assessment: BPMNNode,
  medication_task: BPMNNode,
  procedure_task: BPMNNode,
  appointment_task: BPMNNode,
  // Legacy compatibility
  registration: BPMNNode,
  consultation: BPMNNode,
  diagnosis: BPMNNode,
  treatment: BPMNNode,
  followup: BPMNNode,
  discharge: BPMNNode,
  custom: BPMNNode,
};

const PatientJourneyDesigner = ({ journey, onSave }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(journey.nodes || []);
  const [edges, setEdges, onEdgesChange] = useEdgesState(journey.edges || []);
  const [selectedNode, setSelectedNode] = useState(null);
  const [editingNode, setEditingNode] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setNodes(journey.nodes || []);
    setEdges(journey.edges || []);
    setHasChanges(false);
  }, [journey.id]);

  useEffect(() => {
    if (nodes.length > 0 || edges.length > 0) {
      setHasChanges(true);
    }
  }, [nodes, edges]);

  const onConnect = useCallback(
    (params) => {
      const newEdge = {
        ...params,
        type: 'default',
        animated: true,
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 20,
          height: 20,
        },
        style: { strokeWidth: 2, stroke: '#3b82f6' },
      };
      setEdges((eds) => addEdge(newEdge, eds));
      setHasChanges(true);
    },
    [setEdges]
  );

  const addNode = (type, fhirResource = null) => {
    const newNode = {
      id: `node-${Date.now()}`,
      type: type,
      position: {
        x: Math.random() * 400 + 100,
        y: Math.random() * 300 + 100,
      },
      data: {
        label: getDefaultLabel(type),
        bpmn_type: type,
        fhir_resource: fhirResource,
        description: '',
        duration: '',
        department: '',
        responsible: '',
        touchpoint: '',
        patient_emotion: '',
        pain_points: '',
        opportunities: '',
        resources: '',
      },
    };
    setNodes((nds) => [...nds, newNode]);
    setHasChanges(true);
  };

  const getDefaultLabel = (type) => {
    const labels = {
      start_event: 'Inicio',
      end_event: 'Fin',
      intermediate_event: 'Evento',
      task: 'Tarea',
      service_task: 'Servicio',
      user_task: 'Tarea Usuario',
      manual_task: 'Manual',
      gateway_exclusive: 'XOR',
      gateway_parallel: 'AND',
      gateway_inclusive: 'OR',
      clinical_assessment: 'Evaluación',
      medication_task: 'Medicación',
      procedure_task: 'Procedimiento',
      appointment_task: 'Cita',
      registration: 'Registro',
      consultation: 'Consulta',
      diagnosis: 'Diagnóstico',
      treatment: 'Tratamiento',
      followup: 'Seguimiento',
      discharge: 'Alta',
      custom: 'Personalizado',
    };
    return labels[type] || 'Nueva Etapa';
  };

  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
  }, []);

  const onEditNode = (node) => {
    setEditingNode(node);
  };

  const onSaveNode = (nodeId, updatedData) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: { ...node.data, ...updatedData },
          };
        }
        return node;
      })
    );
    setEditingNode(null);
    setHasChanges(true);
  };

  const onDeleteNode = (nodeId) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
    setSelectedNode(null);
    setHasChanges(true);
  };

  const handleSave = () => {
    onSave(nodes, edges);
    setHasChanges(false);
  };

  const exportToJSON = () => {
    const data = {
      journey: journey.name,
      nodes,
      edges,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${journey.name.replace(/\s+/g, '_')}_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full h-full relative" data-testid="patient-journey-designer">
      <BPMNToolbar onAddNode={addNode} />
      
      <div style={{
        position: 'absolute',
        top: '16px',
        right: '16px',
        zIndex: 10,
        display: 'flex',
        gap: '8px'
      }}>
        <button
          onClick={exportToJSON}
          style={{
            padding: '8px 16px',
            background: '#FFFFFF',
            border: '1px solid #E5E7EB',
            borderRadius: '6px',
            fontSize: '13px',
            fontWeight: '400',
            color: '#1A1A1A',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
            letterSpacing: '-0.005em'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#F5F7FA';
            e.currentTarget.style.borderColor = '#D1D5DB';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#FFFFFF';
            e.currentTarget.style.borderColor = '#E5E7EB';
          }}
          data-testid="export-journey-btn"
        >
          Exportar JSON
        </button>
        
        {hasChanges && (
          <button
            onClick={handleSave}
            style={{
              padding: '8px 16px',
              background: '#0A74DA',
              border: 'none',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: '400',
              color: '#FFFFFF',
              cursor: 'pointer',
              transition: 'background 0.15s ease',
              letterSpacing: '-0.005em'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#0860B8'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#0A74DA'}
            data-testid="save-journey-btn"
          >
            Guardar Cambios
          </button>
        )}
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-left"
        style={{ background: '#FAFBFC' }}
      >
        <Background 
          variant="dots" 
          gap={16} 
          size={0.5}
          color="#E5E7EB"
        />
        <Controls 
          style={{
            button: {
              background: '#FFFFFF',
              border: '1px solid #E5E7EB',
              borderRadius: '4px'
            }
          }}
        />
        <MiniMap
          nodeStrokeWidth={2}
          nodeColor={(node) => {
            const colors = {
              registration: '#10B981',
              consultation: '#0A74DA',
              diagnosis: '#7B68EE',
              treatment: '#F59E0B',
              followup: '#06B6D4',
              discharge: '#EC4899',
            };
            return colors[node.data.stage_type] || '#9CA3AF';
          }}
          maskColor="rgba(250, 251, 252, 0.8)"
          style={{ 
            background: '#FFFFFF',
            border: '1px solid #E5E7EB'
          }}
        />
      </ReactFlow>

      {selectedNode && (
        <div style={{
          position: 'absolute',
          bottom: '16px',
          left: '16px',
          background: '#FFFFFF',
          borderRadius: '8px',
          border: '1px solid #E5E7EB',
          padding: '16px',
          maxWidth: '320px',
          zIndex: 10,
          boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.04)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '12px'
          }}>
            <h3 style={{
              fontSize: '14px',
              fontWeight: '500',
              color: '#1A1A1A',
              letterSpacing: '-0.01em',
              margin: 0
            }}>
              {selectedNode.data.label}
            </h3>
            <button
              onClick={() => setSelectedNode(null)}
              style={{
                background: 'transparent',
                border: 'none',
                padding: '2px',
                cursor: 'pointer',
                color: '#9CA3AF',
                display: 'flex',
                alignItems: 'center'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#6B7280'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#9CA3AF'}
            >
              <svg style={{ width: '16px', height: '16px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div style={{
            fontSize: '12px',
            color: '#6B7280',
            marginBottom: '16px',
            lineHeight: '1.5'
          }}>
            {selectedNode.data.description && (
              <div style={{ marginBottom: '6px' }}>
                <span style={{ color: '#1A1A1A', fontWeight: '500' }}>Descripción: </span>
                {selectedNode.data.description}
              </div>
            )}
            {selectedNode.data.duration && (
              <div style={{ marginBottom: '6px' }}>
                <span style={{ color: '#1A1A1A', fontWeight: '500' }}>Duración: </span>
                {selectedNode.data.duration}
              </div>
            )}
            {selectedNode.data.responsible && (
              <div>
                <span style={{ color: '#1A1A1A', fontWeight: '500' }}>Responsable: </span>
                {selectedNode.data.responsible}
              </div>
            )}
          </div>
          
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => onEditNode(selectedNode)}
              style={{
                flex: 1,
                padding: '8px 12px',
                background: '#0A74DA',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: '400',
                cursor: 'pointer',
                transition: 'background 0.15s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#0860B8'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#0A74DA'}
              data-testid="edit-node-btn"
            >
              Editar
            </button>
            <button
              onClick={() => {
                if (window.confirm('¿Estás seguro de eliminar este nodo?')) {
                  onDeleteNode(selectedNode.id);
                }
              }}
              style={{
                flex: 1,
                padding: '8px 12px',
                background: 'transparent',
                color: '#EF4444',
                border: '1px solid #FCA5A5',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: '400',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#FEE2E2';
                e.currentTarget.style.borderColor = '#EF4444';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = '#FCA5A5';
              }}
              data-testid="delete-node-btn"
            >
              Eliminar
            </button>
          </div>
        </div>
      )}

      {editingNode && (
        <EditNodeModal
          node={editingNode}
          onSave={onSaveNode}
          onClose={() => setEditingNode(null)}
        />
      )}
    </div>
  );
};

export default PatientJourneyDesigner;
