import React, { useState } from 'react';
import { UserData } from '../types';

interface UserInputFormProps {
  onSubmit: (goal: UserData['goal']) => void;
  isLoading: boolean;
}

const UserInputForm: React.FC<UserInputFormProps> = ({ onSubmit, isLoading }) => {
  const [goal, setGoal] = useState<UserData['goal']>('Massa Muscular');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(goal);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="goal" className="block text-sm font-medium text-gray-300 mb-2">
          Seu Objetivo Principal
        </label>
        <select
          id="goal"
          value={goal}
          onChange={(e) => setGoal(e.target.value as UserData['goal'])}
          className="w-full bg-gray-700 border-gray-600 text-white rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        >
          <option>Massa Muscular</option>
          <option>Definição</option>
          <option>Perda de Peso</option>
        </select>
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-transform transform hover:scale-105 flex items-center justify-center space-x-2"
      >
        {isLoading && (
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        <span>{isLoading ? 'Gerando...' : 'Gerar Treino'}</span>
      </button>
    </form>
  );
};

export default UserInputForm;