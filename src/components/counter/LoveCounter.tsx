import React, { useState, useEffect } from 'react';
import { differenceInDays, differenceInMonths, differenceInYears } from 'date-fns';
import { Clock, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const LoveCounter: React.FC = () => {
  const [days, setDays] = useState(0);
  const [months, setMonths] = useState(0);
  const [years, setYears] = useState(0);
  
  const startDate = new Date(2024, 7, 13); // August 13, 2024
  
  useEffect(() => {
    const calculateTimeDifference = () => {
      const now = new Date();
      
      // If the start date is in the future, show 0 days
      if (startDate > now) {
        setDays(0);
        setMonths(0);
        setYears(0);
        return;
      }
      
      setDays(differenceInDays(now, startDate));
      setMonths(differenceInMonths(now, startDate));
      setYears(differenceInYears(now, startDate));
    };
    
    calculateTimeDifference();
    
    // Update the counter every day
    const intervalId = setInterval(calculateTimeDifference, 86400000); // 24 hours
    
    return () => clearInterval(intervalId);
  }, []);
  
  // Calculate heart size based on days (capped at a maximum size)
  const heartSize = Math.min(24 + days / 10, 48);
  
  return (
    <section className="card bg-white/80 backdrop-blur-sm">
      <div className="flex items-center mb-4">
        <Clock className="text-accent-400 mr-2" size={24} />
        <h2 className="text-3xl font-handwritten text-accent-700">Aşk Sayacı</h2>
      </div>
      
      <div className="flex flex-col items-center justify-center p-4">
        <div className="flex items-center justify-center mb-4">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Heart 
              size={heartSize} 
              fill="currentColor" 
              className="text-primary-500 mr-3" 
            />
          </motion.div>
          
          <div className="text-center">
            <p className="text-2xl font-handwritten text-gray-800">
              Bu kadar gündür aşığız:
            </p>
            <div className="flex flex-wrap justify-center gap-x-4 my-2">
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <span className="text-3xl font-bold text-primary-600">{days}</span>
                <p className="text-sm text-gray-600">gün</p>
              </motion.div>
              
              {months > 0 && (
                <motion.div 
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="text-3xl font-bold text-primary-600">{months}</span>
                  <p className="text-sm text-gray-600">ay</p>
                </motion.div>
              )}
              
              {years > 0 && (
                <motion.div 
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <span className="text-3xl font-bold text-primary-600">{years}</span>
                  <p className="text-sm text-gray-600">years</p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
        
        <p className="text-center text-gray-600 italic">
          13 Ağustos 2024'ten beri
        </p>
        
        <p className="mt-2 text-center font-handwritten text-lg text-primary-700">
          ve her gün daha da güzelleşiyor!
        </p>
      </div>
    </section>
  );
};

export default LoveCounter;