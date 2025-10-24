import React from 'react';

const OutcomesPanel = ({ outcomes }) => {
  const getTrendIcon = (trend) => {
    if (trend === 'improving') {
      return (
        <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      );
    }
    if (trend === 'declining') {
      return (
        <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
        </svg>
      );
    }
    return (
      <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
      </svg>
    );
  };

  const getTrendColor = (trend) => {
    const colors = {
      improving: 'text-green-600 bg-green-50',
      stable: 'text-gray-600 bg-gray-50',
      declining: 'text-red-600 bg-red-50',
    };
    return colors[trend] || colors.stable;
  };

  const getOutcomeIcon = (type) => {
    const icons = {
      mortality_rate: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      readmission_rate: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      time_to_treatment: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      patient_satisfaction: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    };
    return icons[type] || icons.patient_satisfaction;
  };

  if (!outcomes || outcomes.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <svg className="mx-auto h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        <p className="text-sm">No hay outcomes clínicos configurados</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        Outcomes Clínicos
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {outcomes.map((outcome, index) => {
          const percentage = (outcome.current_value / outcome.target_value) * 100;
          const isOnTarget = outcome.current_value <= outcome.target_value;
          
          return (
            <div
              key={index}
              className="bg-white border-2 border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all"
              data-testid={`outcome-${outcome.outcome_type}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="text-blue-600">
                    {getOutcomeIcon(outcome.outcome_type)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-gray-900">
                      {outcome.outcome_type === 'mortality_rate' ? 'Tasa de Mortalidad' :
                       outcome.outcome_type === 'readmission_rate' ? 'Tasa de Readmisión' :
                       outcome.outcome_type === 'time_to_treatment' ? 'Tiempo a Tratamiento' :
                       'Satisfacción del Paciente'}
                    </h4>
                    <p className="text-xs text-gray-500">{outcome.measurement_period}</p>
                  </div>
                </div>
                <div className={`p-2 rounded-lg ${getTrendColor(outcome.trend)}`}>
                  {getTrendIcon(outcome.trend)}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-2xl font-bold text-gray-900">
                      {outcome.current_value.toFixed(1)}%
                    </span>
                    <span className="text-sm text-gray-600 ml-2">actual</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-semibold text-gray-600">
                      Objetivo: {outcome.target_value.toFixed(1)}%
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all ${
                        outcome.trend === 'improving' ? 'bg-green-500' :
                        outcome.trend === 'declining' ? 'bg-red-500' : 'bg-gray-400'
                      }`}
                      style={{
                        width: `${Math.min(percentage, 100)}%`
                      }}
                    />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-gray-500">0%</span>
                    <span className="text-xs text-gray-500">100%</span>
                  </div>
                </div>

                {/* Trend badge */}
                <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    outcome.trend === 'improving' ? 'bg-green-100 text-green-800' :
                    outcome.trend === 'declining' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {outcome.trend === 'improving' ? 'Mejorando' :
                     outcome.trend === 'declining' ? 'Empeorando' : 'Estable'}
                  </span>
                  {!isOnTarget && (
                    <span className="text-xs text-gray-600">
                      {Math.abs(outcome.current_value - outcome.target_value).toFixed(1)}% 
                      {outcome.current_value > outcome.target_value ? ' por encima' : ' por debajo'} del objetivo
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OutcomesPanel;
