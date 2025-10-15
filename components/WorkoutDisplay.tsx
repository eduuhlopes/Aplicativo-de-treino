import React, { useState } from 'react';
import { WorkoutPlan } from '../types';
import ExerciseCard from './ExerciseCard';

interface WorkoutDisplayProps {
  plan: WorkoutPlan;
}

const WorkoutDisplay: React.FC<WorkoutDisplayProps> = ({ plan }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Primeiro dia aberto por padrão

  if (!plan || !plan.workoutPlan) {
    return null;
  }

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-4">
      {plan.workoutPlan.map((day, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index} className="bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-all duration-300 group">
            <button
              onClick={() => handleToggle(index)}
              className="w-full flex justify-between items-center text-left p-5 hover:bg-gray-700/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              aria-expanded={isOpen}
              aria-controls={`workout-day-${index}`}
            >
              <h3 className="text-xl font-bold text-white">
                {day.day}: <span className="text-blue-400">{day.focus}</span>
              </h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 text-gray-400 transform transition-transform duration-300 ${
                  isOpen ? 'rotate-180' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              id={`workout-day-${index}`}
              className={`transition-all duration-500 ease-in-out overflow-hidden ${
                isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="p-5 border-t border-gray-700">
                <div className="mb-6 p-4 bg-gray-900/50 rounded-lg border border-blue-500/20">
                  <h4 className="font-semibold text-lg text-blue-300 mb-2">Dica do Dia</h4>
                  <p className="text-gray-300">{day.daySummary}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {day.exercises.map((exercise, exIndex) => (
                    <ExerciseCard key={exIndex} exercise={exercise} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WorkoutDisplay;