import React from 'react';
import { Handle, Position } from '@xyflow/react';

const getNodeIndicator = (type) => {
  const colors = {
    registration: '#10B981',
    consultation: '#0A74DA',
    diagnosis: '#7B68EE',
    treatment: '#F59E0B',
    followup: '#06B6D4',
    discharge: '#EC4899',
    custom: '#9CA3AF',
  };
  return colors[type] || '#9CA3AF';
};

const PatientJourneyNode = ({ data, selected }) => {
  const nodeClass = `custom-node node-${data.stage_type} ${selected ? 'selected' : ''}`;
  const indicatorColor = getNodeIndicator(data.stage_type);

  return (
    <div className={nodeClass} data-testid={`journey-node-${data.stage_type}`}>
      <Handle 
        type="target" 
        position={Position.Left} 
        style={{ 
          width: '8px', 
          height: '8px',
          background: indicatorColor,
          border: 'none'
        }} 
      />
      
      <div style={{ padding: '12px 16px' }}>
        <div style={{ 
          fontSize: '13px', 
          fontWeight: '500', 
          color: '#1A1A1A',
          marginBottom: '6px',
          letterSpacing: '-0.01em'
        }}>
          {data.label}
        </div>
        
        {data.duration && (
          <div style={{ 
            fontSize: '11px', 
            color: '#6B7280',
            marginBottom: '4px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <span style={{
              width: '3px',
              height: '3px',
              borderRadius: '50%',
              background: '#9CA3AF'
            }}></span>
            {data.duration}
          </div>
        )}
        
        {data.responsible && (
          <div style={{ 
            fontSize: '11px', 
            color: '#9CA3AF'
          }}>
            {data.responsible}
          </div>
        )}
      </div>
      
      <Handle 
        type="source" 
        position={Position.Right} 
        style={{ 
          width: '8px', 
          height: '8px',
          background: indicatorColor,
          border: 'none'
        }} 
      />
    </div>
  );
};

export default PatientJourneyNode;
