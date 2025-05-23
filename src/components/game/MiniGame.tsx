import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { HeartHandshake } from 'lucide-react';

const MiniGame: React.FC = () => {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [showMessage, setShowMessage] = useState(false);
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  const gameContainerRef = useRef<HTMLDivElement>(null);

  const handleYesClick = () => {
    setShowMessage(true);
    
    // Create heart explosion
    const newHearts = [];
    for (let i = 0; i < 20; i++) {
      newHearts.push({
        id: i,
        x: Math.random() * 200 - 100, // -100 to 100
        y: Math.random() * -200, // -200 to 0
      });
    }
    setHearts(newHearts);
    
    // Reset after animation
    setTimeout(() => {
      setHearts([]);
      setShowMessage(false);
    }, 3000);
  };

  const handleNoButtonHover = () => {
    if (!gameContainerRef.current) return;
    
    const containerRect = gameContainerRef.current.getBoundingClientRect();
    const maxX = containerRect.width - 100;
    const maxY = containerRect.height - 50;
    
    // Move to a random position within the container
    setNoButtonPosition({
      x: Math.random() * maxX,
      y: Math.random() * maxY,
    });
  };

  return (
    <section className="card bg-white/80 backdrop-blur-sm relative overflow-hidden" ref={gameContainerRef}>
      <div className="flex items-center mb-4">
        <HeartHandshake className="text-secondary-400 mr-2" size={24} />
        <h2 className="text-3xl font-handwritten text-secondary-700">Çıtır Soru</h2>
      </div>
      
      <div className="flex flex-col items-center justify-center p-4 min-h-[200px]">
        <h3 className="text-2xl font-handwritten mb-8 text-center">
          Doğa, Halil'i seviyor mu?
        </h3>
        
        <div className="flex justify-center items-center relative w-full">
          <motion.button
            className="btn-primary px-10 py-3 text-xl"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleYesClick}
          >
            Evet!
          </motion.button>
          
          <motion.button
            className="btn-secondary px-6 py-2 text-md absolute"
            initial={{ x: 0, y: 0 }}
            animate={{ x: noButtonPosition.x, y: noButtonPosition.y }}
            transition={{ type: 'spring', damping: 10 }}
            onHoverStart={handleNoButtonHover}
            onFocus={handleNoButtonHover}
          >
            Hayır😭
          </motion.button>
        </div>
        
        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: showMessage ? 1 : 0,
            scale: showMessage ? 1 : 0.8,
          }}
          transition={{ type: 'spring', damping: 15 }}
        >
          <p className="text-xl font-handwritten text-primary-600">
            Ben de seni seviyorum aşşşşşkım ❤️
          </p>
        </motion.div>
      </div>
      
      {/* Heart explosion animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute left-1/2 top-1/2 text-primary-500"
            initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
            animate={{ 
              x: heart.x, 
              y: heart.y, 
              scale: Math.random() * 0.5 + 0.5,
              opacity: 0
            }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          >
            ❤️
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default MiniGame;