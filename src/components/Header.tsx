import React from 'react';
import { Heart } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white/80 backdrop-blur-sm py-6 shadow-md sticky top-0 z-20">
      <div className="container mx-auto px-4 flex justify-center items-center">
        <Heart className="text-primary-400 mr-3 animate-pulse-slow" size={32} />
        <h1 className="text-4xl md:text-5xl font-handwritten text-center bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 text-transparent bg-clip-text">
          Doğa & Halil.
        </h1>
        <Heart className="text-primary-400 ml-3 animate-pulse-slow" size={32} />
      </div>
    </header>
  );
};

export default Header;