import React, { useState } from 'react';

const Sidebar = ({
  isOpen,
  onToggle,
  journeys,
  templates,
  currentJourney,
  onCreateNew,
  onLoadJourney,
  onDeleteJourney,
}) => {
  const [activeTab, setActiveTab] = useState('journeys');
  const [showNewJourneyModal, setShowNewJourneyModal] = useState(false);
  const [newJourneyName, setNewJourneyName] = useState('');
  const [newJourneyDescription, setNewJourneyDescription] = useState('');

  const handleCreateNew = () => {
    if (newJourneyName.trim()) {
      onCreateNew(newJourneyName, newJourneyDescription);
      setNewJourneyName('');
      setNewJourneyDescription('');
      setShowNewJourneyModal(false);
    }
  };

  const handleLoadTemplate = (template) => {
    const name = `${template.name} (Copia)`;
    onCreateNew(name, template.description, template);
    setActiveTab('journeys');
  };

  if (!isOpen) {
    return (
      <button
        onClick={onToggle}
        className="fixed left-0 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-2 rounded-r-lg shadow-lg hover:bg-blue-700 z-10"
        data-testid="open-sidebar-btn"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    );
  }

  return (
    <>
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col shadow-lg">
        {/* Header */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-4 flex justify-between items-center">
          <h2 className="text-white font-bold text-lg">Men\u00fa</h2>
          <button
            onClick={onToggle}
            className="text-white hover:bg-blue-700 rounded p-1"
            data-testid="close-sidebar-btn"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 bg-gray-50">
          <button
            onClick={() => setActiveTab('journeys')}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === 'journeys'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            data-testid="journeys-tab"
          >
            Mis Journeys
          </button>
          <button
            onClick={() => setActiveTab('templates')}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === 'templates'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            data-testid="templates-tab"
          >
            Plantillas
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === 'journeys' && (
            <div className="space-y-3">
              <button
                onClick={() => setShowNewJourneyModal(true)}
                className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center justify-center gap-2 transition-colors"
                data-testid="new-journey-btn"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Nuevo Journey
              </button>

              {journeys.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <svg className="mx-auto h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="text-sm">No hay journeys guardados</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {journeys.map((journey) => (
                    <div
                      key={journey.id}
                      className={`p-3 rounded-lg border transition-all cursor-pointer ${
                        currentJourney?.id === journey.id
                          ? 'bg-blue-50 border-blue-300 shadow-sm'
                          : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm'
                      }`}
                      data-testid={`journey-item-${journey.id}`}
                    >
                      <div className="flex items-start justify-between">
                        <div
                          onClick={() => onLoadJourney(journey)}
                          className="flex-1 min-w-0"
                        >
                          <h3 className="font-medium text-gray-900 text-sm truncate">
                            {journey.name}
                          </h3>
                          {journey.description && (
                            <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                              {journey.description}
                            </p>
                          )}
                          <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                              </svg>
                              {journey.nodes?.length || 0} nodos
                            </span>
                            <span className="flex items-center gap-1">
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                              </svg>
                              {journey.edges?.length || 0} conexiones
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (window.confirm(`¿Eliminar "${journey.name}"?`)) {
                              onDeleteJourney(journey.id);
                            }
                          }}
                          className="ml-2 p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"
                          data-testid={`delete-journey-${journey.id}`}
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'templates' && (
            <div className="space-y-3">
              <p className="text-sm text-gray-600 mb-4">
                Selecciona una plantilla predefinida para comenzar r\u00e1pidamente
              </p>
              
              {templates.map((template) => (
                <div
                  key={template.id}
                  className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
                  onClick={() => handleLoadTemplate(template)}
                  data-testid={`template-${template.id}`}
                >
                  <h3 className="font-semibold text-gray-900 text-sm mb-2">
                    {template.name}
                  </h3>
                  <p className="text-xs text-gray-600 mb-3">
                    {template.description}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      {template.nodes?.length || 0} etapas
                    </span>
                  </div>
                  <button className="mt-3 w-full px-3 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 text-xs font-medium transition-colors">
                    Usar esta plantilla
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* New Journey Modal */}
      {showNewJourneyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex justify-between items-center rounded-t-lg">
              <h3 className="text-white font-bold text-lg">Nuevo Patient Journey</h3>
              <button
                onClick={() => {
                  setShowNewJourneyModal(false);
                  setNewJourneyName('');
                  setNewJourneyDescription('');
                }}
                className="text-white hover:bg-blue-800 rounded-full p-1"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre del Journey *
                  </label>
                  <input
                    type="text"
                    value={newJourneyName}
                    onChange={(e) => setNewJourneyName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ej: Journey de Cirug\u00eda Card\u00edaca"
                    autoFocus
                    data-testid="new-journey-name-input"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descripci\u00f3n (opcional)
                  </label>
                  <textarea
                    value={newJourneyDescription}
                    onChange={(e) => setNewJourneyDescription(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe el prop\u00f3sito de este patient journey..."
                    data-testid="new-journey-description-input"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    setShowNewJourneyModal(false);
                    setNewJourneyName('');
                    setNewJourneyDescription('');
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleCreateNew}
                  disabled={!newJourneyName.trim()}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
                  data-testid="create-journey-modal-btn"
                >
                  Crear
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
