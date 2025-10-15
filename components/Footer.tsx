
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-12">
      <div className="container mx-auto px-4 py-6 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} Gerador de Treino IA. Criado com tecnologia Gemini.</p>
      </div>
    </footer>
  );
};

export default Footer;
