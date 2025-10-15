import React, { useState, useEffect } from 'react';
import { UserData, WorkoutPlan, UserProfile } from './types';
import { generateWorkoutPlan } from './services/geminiService';
import { generatePdf } from './components/PdfGenerator';
import Header from './components/Header';
import UserInputForm from './components/UserInputForm';
import WorkoutDisplay from './components/WorkoutDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import Footer from './components/Footer';
import AuthScreen from './components/AuthScreen';

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        const savedPlan = localStorage.getItem('workoutPlan');
        if (savedPlan) {
          setWorkoutPlan(JSON.parse(savedPlan));
        }
      } catch (e) {
        console.error("Falha ao analisar dados salvos:", e);
        localStorage.clear();
      }
    }
  }, []);
  
  const handleLogin = (profile: UserProfile) => {
    setUser(profile);
    localStorage.setItem('currentUser', JSON.stringify(profile));
  };

  const handleLogout = () => {
    setUser(null);
    setWorkoutPlan(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('workoutPlan');
  };

  const handleFormSubmit = async (goal: UserData['goal']) => {
    if (!user) return;

    setIsLoading(true);
    setError(null);
    setWorkoutPlan(null);

    const userData: UserData = {
      weight: user.weight,
      height: user.height,
      goal: goal,
    };

    try {
      const plan = await generateWorkoutPlan(userData);
      setWorkoutPlan(plan);
      localStorage.setItem('workoutPlan', JSON.stringify(plan));
    } catch (err) {
      console.error(err);
      setError('Desculpe, não foi possível gerar seu plano de treino. Verifique sua chave de API e tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearPlan = () => {
    localStorage.removeItem('workoutPlan');
    setWorkoutPlan(null);
  };

  const handleDownloadPdf = () => {
    if (workoutPlan && user) {
      generatePdf(workoutPlan, user);
    }
  };
  
  const renderContent = () => {
    if (!user) {
      return <AuthScreen onLogin={handleLogin} />;
    }

    if (isLoading) {
      return <LoadingSpinner message="Gerando seu plano de treino..." />;
    }

    if (error) {
      return (
        <div className="max-w-2xl mx-auto mt-8 bg-red-900/50 border border-red-500 text-red-300 px-4 py-3 rounded-lg text-center">
          <p>{error}</p>
        </div>
      );
    }
    
    if (workoutPlan) {
       return (
          <div className="mt-12">
             <div className="max-w-5xl mx-auto mb-6 flex flex-col sm:flex-row justify-end items-center gap-4">
                <button
                    onClick={handleDownloadPdf}
                    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-transform transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    <span>Baixar PDF</span>
                </button>
                <button
                    onClick={handleClearPlan}
                    className="w-full sm:w-auto bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition"
                >
                    Gerar Novo Plano
                </button>
            </div>
            <WorkoutDisplay plan={workoutPlan} />
          </div>
        );
    }

    return (
      <>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
            Selecione seu Objetivo
          </h2>
          <p className="text-gray-400 mb-8">
            Seu perfil está salvo. Agora, escolha seu objetivo principal para este treino e nossa IA cuidará do resto.
          </p>
        </div>
        <div className="max-w-2xl mx-auto bg-gray-800 p-8 rounded-2xl shadow-2xl shadow-blue-500/10">
          <UserInputForm onSubmit={handleFormSubmit} isLoading={isLoading} />
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col font-sans">
      <Header user={user} onLogout={handleLogout} />
      <main className="flex-grow container mx-auto px-4 py-8">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

export default App;