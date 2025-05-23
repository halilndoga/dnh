import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface FloatingHeart {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  color: string;
}

const FloatingHearts: React.FC = () => {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);
  
  const colors = [
    'text-primary-300',
    'text-primary-400',
    'text-primary-500',
    'text-secondary-300',
    'text-secondary-400',
    'text-accent-300',
  ];

  useEffect(() => {
    const generateHearts = () => {
      const newHearts: FloatingHeart[] = [];
      const heartCount = window.innerWidth < 768 ? 8 : 15;
      
      for (let i = 0; i < heartCount; i++) {
        newHearts.push({
          id: i,
          x: Math.random() * 100, // % position across screen
          size: Math.random() * 20 + 10, // Size between 10-30px
          duration: Math.random() * 20 + 30, // Animation duration 30-50s
          delay: Math.random() * -20, // Start at different positions
          opacity: Math.random() * 0.5 + 0.2, // Opacity between 0.2-0.7
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
      
      setHearts(newHearts);
    };
    
    generateHearts();
    
    const handleResize = () => {
      generateHearts();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className={`absolute ${heart.color}`}
          style={{
            left: `${heart.x}%`,
            opacity: heart.opacity,
            width: heart.size,
            height: heart.size,
          }}
          animate={{
            y: ['-10%', '110%'],
          }}
          transition={{
            y: {
              duration: heart.duration,
              repeat: Infinity,
              ease: 'linear',
              delay: heart.delay,
            },
          }}
        >
          <Heart size={heart.size} fill="currentColor" />
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingHearts;