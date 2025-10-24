import React from 'react';
import { Handle, Position } from '@xyflow/react';

// BPMN 2.0 compliant node component
const BPMNNode = ({ data, selected }) => {
  // Support both bpmn_type (new) and stage_type (legacy)
  const nodeType = data.bpmn_type || data.stage_type || data.type || 'task';
  const nodeClass = `bpmn-node bpmn-${nodeType} ${selected ? 'selected' : ''}`;

  // Map legacy types to BPMN types
  const mapLegacyType = (type) => {
    const mapping = {
      registration: 'task',
      consultation: 'task',
      diagnosis: 'task',
      treatment: 'task',
      followup: 'task',
      discharge: 'task',
      custom: 'task'
    };
    return mapping[type] || type;
  };

  const bpmnType = mapLegacyType(nodeType);

  // Start Event (círculo simple)
  if (bpmnType === 'start_event') {
    return (
      <div className={nodeClass} data-testid={`bpmn-node-start-event`}>
        <Handle 
          type="source" 
          position={Position.Right} 
          style={{ 
            width: '8px', 
            height: '8px',
            background: '#10B981',
            border: 'none'
          }} 
        />
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: '2px solid #10B981',
          background: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '10px',
          color: '#1A1A1A',
          fontWeight: '500'
        }}>
          START
        </div>
      </div>
    );
  }

  // End Event (círculo doble)
  if (bpmnType === 'end_event') {
    return (
      <div className={nodeClass} data-testid={`bpmn-node-end-event`}>
        <Handle 
          type="target" 
          position={Position.Left} 
          style={{ 
            width: '8px', 
            height: '8px',
            background: '#EF4444',
            border: 'none'
          }} 
        />
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: '4px double #EF4444',
          background: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '10px',
          color: '#1A1A1A',
          fontWeight: '500'
        }}>
          END
        </div>
      </div>
    );
  }

  // Gateway Exclusive (rombo)
  if (data.bpmn_type === 'gateway_exclusive') {
    return (
      <div className={nodeClass} data-testid={`bpmn-node-gateway`}>
        <Handle 
          type="target" 
          position={Position.Left} 
          style={{ 
            width: '8px', 
            height: '8px',
            background: '#F59E0B',
            border: 'none'
          }} 
        />
        <Handle 
          type="source" 
          position={Position.Right} 
          style={{ 
            width: '8px', 
            height: '8px',
            background: '#F59E0B',
            border: 'none'
          }} 
        />
        <Handle 
          type="source" 
          position={Position.Bottom} 
          id="bottom"
          style={{ 
            width: '8px', 
            height: '8px',
            background: '#F59E0B',
            border: 'none'
          }} 
        />
        <div style={{
          width: '50px',
          height: '50px',
          transform: 'rotate(45deg)',
          border: '2px solid #F59E0B',
          background: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            transform: 'rotate(-45deg)',
            fontSize: '20px',
            color: '#F59E0B',
            fontWeight: '700',
            lineHeight: '1'
          }}>
            ×
          </div>
        </div>
      </div>
    );
  }

  // Gateway Parallel (rombo con +)
  if (data.bpmn_type === 'gateway_parallel') {
    return (
      <div className={nodeClass} data-testid={`bpmn-node-gateway-parallel`}>
        <Handle 
          type="target" 
          position={Position.Left} 
          style={{ 
            width: '8px', 
            height: '8px',
            background: '#7B68EE',
            border: 'none'
          }} 
        />
        <Handle 
          type="source" 
          position={Position.Right} 
          style={{ 
            width: '8px', 
            height: '8px',
            background: '#7B68EE',
            border: 'none'
          }} 
        />
        <Handle 
          type="source" 
          position={Position.Bottom} 
          id="bottom"
          style={{ 
            width: '8px', 
            height: '8px',
            background: '#7B68EE',
            border: 'none'
          }} 
        />
        <div style={{
          width: '50px',
          height: '50px',
          transform: 'rotate(45deg)',
          border: '2px solid #7B68EE',
          background: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            transform: 'rotate(-45deg)',
            fontSize: '24px',
            color: '#7B68EE',
            fontWeight: '400',
            lineHeight: '1'
          }}>
            +
          </div>
        </div>
      </div>
    );
  }

  // Task (rectángulo redondeado) - BPMN Standard
  return (
    <div className={nodeClass} data-testid={`bpmn-node-task`}>
      <Handle 
        type="target" 
        position={Position.Left} 
        style={{ 
          width: '8px', 
          height: '8px',
          background: '#0A74DA',
          border: 'none'
        }} 
      />
      
      <div style={{
        minWidth: '120px',
        padding: '12px 16px',
        background: '#FFFFFF',
        border: '2px solid #0A74DA',
        borderRadius: '8px',
        boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.04)'
      }}>
        <div style={{ 
          fontSize: '12px', 
          fontWeight: '500', 
          color: '#1A1A1A',
          marginBottom: data.fhir_resource ? '6px' : '0',
          letterSpacing: '-0.01em',
          textAlign: 'center'
        }}>
          {data.label}
        </div>
        
        {data.fhir_resource && (
          <div style={{
            fontSize: '9px',
            color: '#6B7280',
            textAlign: 'center',
            padding: '2px 6px',
            background: '#F5F7FA',
            borderRadius: '4px',
            fontFamily: 'monospace'
          }}>
            FHIR: {data.fhir_resource}
          </div>
        )}
      </div>
      
      <Handle 
        type="source" 
        position={Position.Right} 
        style={{ 
          width: '8px', 
          height: '8px',
          background: '#0A74DA',
          border: 'none'
        }} 
      />
    </div>
  );
};

export default BPMNNode;
