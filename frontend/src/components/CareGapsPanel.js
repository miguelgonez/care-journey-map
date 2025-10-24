import React, { useState } from 'react';

const CareGapsPanel = ({ careGaps, onUpdate }) => {
  const [expandedGap, setExpandedGap] = useState(null);

  const getSeverityColor = (severity) => {
    const colors = {
      high: 'bg-red-50 border-red-300 text-red-900',
      medium: 'bg-yellow-50 border-yellow-300 text-yellow-900',
      low: 'bg-blue-50 border-blue-300 text-blue-900',
    };
    return colors[severity] || 'bg-gray-50 border-gray-300 text-gray-900';
  };

  const getSeverityBadge = (severity) => {
    const colors = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-blue-100 text-blue-800',
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${colors[severity]}`}>
        {severity === 'high' ? 'Alta' : severity === 'medium' ? 'Media' : 'Baja'}
      </span>
    );
  };

  const getGapTypeIcon = (type) => {
    const icons = {
      missing_intervention: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      delayed_treatment: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      guideline_violation: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    };
    return icons[type] || icons.missing_intervention;
  };

  if (!careGaps || careGaps.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-sm font-medium text-gray-900">¡Sin brechas de atención!</p>
        <p className="text-sm text-gray-500 mt-1">Todos los protocolos están siendo seguidos correctamente</p>
      </div>
    );
  }

  const highSeverityCount = careGaps.filter(g => g.severity === 'high').length;
  const mediumSeverityCount = careGaps.filter(g => g.severity === 'medium').length;
  const lowSeverityCount = careGaps.filter(g => g.severity === 'low').length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          Brechas de Atención
        </h3>
        <div className="flex gap-2">
          {highSeverityCount > 0 && (
            <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-semibold">
              {highSeverityCount} Alta
            </span>
          )}
          {mediumSeverityCount > 0 && (
            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
              {mediumSeverityCount} Media
            </span>
          )}
          {lowSeverityCount > 0 && (
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
              {lowSeverityCount} Baja
            </span>
          )}
        </div>
      </div>

      <div className="space-y-2">
        {careGaps.map((gap, index) => (
          <div
            key={index}
            className={`border-2 rounded-lg overflow-hidden transition-all ${getSeverityColor(gap.severity)} ${
              expandedGap === index ? 'shadow-lg' : ''
            }`}
            data-testid={`care-gap-${index}`}
          >
            <div
              className="p-4 cursor-pointer hover:bg-opacity-80 transition-colors"
              onClick={() => setExpandedGap(expandedGap === index ? null : index)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className="mt-0.5">
                    {getGapTypeIcon(gap.gap_type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {getSeverityBadge(gap.severity)}
                      <span className="text-xs font-medium text-gray-600">
                        {gap.gap_type === 'missing_intervention' ? 'Intervención Faltante' :
                         gap.gap_type === 'delayed_treatment' ? 'Tratamiento Retrasado' :
                         'Violación de Guía'}
                      </span>
                    </div>
                    <p className="font-semibold text-sm">{gap.description}</p>
                  </div>
                </div>
                <svg
                  className={`w-5 h-5 transform transition-transform ${expandedGap === index ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {expandedGap === index && (
              <div className="px-4 pb-4 border-t border-gray-200 pt-3 bg-white bg-opacity-50">
                <div className="space-y-3">
                  <div>
                    <h5 className="text-xs font-semibold text-gray-700 mb-1">Acción Recomendada:</h5>
                    <p className="text-sm text-gray-900">{gap.recommended_action}</p>
                  </div>
                  
                  {gap.guideline_reference && (
                    <div>
                      <h5 className="text-xs font-semibold text-gray-700 mb-1">Referencia de Guía:</h5>
                      <p className="text-sm text-blue-600 font-mono">{gap.guideline_reference}</p>
                    </div>
                  )}
                  
                  <button
                    className="w-full px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium transition-colors flex items-center justify-center gap-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle addressing the gap
                    }}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Marcar como Atendida
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CareGapsPanel;
