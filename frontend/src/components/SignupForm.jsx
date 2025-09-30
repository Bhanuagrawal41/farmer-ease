import React from "react";
import { Leaf } from "lucide-react";

export default function SignupForm() {
  return (
    <section className="w-full bg-green-600 text-white py-12 px-6 md:px-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Column */}
        <div className="space-y-6 text-center md:text-left">
          {/* Logo + Title */}
          <div className="flex items-center justify-center md:justify-start space-x-3">
            <Leaf className="w-10 h-10 text-white" />
            <h1 className="text-3xl font-bold">FarmAssist</h1>
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-snug">
            Transform Your Farming with AI Technology
          </h2>

          {/* Description */}
          <p className="text-base md:text-lg text-gray-100">
            Join thousands of Kerala farmers using smart AI tools for crop
            disease detection, weather-based irrigation advice, and modern
            farming solutions.
          </p>
          
          {/* Feature Boxes */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-green-700 p-4 rounded-xl shadow-md text-center">
              <Brain className="w-8 h-8 mx-auto mb-2 text-white" />
              <h3 className="font-semibold">AI Crop Diagnosis</h3>
              <p className="text-xs text-gray-200">Detect diseases instantly</p>
            </div>
            <div className="bg-green-700 p-4 rounded-xl shadow-md text-center">
              <CloudSun className="w-8 h-8 mx-auto mb-2 text-white" />
              <h3 className="font-semibold">Weather Updates</h3>
              <p className="text-xs text-gray-200">
                Real-time irrigation advice
              </p>
            </div>
            <div className="bg-green-700 p-4 rounded-xl shadow-md text-center">
              <ShieldCheck className="w-8 h-8 mx-auto mb-2 text-white" />
              <h3 className="font-semibold">Secure Data</h3>
              <p className="text-xs text-gray-200">Safe & reliable farming</p>
            </div>
            <div className="bg-green-700 p-4 rounded-xl shadow-md text-center">
              <ShoppingBag className="w-8 h-8 mx-auto mb-2 text-white" />
              <h3 className="font-semibold">Online Store</h3>
              <p className="text-xs text-gray-200">
                Seeds, sprays & equipment
              </p>
            </div>
          </div>
        </div>
        
        

        {/* Right Column - Signup Form */}
        <div className="bg-white text-gray-900 rounded-2xl shadow-lg p-8 w-full max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-center">Create Account</h2>
          <p className="text-sm text-gray-600 text-center mt-2">
            Sign up to access your digital farming assistant
          </p>

          <form className="mt-6 space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-sm font-medium mb-1">Mobile Number</label>
              <input
                type="tel"
                placeholder="Enter your mobile number"
                className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Preferred Language */}
            <div>
              <label className="block text-sm font-medium mb-1">Preferred Language</label>
              <select className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500">
                <option value="ml">Malayalam</option>
                <option value="en">English</option>
                <option value="hi">Hindi</option>
              </select>
            </div>

            {/* District */}
            <div>
              <label className="block text-sm font-medium mb-1">District / Panchayat</label>
              <input
                type="text"
                placeholder="Enter your district"
                className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Crops */}
            <div>
              <label className="block text-sm font-medium mb-1">Crops Grown</label>
              <input
                type="text"
                placeholder="e.g. Rice, Banana, Coconut"
                className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              className="w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition"
            >
              Sign Up
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <a href="#" className="text-green-600 font-semibold hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </div>
       
    </section>
  );
}
