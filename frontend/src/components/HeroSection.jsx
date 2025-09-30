import { motion } from "framer-motion";
import React from "react";
import { Download, Play } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="w-full bg-white py-12 px-6 md:px-16">
      <div className="grid md:grid-cols-2 items-center gap-12">
        {/* ✅ Left Column - Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center md:text-left"
        >
          {/* Title */}
          <div className="flex flex-wrap items-baseline gap-2 justify-center md:justify-start">
            <h1 className="text-5xl md:text-6xl font-extrabold text-green-600">
              FarmEase
            </h1>
            <span className="text-2xl md:text-4xl font-semibold text-black">
              – Your AI Farming Assistant
            </span>
          </div>

          {/* Subtitle */}
          <h2 className="text-xl font-medium text-gray-700 mt-6">
            Diagnose, Learn, and Grow with Smart Crop Monitoring
          </h2>

          {/* Description */}
          <p className="text-base text-black mt-4 leading-relaxed">
            FarmEase is your smart AI-powered farming assistant that helps
            farmers and gardeners diagnose plant diseases, monitor crop health,
            predict weather impacts, and receive expert advice — all in one.
            Using real-time leaf scan technology, soil analysis, and automated
            treatment plans, you can boost crop yields and protect your farm.
          </p>

          {/* ✅ CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            {/* Download Button */}
            <button className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-xl shadow-md hover:bg-green-700 transition">
              <Download className="w-5 h-5" />
              Download Now
            </button>

            {/* Watch Demo Button */}
            <button className="flex items-center gap-2 px-6 py-3 bg-white text-green-600 font-semibold rounded-xl shadow-md border border-green-600 hover:bg-gray-50 transition">
              <Play className="w-5 h-5" />
              Watch Demo
            </button>
          </div>
        </motion.div>

        {/* ✅ Right Column - Mobile Mockup */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center md:justify-end"
        >
          <div className="relative w-40 h-80 md:w-56 md:h-[500px] bg-black rounded-3xl shadow-xl flex items-center justify-center">
            {/* Mobile Screen (white inside) */}
            <div className="w-[90%] h-[90%] bg-white rounded-2xl flex items-center justify-center">
              <span className="text-green-600 text-2xl md:text-3xl font-extrabold">
                🌾 FarmEase
              </span>
            </div>

            {/* Top Notch */}
            <div className="absolute top-2 w-16 h-4 bg-gray-800 rounded-full mx-auto"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
