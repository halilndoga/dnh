import React from 'react';
import { useGallery } from '../../context/GalleryContext';
import PhotoItem from './PhotoItem';
import PhotoModal from './PhotoModal';
import { Image } from 'lucide-react';

const PhotoGallery: React.FC = () => {
  const { photos, selectedPhoto } = useGallery();

  return (
    <section className="card bg-white/80 backdrop-blur-sm">
      <div className="flex items-center mb-4">
        <Image className="text-accent-400 mr-2" size={24} />
        <h2 className="text-3xl font-handwritten text-accent-700">Anılarımız 🥹</h2>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {photos.map((photo) => (
          <PhotoItem key={photo.id} photo={photo} />
        ))}
      </div>
      
      {selectedPhoto && <PhotoModal />}
    </section>
  );
};

export default PhotoGallery;