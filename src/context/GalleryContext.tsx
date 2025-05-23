import React, { createContext, useState, useContext, useEffect } from 'react';

export interface Photo {
  id: string;
  url: string;
  caption: string;
}

interface GalleryContextType {
  photos: Photo[];
  selectedPhoto: Photo | null;
  setSelectedPhoto: (photo: Photo | null) => void;
}

const GalleryContext = createContext<GalleryContextType | undefined>(undefined);

// Sample photos using Pexels stock photos
const initialPhotos: Photo[] = [
  {
    id: '1',
    url: 'https://i.imgur.com/B8rFUqS.jpeg',
    caption: 'Çay için teşekkür ederim❤️',
  },
  {
    id: '2',
    url: 'https://i.imgur.com/DCrkMb3.png',
    caption: 'Kürk olduğunu kabullendin.',
  },
  {
    id: '3',
    url: 'https://i.imgur.com/WEdOeW0.png',
    caption: 'Çok enerjik çıkmışsın aşkım.',
  },
  {
    id: '4',
    url: 'https://i.imgur.com/He8QbL3.jpeg',
    caption: 'Bazen bu kızı nasıl tavladım diye düşünüyorum.',
  },
];

export const GalleryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [photos, setPhotos] = useState<Photo[]>(() => {
    const savedPhotos = localStorage.getItem('love-photos');
    return savedPhotos ? JSON.parse(savedPhotos) : initialPhotos;
  });
  
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  useEffect(() => {
    localStorage.setItem('love-photos', JSON.stringify(photos));
  }, [photos]);

  return (
    <GalleryContext.Provider
      value={{
        photos,
        selectedPhoto,
        setSelectedPhoto,
      }}
    >
      {children}
    </GalleryContext.Provider>
  );
};

export const useGallery = () => {
  const context = useContext(GalleryContext);
  if (context === undefined) {
    throw new Error('useGallery must be used within a GalleryProvider');
  }
  return context;
};