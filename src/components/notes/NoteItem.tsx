import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { useNotes, Note } from '../../context/NotesContext';
import { Trash2, Check } from 'lucide-react';

interface NoteItemProps {
  note: Note;
}

const NoteItem: React.FC<NoteItemProps> = ({ note }) => {
  const { updateNotePosition, toggleNoteCompleted, deleteNote } = useNotes();
  const [isHovered, setIsHovered] = useState(false);

  const colorClasses = {
    pink: 'sticky-note-pink',
    purple: 'sticky-note-purple',
    blue: 'sticky-note-blue',
    yellow: 'sticky-note-yellow',
  };

  const handleDragStop = (_e: any, data: { x: number; y: number }) => {
    updateNotePosition(note.id, { x: data.x, y: data.y });
  };

  return (
    <Draggable
      position={note.position}
      onStop={handleDragStop}
      bounds="parent"
      handle=".handle"
    >
      <div
        className={`sticky-note ${colorClasses[note.color as keyof typeof colorClasses]} w-56 min-h-32 transform transition-all ${
          note.completed ? 'opacity-70' : ''
        } ${Math.random() > 0.5 ? 'rotate-1' : '-rotate-1'}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="handle cursor-move w-full h-6 flex justify-center items-center mb-1">
          <div className="w-10 h-1 bg-black/10 rounded-full"></div>
        </div>
        <div className="flex items-start">
          <label className="flex items-start space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={note.completed}
              onChange={() => toggleNoteCompleted(note.id)}
              className="mt-1 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
            />
            <span
              className={`font-handwritten text-lg leading-tight ${
                note.completed ? 'line-through text-gray-500' : ''
              }`}
            >
              {note.text}
            </span>
          </label>
        </div>

        {isHovered && (
          <button
            onClick={() => deleteNote(note.id)}
            className="absolute bottom-2 right-2 text-gray-500 hover:text-red-500 transition-colors"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>
    </Draggable>
  );
};

export default NoteItem;