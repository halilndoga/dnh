import React, { useState, useEffect } from 'react';
import { MessageCircleHeart as MessageHeart, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const affirmations = [
  "Bu dünyadaki favori kişimsin ❤️",
  "Seninle her günüm favori günüm.",
  "Kalbimi gülümsetiyorsun.",
  "Seni dünden daha çok, yarından daha az seviyorum.",
  "Başıma gelmiş en güzel şeysin.",
  "Hayat sen yanımdayken daha güzel.",
  "Yapboz'un eksik parçası.",
  "Kefenin cebi olsa, fotoğrafını koyardım.",
];

const AffirmationSection: React.FC = () => {
  const [affirmation, setAffirmation] = useState('');
  const [isChanging, setIsChanging] = useState(false);

  const getRandomAffirmation = () => {
    const currentAffirmation = affirmation;
    let newAffirmation;
    
    do {
      const randomIndex = Math.floor(Math.random() * affirmations.length);
      newAffirmation = affirmations[randomIndex];
    } while (newAffirmation === currentAffirmation && affirmations.length > 1);
    
    return newAffirmation;
  };

  const changeAffirmation = () => {
    setIsChanging(true);
    setTimeout(() => {
      setAffirmation(getRandomAffirmation());
      setIsChanging(false);
    }, 500);
  };

  useEffect(() => {
    setAffirmation(getRandomAffirmation());
  }, []);

  return (
    <section className="card bg-white/80 backdrop-blur-sm">
      <div className="flex items-center mb-4">
        <MessageHeart className="text-primary-400 mr-2" size={24} />
        <h2 className="text-3xl font-handwritten text-primary-700">Günlük Hatırlatma!</h2>
      </div>
      
      <div className="flex flex-col items-center justify-center p-4 min-h-[150px]">
        <AnimatePresence mode="wait">
          {!isChanging && (
            <motion.p
              key={affirmation}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-xl font-handwritten text-center text-gray-800 mb-4"
            >
              {affirmation}
            </motion.p>
          )}
        </AnimatePresence>
        
        <button
          onClick={changeAffirmation}
          className="flex items-center text-primary-500 hover:text-primary-700 transition-colors"
          disabled={isChanging}
        >
          <RefreshCw size={16} className="mr-1" />
          <span className="text-sm">degistir</span>
        </button>
      </div>
    </section>
  );
};

export default AffirmationSection;