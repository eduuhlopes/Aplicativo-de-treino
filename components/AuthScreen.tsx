import React, { useState } from 'react';
import { UserProfile } from '../types';

interface AuthScreenProps {
  onLogin: (profile: UserProfile) => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [dob, setDob] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    if (!name || !dob || isNaN(weightNum) || isNaN(heightNum) || weightNum <= 0 || heightNum <= 0) {
      alert('Por favor, preencha todos os campos com valores válidos.');
      return;
    }

    onLogin({ name, weight: weightNum, height: heightNum, dob });
  };

  return (
    <>
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
          Bem-vindo ao Gerador de Treino IA
        </h2>
        <p className="text-gray-400 mb-8">
          Para começar, precisamos de algumas informações para criar seus treinos personalizados.
        </p>
      </div>
      <div className="max-w-2xl mx-auto bg-gray-800 p-8 rounded-2xl shadow-2xl shadow-blue-500/10">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
              Seu Nome
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-700 border-gray-600 text-white rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="ex: João Silva"
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="weight" className="block text-sm font-medium text-gray-300 mb-2">
                Seu Peso (kg)
              </label>
              <input
                type="number"
                id="weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full bg-gray-700 border-gray-600 text-white rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="ex: 75"
                required
              />
            </div>
            <div>
              <label htmlFor="height" className="block text-sm font-medium text-gray-300 mb-2">
                Sua Altura (cm)
              </label>
              <input
                type="number"
                id="height"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full bg-gray-700 border-gray-600 text-white rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="ex: 180"
                required
              />
            </div>
          </div>
           <div>
            <label htmlFor="dob" className="block text-sm font-medium text-gray-300 mb-2">
              Data de Nascimento
            </label>
            <input
              type="date"
              id="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full bg-gray-700 border-gray-600 text-white rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              required
              max={new Date().toISOString().split("T")[0]} // Não permite datas futuras
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-transform transform hover:scale-105"
          >
            Salvar Perfil e Começar
          </button>
        </form>
      </div>
    </>
  );
};

export default AuthScreen;