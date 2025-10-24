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
import PatientJourneyNode from './PatientJourneyNode';
import NodeToolbar from './NodeToolbar';
import EditNodeModal from './EditNodeModal';

const nodeTypes = {
  registration: PatientJourneyNode,
  consultation: PatientJourneyNode,
  diagnosis: PatientJourneyNode,
  treatment: PatientJourneyNode,
  followup: PatientJourneyNode,
  discharge: PatientJourneyNode,
  custom: PatientJourneyNode,
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

  const addNode = (type) => {
    const newNode = {
      id: `node-${Date.now()}`,
      type: type,
      position: {
        x: Math.random() * 400 + 100,
        y: Math.random() * 300 + 100,
      },
      data: {
        label: getDefaultLabel(type),
        stage_type: type,
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
      registration: 'Registro/Admisión',
      consultation: 'Consulta',
      diagnosis: 'Diagnóstico',
      treatment: 'Tratamiento',
      followup: 'Seguimiento',
      discharge: 'Alta',
      custom: 'Etapa Personalizada',
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
      <NodeToolbar onAddNode={addNode} />
      
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <button
          onClick={exportToJSON}
          className="px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 text-sm font-medium text-gray-700 flex items-center gap-2"
          data-testid="export-journey-btn"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Exportar JSON
        </button>
        
        {hasChanges && (
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 text-sm font-medium flex items-center gap-2"
            data-testid="save-journey-btn"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
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
      >
        <Background variant="dots" gap={12} size={1} />
        <Controls />
        <MiniMap
          nodeStrokeWidth={3}
          zoomable
          pannable
          style={{ backgroundColor: '#f9fafb' }}
        />
      </ReactFlow>

      {selectedNode && (
        <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4 max-w-sm z-10 border border-gray-200">
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-semibold text-gray-900">{selectedNode.data.label}</h3>
            <button
              onClick={() => setSelectedNode(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="space-y-2 text-sm text-gray-600 mb-4">
            {selectedNode.data.description && (
              <p><strong>Descripción:</strong> {selectedNode.data.description}</p>
            )}
            {selectedNode.data.duration && (
              <p><strong>Duración:</strong> {selectedNode.data.duration}</p>
            )}
            {selectedNode.data.responsible && (
              <p><strong>Responsable:</strong> {selectedNode.data.responsible}</p>
            )}
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => onEditNode(selectedNode)}
              className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium"
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
              className="flex-1 px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm font-medium"
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
