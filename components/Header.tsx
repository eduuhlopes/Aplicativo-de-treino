import React from 'react';
import { UserProfile } from '../types';

interface HeaderProps {
  user: UserProfile | null;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <svg
            className="w-8 h-8 text-blue-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="1.5" 
              d="M5 12h14M3 9h2v6H3V9zm16 0h2v6h-2V9z" 
            />
          </svg>
          <h1 className="text-xl font-bold tracking-tight text-white">Gerador de Treino IA</h1>
        </div>
        {user && (
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
               <span className="h-2.5 w-2.5 bg-green-500 rounded-full animate-pulse" title="Logado"></span>
               <span className="text-gray-300 hidden sm:block">Olá, <span className="font-bold text-white">{user.name}</span></span>
            </div>
            <button 
              onClick={onLogout}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition text-sm"
            >
              Sair
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;