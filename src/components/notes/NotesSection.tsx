import React, { useState } from 'react';
import { useNotes } from '../../context/NotesContext';
import NoteItem from './NoteItem';
import { Heart, Plus } from 'lucide-react';

type ColorOption = 'pink' | 'purple' | 'blue' | 'yellow';

const NotesSection: React.FC = () => {
  const { notes, addNote } = useNotes();
  const [newNoteText, setNewNoteText] = useState('');
  const [selectedColor, setSelectedColor] = useState<ColorOption>('pink');

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (newNoteText.trim()) {
      addNote(newNoteText, selectedColor);
      setNewNoteText('');
    }
  };

  const colorOptions: { value: ColorOption; label: string; bgClass: string }[] = [
    { value: 'pink', label: 'Fun', bgClass: 'bg-primary-300' },
    { value: 'purple', label: 'Special', bgClass: 'bg-secondary-300' },
    { value: 'blue', label: 'Trips', bgClass: 'bg-accent-300' },
    { value: 'yellow', label: 'Food', bgClass: 'bg-yellow-300' },
  ];

  return (
    <section className="card bg-white/80 backdrop-blur-sm overflow-hidden">
      <div className="flex items-center mb-4">
        <Heart className="text-primary-400 mr-2" size={24} />
        <h2 className="text-3xl font-handwritten text-primary-700">Beraber Yapacaklarımız 🤭</h2>
      </div>
      
      <form onSubmit={handleAddNote} className="mb-6">
        <div className="flex flex-col md:flex-row gap-2">
          <input
            type="text"
            value={newNoteText}
            onChange={(e) => setNewNoteText(e.target.value)}
            placeholder="Add a new plan..."
            className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300"
          />
          <div className="flex items-center space-x-2">
            {colorOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                title={option.label}
                onClick={() => setSelectedColor(option.value)}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  option.bgClass
                } ${
                  selectedColor === option.value ? 'ring-2 ring-offset-2 ring-gray-500' : ''
                }`}
              >
                {selectedColor === option.value && (
                  <span className="text-white text-xs">✓</span>
                )}
              </button>
            ))}
            <button
              type="submit"
              className="btn-primary flex items-center"
              disabled={!newNoteText.trim()}
            >
              <Plus size={18} className="mr-1" />
              Add
            </button>
          </div>
        </div>
      </form>
      
      <div className="flex flex-wrap gap-4 max-h-[400px] overflow-y-auto p-2">
        {notes.map((note) => (
          <NoteItem key={note.id} note={note} />
        ))}
        {notes.length === 0 && (
          <p className="text-gray-500 italic w-full text-center py-8">
            Add your first plan above!
          </p>
        )}
      </div>
    </section>
  );
};

export default NotesSection;