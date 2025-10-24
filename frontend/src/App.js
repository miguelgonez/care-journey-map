import React, { useState, useEffect } from 'react';
import '@xyflow/react/dist/style.css';
import './App.css';
import PatientJourneyDesigner from './components/PatientJourneyDesigner';
import Sidebar from './components/Sidebar';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

function App() {
  const [journeys, setJourneys] = useState([]);
  const [currentJourney, setCurrentJourney] = useState(null);
  const [templates, setTemplates] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showAnalytics, setShowAnalytics] = useState(false);

  useEffect(() => {
    loadJourneys();
    loadTemplates();
  }, []);

  const loadJourneys = async () => {
    try {
      const response = await axios.get(`${API}/journeys`);
      setJourneys(response.data);
    } catch (error) {
      console.error('Error loading journeys:', error);
    }
  };

  const loadTemplates = async () => {
    try {
      const response = await axios.get(`${API}/templates`);
      setTemplates(response.data);
    } catch (error) {
      console.error('Error loading templates:', error);
    }
  };

  const createNewJourney = async (name, description = '', fromTemplate = null) => {
    try {
      const journeyData = {
        name: name || 'Nuevo Patient Journey',
        description,
        nodes: fromTemplate ? fromTemplate.nodes : [],
        edges: fromTemplate ? fromTemplate.edges : []
      };
      
      const response = await axios.post(`${API}/journeys`, journeyData);
      setJourneys([...journeys, response.data]);
      setCurrentJourney(response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating journey:', error);
    }
  };

  const saveJourney = async (journeyId, nodes, edges) => {
    try {
      const response = await axios.put(`${API}/journeys/${journeyId}`, {
        nodes,
        edges
      });
      
      setJourneys(journeys.map(j => j.id === journeyId ? response.data : j));
      setCurrentJourney(response.data);
    } catch (error) {
      console.error('Error saving journey:', error);
    }
  };

  const deleteJourney = async (journeyId) => {
    try {
      await axios.delete(`${API}/journeys/${journeyId}`);
      setJourneys(journeys.filter(j => j.id !== journeyId));
      if (currentJourney?.id === journeyId) {
        setCurrentJourney(null);
      }
    } catch (error) {
      console.error('Error deleting journey:', error);
    }
  };

  const loadJourney = (journey) => {
    setCurrentJourney(journey);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        journeys={journeys}
        templates={templates}
        currentJourney={currentJourney}
        onCreateNew={createNewJourney}
        onLoadJourney={loadJourney}
        onDeleteJourney={deleteJourney}
      />
      
      <div className="flex-1 flex flex-col">
        <header style={{
          background: '#FFFFFF',
          borderBottom: '1px solid #E5E7EB',
          padding: '16px 24px',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)'
        }}>
          <div className="flex items-center justify-between">
            <div>
              <h1 style={{
                fontSize: '20px',
                fontWeight: '500',
                color: '#1A1A1A',
                marginBottom: '4px',
                letterSpacing: '-0.02em'
              }}>
                Patient Journey Designer
              </h1>
              <p style={{
                fontSize: '13px',
                color: '#6B7280',
                margin: 0
              }}>
                {currentJourney ? currentJourney.name : 'Crea o selecciona un patient journey'}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {currentJourney && (
                <button
                  onClick={() => setShowAnalytics(true)}
                  style={{
                    padding: '8px 16px',
                    background: '#0A74DA',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: '400',
                    cursor: 'pointer',
                    transition: 'background 0.15s ease',
                    letterSpacing: '-0.005em'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#0860B8'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#0A74DA'}
                  data-testid="open-analytics-btn"
                >
                  Analítica & Métricas
                </button>
              )}
              <span style={{
                fontSize: '12px',
                color: '#9CA3AF'
              }}>
                {journeys.length} journey{journeys.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-hidden">
          {currentJourney ? (
            <PatientJourneyDesigner
              journey={currentJourney}
              onSave={(nodes, edges) => saveJourney(currentJourney.id, nodes, edges)}
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="mb-6">
                  <svg
                    className="mx-auto h-24 w-24 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No hay journey seleccionado
                </h3>
                <p className="text-gray-600 mb-6">
                  Crea un nuevo patient journey o selecciona uno existente del menú lateral
                </p>
                <button
                  onClick={() => createNewJourney('Nuevo Patient Journey', 'Descripción del journey')}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  data-testid="create-new-journey-btn"
                >
                  <svg className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Crear Nuevo Journey
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {showAnalytics && currentJourney && (
        <AnalyticsDashboard
          journey={currentJourney}
          onClose={() => setShowAnalytics(false)}
          onUpdate={(updatedJourney) => {
            setCurrentJourney(updatedJourney);
            setJourneys(journeys.map(j => j.id === updatedJourney.id ? updatedJourney : j));
          }}
        />
      )}
    </div>
  );
}

export default App;
