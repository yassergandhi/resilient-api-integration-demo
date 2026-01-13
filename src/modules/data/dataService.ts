import type { Lesson } from '../../models/types';
import { lessons as ALL_LESSONS } from './mockData';

/**
 * Public utilities for lesson data.
 * - getAllLessons returns a new sorted array (non-mutating)
 * - getLessonById returns Lesson | null (avoids undefined which can break strict React state types)
 * - getNextLessonId finds the next lesson in the sorted list or returns null
 */

export function getAllLessons(): Lesson[] {
  // return a sorted shallow copy so callers can't mutate the source ordering
  return ALL_LESSONS.slice().sort((a, b) => a.order - b.order);
}

export function getLessonById(lessonId: string): Lesson | null {
  const found = ALL_LESSONS.find(l => l.id === lessonId);
  return found ?? null;
}

export function getNextLessonId(currentLessonId: string): string | null {
  const sorted = getAllLessons();
  const currentIndex = sorted.findIndex(l => l.id === currentLessonId);
  if (currentIndex === -1 || currentIndex >= sorted.length - 1) {
    return null;
  }
  return sorted[currentIndex + 1].id;
}

// Keep a compatibility object for code that imports dataService
export const dataService = {
  getAllLessons,
  getLessonById,
  getNextLessonId
};