import React, { useEffect } from 'react';
import { useGallery } from '../../context/GalleryContext';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PhotoModal: React.FC = () => {
  const { selectedPhoto, setSelectedPhoto } = useGallery();

  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedPhoto(null);
      }
    };

    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [setSelectedPhoto]);

  if (!selectedPhoto) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
        onClick={() => setSelectedPhoto(null)}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 20 }}
          className="bg-white rounded-lg overflow-hidden max-w-4xl max-h-[90vh] w-full flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative">
            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.caption}
              className="w-full object-contain max-h-[70vh]"
            />
            <button
              className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70 transition-colors"
              onClick={() => setSelectedPhoto(null)}
            >
              <X size={20} />
            </button>
          </div>
          <div className="p-4 text-center">
            <p className="font-handwritten text-xl text-gray-800">{selectedPhoto.caption}</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PhotoModal;