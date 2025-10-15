import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message = 'Carregando...' }) => {
  return (
    <div className="flex flex-col items-center justify-center my-12">
      <div className="w-16 h-16 border-4 border-blue-400 border-dashed rounded-full animate-spin border-t-transparent"></div>
      <p className="mt-4 text-lg text-blue-300">{message}</p>
    </div>
  );
};

export default LoadingSpinner;