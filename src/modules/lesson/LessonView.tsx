// 1. Importa VALORES (Cosas que existen en el navegador: funciones, objetos, componentes)
import { useState, useEffect } from 'react';
import { lessonApi } from '../data/lessonApi'; // <--- SIN 'type' porque es un objeto

// 2. Importa TIPOS (Cosas que solo existen en tu código y desaparecen al compilar)
import type { Lesson } from '../../models/types';
import type { ApiError, ApiResponse } from '../data/lessonApi';

export const LessonView = () => {
  // Estado de la UI
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [lesson, setLesson] = useState<Lesson | null>(null);
  
  // Estado para Diagnóstico CSE
  const [debugInfo, setDebugInfo] = useState<{
    requestId?: string;
    latency?: number;
    statusCode?: number;
    errorMessage?: string;
  } | null>(null);

  // Hardcodeamos un ID para probar (sin routing por ahora)
  //const TARGET_LESSON_ID = "1"; Para causar error 404  
 const TARGET_LESSON_ID = "a1-lesson-001-hallo";

  const fetchLessonData = async () => {
    setStatus('loading');
    setDebugInfo(null); // Limpiar debug anterior

    try {
      const response: ApiResponse<Lesson> = await lessonApi.getLessonById(TARGET_LESSON_ID);
      setLesson(response.data);
      setStatus('success');
      
      // Guardar info de éxito para debug
      setDebugInfo({
        requestId: response.meta.requestId,
        latency: response.meta.latencyMs,
        statusCode: response.meta.status
      });

    } catch (err) {
      const error = err as ApiError;
      setStatus('error');
      
      // Guardar info de error para debug
      setDebugInfo({
        requestId: error.requestId || 'unknown',
        statusCode: error.status || 0,
        errorMessage: error.message || 'Unknown error'
      });
      console.error("Integration Error:", error);
    }
  };

  useEffect(() => {
    fetchLessonData();
  }, []);

  // --- RENDERIZADO ---

  if (status === 'loading') {
    return <div className="p-10 text-center">🔄 Connecting to Lesson API...</div>;
  }

  if (status === 'error') {
    return (
      <div className="p-8 max-w-md mx-auto mt-10 border-2 border-red-200 rounded-lg bg-red-50">
        <h2 className="text-xl font-bold text-red-700 mb-2">System Error</h2>
        <p className="text-red-600 mb-4">{debugInfo?.errorMessage}</p>
        <button 
          onClick={fetchLessonData}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Retry Request
        </button>
        
        {/* Panel CSE visible en error */}
        <div className="mt-6 p-4 bg-gray-900 text-green-400 font-mono text-xs rounded">
          <p className="uppercase font-bold mb-2 border-b border-gray-700 pb-1">Integration Debug</p>
          <p>STATUS: {debugInfo?.statusCode}</p>
          <p>REQ_ID: {debugInfo?.requestId}</p>
          <p>TS: {new Date().toISOString()}</p>
        </div>
      </div>
    );
  }

  // Happy Path
  return (
    <div className="container mx-auto p-4">
      {/* Tu UI normal de la lección aquí */}
      <h1 className="text-2xl font-bold mb-4">{lesson?.title}</h1>
      <div className="p-4 bg-white shadow rounded mb-8">
        {/* Contenido placeholder de la lección */}
        <p>Contenido de la lección cargado correctamente.</p>
      </div>

      {/* Panel CSE visible en éxito (Footer técnico) */}
      <div className="mt-12 border-t pt-4 text-gray-400 text-xs font-mono">
        <div className="flex gap-4 items-center">
          <span className="font-bold">API STATUS: ONLINE</span>
          <span>Latency: {debugInfo?.latency}ms</span>
          <span>Ref: {debugInfo?.requestId}</span>
          <button 
            onClick={fetchLessonData} 
            className="text-blue-500 underline ml-auto"
          >
            Force Reload (Test Reliability)
          </button>
        </div>
      </div>
    </div>
  );
};