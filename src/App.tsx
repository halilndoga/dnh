import React from 'react';
import Header from './components/Header';
import NotesSection from './components/notes/NotesSection';
import PhotoGallery from './components/gallery/PhotoGallery';
import MiniGame from './components/game/MiniGame';
import AffirmationSection from './components/affirmation/AffirmationSection';
import LoveCounter from './components/counter/LoveCounter';
import FloatingHearts from './components/effects/FloatingHearts';
import { NotesProvider } from './context/NotesContext';
import { GalleryProvider } from './context/GalleryContext';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 pb-20">
      <FloatingHearts />
      <Header />
      
      <main className="container mx-auto px-4 py-8 relative z-10">
        <GalleryProvider>
          <NotesProvider>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-8">
                <LoveCounter />
                <NotesSection />
              </div>
              <div className="space-y-8">
                <AffirmationSection />
                <MiniGame />
                <PhotoGallery />
              </div>
            </div>
          </NotesProvider>
        </GalleryProvider>
      </main>
    </div>
  );
}

export default App;