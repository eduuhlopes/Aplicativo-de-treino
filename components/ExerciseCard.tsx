import React, { useState } from 'react';
import { Exercise } from '../types';

interface ExerciseCardProps {
  exercise: Exercise;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise }) => {
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const [thumbnailError, setThumbnailError] = useState(false);
  // Usa a URL de incorporação padrão do YouTube para máxima compatibilidade.
  const videoUrl = `https://www.youtube.com/embed/${exercise.youtubeVideoId}?autoplay=1`;
  const thumbnailUrl = `https://img.youtube.com/vi/${exercise.youtubeVideoId}/sddefault.jpg`;

  const handleThumbnailError = () => {
    setThumbnailError(true);
  };

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col transition-all duration-300 hover:shadow-blue-500/30 hover:ring-2 hover:ring-blue-500/50">
      <div className="relative aspect-video bg-gray-900 group rounded-t-xl overflow-hidden">
        {!isVideoVisible ? (
          <>
            {!thumbnailError && (
              <img
                src={thumbnailUrl}
                alt={`Thumbnail para ${exercise.name}`}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
                onError={handleThumbnailError}
              />
            )}
            <button
              onClick={() => setIsVideoVisible(true)}
              className="absolute inset-0 w-full h-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500"
              aria-label={`Assistir vídeo para ${exercise.name}`}
            >
              <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-30 transition-all duration-300"></div>
              <svg
                className="relative w-16 h-16 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-transform duration-300 drop-shadow-lg"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6.322,4.381C5.071,3.693,3.5,4.62,3.5,6.081v11.838c0,1.461,1.571,2.388,2.822,1.699l10.8-6.236   c1.251-0.722,1.251-2.676,0-3.398L6.322,4.381z" />
              </svg>
            </button>
          </>
        ) : (
          <>
            <iframe
              src={videoUrl}
              title={`Vídeo: ${exercise.name}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            ></iframe>
            <a
              href={`https://www.youtube.com/watch?v=${exercise.youtubeVideoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-center text-xs py-1.5 text-blue-300 hover:text-white hover:bg-opacity-90 transition-all"
              aria-label={`Assistir ${exercise.name} no YouTube (abre em nova aba)`}
            >
              Problemas para ver? <strong>Assista no YouTube</strong> ↗
            </a>
          </>
        )}
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-white mb-2">{exercise.name}</h3>
        <div className="flex items-center space-x-4 mb-4 text-gray-300">
          <div className="flex items-center space-x-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12v-1a7 7 0 00-7-7h-1" /></svg>
            <span className="font-semibold">{exercise.reps}</span>
          </div>
          <div className="flex items-center space-x-1.5">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span className="font-semibold">{exercise.rest}</span>
          </div>
        </div>

        <div className="space-y-3 mb-4 text-sm">
            <div className="flex items-start space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 6a2 2 0 012-2h1.586A2 2 0 019 4.414l.707.707a2 2 0 010 2.828l-.707.707A2 2 0 017.586 10H6a2 2 0 01-2-2V6zm11-1a3 3 0 10-3 3h-1.586a3 3 0 00-2.121.879l-.707.707a3 3 0 000 4.242l.707.707a3 3 0 002.121.879H12a3 3 0 103-3V5z" clipRule="evenodd" />
                </svg>
                <p className="text-gray-400"><span className="font-semibold text-gray-200">Equipamento:</span> {exercise.equipment}</p>
            </div>
            <div className="flex items-start space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                <p className="text-gray-400"><span className="font-semibold text-gray-200">Músculos:</span> {exercise.musclesWorked}</p>
            </div>
        </div>

        <p className="text-gray-400 text-sm flex-grow max-h-32 overflow-y-auto pr-2 custom-scrollbar">
          {exercise.description}
        </p>
      </div>
    </div>
  );
};

export default ExerciseCard;