import React, { useState } from 'react';

const NodeToolbar = ({ onAddNode }) => {
  const [isOpen, setIsOpen] = useState(true);

  const nodeTypes = [
    { type: 'registration', label: 'Registro/Admisión', icon: '📋', color: 'bg-green-100 hover:bg-green-200 border-green-300' },
    { type: 'consultation', label: 'Consulta', icon: '👨‍⚕️', color: 'bg-blue-100 hover:bg-blue-200 border-blue-300' },
    { type: 'diagnosis', label: 'Diagnóstico', icon: '🔍', color: 'bg-purple-100 hover:bg-purple-200 border-purple-300' },
    { type: 'treatment', label: 'Tratamiento', icon: '💊', color: 'bg-orange-100 hover:bg-orange-200 border-orange-300' },
    { type: 'followup', label: 'Seguimiento', icon: '✅', color: 'bg-cyan-100 hover:bg-cyan-200 border-cyan-300' },
    { type: 'discharge', label: 'Alta', icon: '🎉', color: 'bg-pink-100 hover:bg-pink-200 border-pink-300' },
    { type: 'custom', label: 'Personalizado', icon: '⭐', color: 'bg-gray-100 hover:bg-gray-200 border-gray-300' },
  ];

  return (
    <div className="absolute top-4 left-4 z-10">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3 flex justify-between items-center">
          <h3 className="text-white font-semibold text-sm">Agregar Nodo</h3>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white hover:bg-blue-800 rounded p-1"
          >
            <svg
              className={`w-4 h-4 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
        
        {isOpen && (
          <div className="p-3 space-y-2 max-w-xs">
            {nodeTypes.map((node) => (
              <button
                key={node.type}
                onClick={() => onAddNode(node.type)}
                className={`w-full text-left px-3 py-2 rounded-md border ${node.color} transition-colors flex items-center gap-2 text-sm font-medium text-gray-700`}
                data-testid={`add-node-${node.type}`}
              >
                <span className="text-lg">{node.icon}</span>
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
