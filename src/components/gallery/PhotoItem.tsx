import React from 'react';
import { useGallery, Photo } from '../../context/GalleryContext';
import { motion } from 'framer-motion';

interface PhotoItemProps {
  photo: Photo;
}

const PhotoItem: React.FC<PhotoItemProps> = ({ photo }) => {
  const { setSelectedPhoto } = useGallery();
  
  // Randomize slight rotation for polaroid effect
  const rotation = Math.random() * 6 - 3; // Random value between -3 and 3

  return (
    <motion.div
      className="polaroid relative cursor-pointer"
      whileHover={{ scale: 1.05, rotate: 0 }}
      initial={{ rotate: rotation }}
      onClick={() => setSelectedPhoto(photo)}
    >
      <div className="relative pt-[100%]">
        <img
          src={photo.url}
          alt={photo.caption}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <p className="font-handwritten text-center mt-2 text-gray-700 break-words">
        {photo.caption}
      </p>
    </motion.div>
  );
};

export default PhotoItem;