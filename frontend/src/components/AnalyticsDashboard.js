import React, { useState } from 'react';
import MetricsPanel from './MetricsPanel';
import CareGapsPanel from './CareGapsPanel';
import OutcomesPanel from './OutcomesPanel';

const AnalyticsDashboard = ({ journey, onClose, onUpdate }) => {
  const [activeTab, setActiveTab] = useState('metrics');
  const [editMode, setEditMode] = useState(false);

  // Sample data based on NEJM AI article insights
  const sampleMetrics = journey.metrics && journey.metrics.length > 0 ? journey.metrics : [
    {
      metric_name: 'Tiempo de Revisión de Historia',
      value: 25,
      unit: 'minutos',
      target_value: 30,
      status: 'on_track'
    },
    {
      metric_name: 'Tiempo a Primer Contacto',
      value: 45,
      unit: 'minutos',
      target_value: 30,
      status: 'at_risk'
    },
    {
      metric_name: 'Adherencia a Guías Clínicas',
      value: 85,
      unit: '%',
      target_value: 90,
      status: 'at_risk'
    },
    {
      metric_name: 'Satisfacción del Paciente',
      value: 92,
      unit: '%',
      target_value: 85,
      status: 'on_track'
    }
  ];

  const sampleCareGaps = journey.care_gaps && journey.care_gaps.length > 0 ? journey.care_gaps : [
    {
      gap_type: 'missing_intervention',
      severity: 'high',
      description: 'Paciente cumple criterios para desfibrilador pero no hay referencia registrada',
      guideline_reference: 'AHA/ACC/HRS 2017 Guideline',
      recommended_action: 'Programar evaluación electrofisiológica urgente y consideración de ICD'
    },
    {
      gap_type: 'delayed_treatment',
      severity: 'medium',
      description: 'Anticoagulación no iniciada 48hrs post-diagnóstico de fibrilación auricular',
      guideline_reference: 'ESC 2020 AF Guidelines',
      recommended_action: 'Iniciar anticoagulación oral según score CHA2DS2-VASc'
    },
    {
      gap_type: 'guideline_violation',
      severity: 'low',
      description: 'Screening familiar de HCM no documentado',
      guideline_reference: 'AHA/ACC HCM Guideline 2020',
      recommended_action: 'Coordinar evaluación cardiológica de familiares de primer grado'
    }
  ];

  const sampleOutcomes = journey.clinical_outcomes && journey.clinical_outcomes.length > 0 ? journey.clinical_outcomes : [
    {
      outcome_type: 'mortality_rate',
      current_value: 2.1,
      target_value: 3.0,
      trend: 'improving',
      measurement_period: 'Últimos 6 meses'
    },
    {
      outcome_type: 'readmission_rate',
      current_value: 12.5,
      target_value: 15.0,
      trend: 'improving',
      measurement_period: 'Últimos 30 días'
    },
    {
      outcome_type: 'time_to_treatment',
      current_value: 45,
      target_value: 60,
      trend: 'stable',
      measurement_period: 'Promedio mensual'
    },
    {
      outcome_type: 'patient_satisfaction',
      current_value: 88,
      target_value: 85,
      trend: 'improving',
      measurement_period: 'Último trimestre'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-white">Dashboard de Análisis</h2>
            <p className="text-blue-100 text-sm mt-1">{journey.name}</p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-blue-700 rounded-full p-2 transition-colors"
            data-testid="close-analytics-btn"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Info Banner - NEJM AI Inspired */}
        <div className="bg-blue-50 border-b border-blue-200 px-6 py-3">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="flex-1">
              <p className="text-sm text-blue-900">
                <strong>Basado en mejores prácticas de NEJM AI:</strong> Este dashboard integra métricas de tiempo, 
                brechas de atención, y outcomes clínicos para optimizar workflows y mejorar resultados del paciente.
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 bg-gray-50 px-6">
          <button
            onClick={() => setActiveTab('metrics')}
            className={`px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === 'metrics'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            data-testid="metrics-tab"
          >
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Métricas & KPIs
            </div>
          </button>
          <button
            onClick={() => setActiveTab('care_gaps')}
            className={`px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === 'care_gaps'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            data-testid="care-gaps-tab"
          >
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Brechas de Atención
              {sampleCareGaps.length > 0 && (
                <span className="px-2 py-0.5 bg-red-100 text-red-800 rounded-full text-xs font-semibold">
                  {sampleCareGaps.length}
                </span>
              )}
            </div>
          </button>
          <button
            onClick={() => setActiveTab('outcomes')}
            className={`px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === 'outcomes'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            data-testid="outcomes-tab"
          >
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
              Outcomes Clínicos
            </div>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'metrics' && (
            <MetricsPanel metrics={sampleMetrics} onUpdate={onUpdate} />
          )}
          {activeTab === 'care_gaps' && (
            <CareGapsPanel careGaps={sampleCareGaps} onUpdate={onUpdate} />
          )}
          {activeTab === 'outcomes' && (
            <OutcomesPanel outcomes={sampleOutcomes} />
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Datos actualizados en tiempo real • Basado en {journey.nodes?.length || 0} etapas del journey
            </p>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 font-medium transition-colors"
              >
                Cerrar
              </button>
              <button
                onClick={() => {
                  // Export analytics report
                  const report = {
                    journey: journey.name,
                    metrics: sampleMetrics,
                    care_gaps: sampleCareGaps,
                    outcomes: sampleOutcomes,
                    generated_at: new Date().toISOString()
                  };
                  const blob = new Blob([JSON.dumps(report, null, 2)], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `analytics_${journey.name.replace(/\s+/g, '_')}_${Date.now()}.json`;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium transition-colors flex items-center gap-2"
                data-testid="export-analytics-btn"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Exportar Reporte
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
