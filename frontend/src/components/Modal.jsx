import React from 'react';
import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null; // Don't render anything if it's not open

  return (
    // Main overlay
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
      onClick={onClose} // Close modal if you click the background
    >
      {/* Modal content box */}
      <div 
        className="bg-white rounded-2xl shadow-lg relative p-4 sm:p-6"
        onClick={e => e.stopPropagation()} // Prevent clicks inside the modal from closing it
      >
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-2 right-2 p-1 rounded-full text-gray-500 hover:bg-gray-200"
        >
          <X size={24} />
        </button>
        
        {/* The content you want to display inside the modal */}
        {children}
      </div>
    </div>
  );
}