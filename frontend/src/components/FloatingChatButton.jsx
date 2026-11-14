import React, { useState } from 'react';
import { X, Leaf, Minimize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatBot from './ChatBot';

export default function FloatingChatButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* ── Floating trigger button ─────────────────────────── */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-forest text-white pl-3.5 pr-5 py-2.5 rounded-full shadow-xl hover:bg-accentGreen transition-colors"
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        style={{ display: isOpen ? 'none' : 'flex' }}
      >
        <img
          src="/assets/logo.png"
          alt="FarmEase Logo"
          className="w-7 h-7 object-contain rounded-full"
        />
        <span className="text-sm font-semibold tracking-tight">New Advisory Query</span>
      </motion.button>

      {/* ── Chat panel ──────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-panel"
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="fixed bottom-0 right-0 top-0 left-0
                       md:bottom-6 md:right-6 md:top-auto md:left-auto
                       md:w-[420px] md:h-[640px]
                       z-50 flex flex-col rounded-none md:rounded-2xl
                       shadow-2xl overflow-hidden border border-cardBorder"
          >
            {/* Panel header */}
            <div className="flex items-center gap-3 px-4 py-3 bg-forest text-white shrink-0">
              <img
                src="/assets/logo.png"
                alt="FarmEase Logo"
                className="w-8 h-8 object-contain rounded-full"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold leading-none">Rebha AI</p>
                <p className="text-[11px] text-white/60 mt-0.5 truncate">
                  FarmEase Agronomic Intelligence · Engine v4.2
                </p>
              </div>

              {/* Status dot */}
              <span className="flex items-center gap-1 text-[10px] text-emerald-300 font-medium shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Online
              </span>

              {/* Controls */}
              <button
                onClick={() => setIsOpen(false)}
                className="ml-2 p-1.5 rounded-lg hover:bg-white/10 transition"
                title="Minimise"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/10 transition"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat body */}
            <div className="flex-1 overflow-hidden">
              <ChatBot />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
