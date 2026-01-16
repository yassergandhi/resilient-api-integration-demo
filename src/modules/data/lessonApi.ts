import { lessons } from './mockData';
import type { Lesson } from '../../models/types';

// Tipos para simular respuestas de red
export interface ApiResponse<T> {
  data: T;
  meta: {
    requestId: string;
    latencyMs: number;
    status: number;
  };
}

export interface ApiError {
  message: string;
  status: number;
  requestId: string;
  suggestion: string; // "CSE touch": sugerencia inmediata
}

// Generador de ID aleatorio para traza
const generateRequestId = () => `req_${Math.random().toString(36).substr(2, 9)}`;

export const lessonApi = {
  getLessonById: async (id: string): Promise<ApiResponse<Lesson>> => {
    const requestId = generateRequestId();
    const startTime = Date.now();
    
    // 1. Simular Latencia de Red (300ms - 1500ms)
    const delay = Math.floor(Math.random() * 1200) + 300;
    await new Promise(resolve => setTimeout(resolve, delay));

    // 2. Simular Errores Aleatorios (Chaos Engineering ligero)
    // 20% de probabilidad de fallo para poder probar el troubleshooting
    const randomChance = Math.random();

    if (randomChance < 0.1) {
      throw {
        status: 500,
        message: "Internal Server Error - Database timeout",
        requestId,
        suggestion: "Check database connectivity or retry."
      } as ApiError;
    }

    if (randomChance < 0.2) {
      throw {
        status: 401,
        message: "Unauthorized - Invalid API Token",
        requestId,
        suggestion: "Refresh session or check API keys."
      } as ApiError;
    }

    // 3. Buscar dato real
    const lesson = lessons.find(l => l.id === id);
    const latencyMs = Date.now() - startTime;

    if (!lesson) {
      throw {
        status: 404,
        message: `Lesson with ID '${id}' not found`,
        requestId,
        suggestion: "Verify the Lesson ID in the URL/Configuration."
      } as ApiError;
    }

    // 4. Retorno exitoso ("Happy Path")
    return {
      data: lesson,
      meta: {
        requestId,
        latencyMs,
        status: 200
      }
    };
  }
};