

import React from "react";
import { Leaf, BookOpen, UserCheck, CloudSun } from "lucide-react"; // icons

export default function WhyChoose() {
  const features = [
    {
      icon: <Leaf className="w-10 h-10 text-green-600" />,
      title: "Leaf Scan & Diagnosis",
      desc: "Quickly scan leaves to detect diseases, pests, or nutrient deficiencies using AI-powered recognition.",
    },
    {
      icon: <BookOpen className="w-10 h-10 text-green-600" />,
      title: "Plant Encyclopedia",
      desc: "Access a vast library of plant information, from soil needs to growth cycles and care instructions.",
    },
    {
      icon: <UserCheck className="w-10 h-10 text-green-600" />,
      title: "Expert Advice",
      desc: "Receive personalized guidance from agri-experts and AI to improve crop yield and farm productivity.",
    },
    {
      icon: <CloudSun className="w-10 h-10 text-green-600" />,
      title: "Weather Updates",
      desc: "Stay informed with real-time weather predictions tailored to your farm location and crop type.",
    },
  ];

  return (
    <section id = "why" className="w-full bg-white py-12 px-6 md:px-16 text-center md:text-left">
      <div className="w-full mx-auto">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl text-center font-bold text-gray-900">
          Why You Should Choose FarmEase
        </h2>
        <p className="text-base md:text-lg text-gray-600 mt-4">
          Whether you're a home gardener or a professional farmer, farmAssist is your trusted companion to protect your plants, get expert advice, and grow smarter.
        </p>


        {/* ✅ Features Grid */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center text-center hover:shadow-lg transition"
            >
              {item.icon}
              <h3 className="mt-4 text-lg font-bold text-gray-900">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

     {/* ✅ Stats */}
<div className="mt-10 flex flex-wrap justify-center gap-6 md:gap-60">
  {/* Stat 1 */}
  <div className="relative flex flex-col items-center justify-center p-2 w-28 sm:w-32">
    <div className="absolute w-24 h-24 sm:w-32 sm:h-32 bg-gray-200/30 backdrop-blur-md rounded-full"></div>
    <div className="relative flex flex-col items-center">
      <h3 className="text-lg sm:text-xl font-bold text-green-600">95%</h3>
      <p className="text-xs sm:text-sm text-gray-800 mt-1 text-center">Disease Detection Accuracy</p>
    </div>
  </div>

  {/* Stat 2 */}
  <div className="relative flex flex-col items-center justify-center p-2 w-28 sm:w-32">
    <div className="absolute w-24 h-24 sm:w-32 sm:h-32 bg-gray-200/30 backdrop-blur-md rounded-full"></div>
    <div className="relative flex flex-col items-center">
      <h3 className="text-lg sm:text-xl font-bold text-green-600">24/7</h3>
      <p className="text-xs sm:text-sm text-gray-800 mt-1 text-center">AI Assistant Support</p>
    </div>
  </div>

  {/* Stat 3 */}
  <div className="relative flex flex-col items-center justify-center p-2 w-28 sm:w-32">
    <div className="absolute w-24 h-24 sm:w-32 sm:h-32 bg-gray-200/30 backdrop-blur-md rounded-full"></div>
    <div className="relative flex flex-col items-center">
      <h3 className="text-lg sm:text-xl font-bold text-green-600">50+</h3>
      <p className="text-xs sm:text-sm text-gray-800 mt-1 text-center">Crop Types Supported</p>
    </div>
  </div>
</div>




      </div>
    </section>
  );
}
