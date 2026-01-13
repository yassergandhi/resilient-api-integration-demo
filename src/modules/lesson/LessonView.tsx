
import { useEffect, useState } from 'react';
import type { Lesson } from '../../models/types';
import { getLessonById } from '../data/dataService';

export const LessonView = () => {
  const [lesson, setLesson] = useState<Lesson | null>(null);

  useEffect(() => {
    // Hardcode ID for now to test the pipeline
    const data = getLessonById("a1-lesson-001-hallo"); 
    setLesson(data);
  }, []);

  if (!lesson) return <div>Loading Curriculum...</div>;

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1>{lesson.title}</h1>

      {/* Debugging: Visual Check of the 4 Pillars */}
      <section className="border p-2 my-2">
        <h2>H - Hochdeutsch</h2>
        {lesson.hochdeutsch.phrases.map(p => <div key={p.audioId}>{p.german}</div>)}
      </section>

      <section className="border p-2 my-2">
        <h2>U - Umgangssprache</h2>
         {/* Render phrases here */}
      </section>

      <section className="border p-2 my-2">
        <h2>H - Halt!</h2>
        <p>{lesson.halt.explanation}</p>
      </section>

       <section className="border p-2 my-2">
        <h2>U - Übung</h2>
        <p>{lesson.uebung.instruction}</p>
      </section>
    </div>
  );
};