import React, { createContext, useState, useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export interface Note {
  id: string;
  text: string;
  color: string;
  position: { x: number; y: number };
  completed: boolean;
}

type ColorOption = 'pink' | 'purple' | 'blue' | 'yellow';

interface NotesContextType {
  notes: Note[];
  addNote: (text: string, color: ColorOption) => void;
  updateNotePosition: (id: string, position: { x: number; y: number }) => void;
  toggleNoteCompleted: (id: string) => void;
  deleteNote: (id: string) => void;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

const initialNotes: Note[] = [
  {
    id: uuidv4(),
    text: 'UZI Konseri 🤯 ',
    color: 'yellow',
    position: { x: 0, y: 0 },
    completed: false,
  },

];

export const NotesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notes, setNotes] = useState<Note[]>(() => {
    const savedNotes = localStorage.getItem('love-notes');
    return savedNotes ? JSON.parse(savedNotes) : initialNotes;
  });

  useEffect(() => {
    localStorage.setItem('love-notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = (text: string, color: ColorOption) => {
    const newNote: Note = {
      id: uuidv4(),
      text,
      color,
      position: { x: 0, y: 0 },
      completed: false,
    };
    setNotes([...notes, newNote]);
  };

  const updateNotePosition = (id: string, position: { x: number; y: number }) => {
    setNotes(
      notes.map((note) => (note.id === id ? { ...note, position } : note))
    );
  };

  const toggleNoteCompleted = (id: string) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, completed: !note.completed } : note
      )
    );
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        addNote,
        updateNotePosition,
        toggleNoteCompleted,
        deleteNote,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (context === undefined) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
};