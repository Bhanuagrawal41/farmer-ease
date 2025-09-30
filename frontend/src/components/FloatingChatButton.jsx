import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatBot from './ChatBot'; // <-- Renders the functional ChatBot component

export default function FloatingChatButton() {
  const [isOpen, setIsOpen] = useState(false); // Controls chat window visibility

  return (
    <>
      {/* 1. The Floating Icon (Button) */}
      <motion.button
        className="fixed bottom-6 right-6 bg-green-600 text-white rounded-full p-4 shadow-xl hover:bg-green-700 transition z-50 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? (
          <X className="w-6 h-6" aria-label="Close Chat" />
        ) : (
          <MessageSquare className="w-6 h-6" aria-label="Open Chat Assistant" />
        )}
      </motion.button>

      {/* 2. The Full Chat UI (Modal/Floating Box) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-0 right-0 top-0 left-0 md:bottom-10 md:right-10 md:top-auto md:left-auto md:w-96 md:h-[600px] bg-white rounded-t-xl md:rounded-xl shadow-2xl z-40 transition-all duration-300 overflow-hidden flex flex-col"
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <header className="flex justify-between items-center p-3 bg-green-500 text-white shadow-md">
                <h3 className="font-semibold">KrishiSakthi AI</h3>
                <button onClick={() => setIsOpen(false)}>
                    <X className="w-5 h-5"/>
                </button>
            </header>
            <ChatBot /> 
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}