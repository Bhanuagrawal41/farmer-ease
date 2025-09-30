import React from "react";
import { Leaf, Brain, CloudSun, ShieldCheck, ShoppingBag } from "lucide-react";

export default function Signup() {
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
            Join thousands of Kerala farmers who are using smart AI tools for
            crop disease detection, weather-based irrigation advice, and modern
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

        {/* Right Column - Sign In Box */}
        <div className="bg-white text-gray-900 rounded-2xl shadow-lg p-8 w-full max-w-md mx-auto">
          {/* Welcome Text */}
          <h2 className="text-2xl font-bold text-center">Welcome Back</h2>
          <p className="text-sm text-gray-600 text-center mt-2">
            Sign in to access your farming dashboard
          </p>

          {/* Form */}
          <form className="mt-6 space-y-4">
            {/* Mobile Number / Username */}
            <div>
              <label className="block text-sm font-medium mb-1">Mobile / Username</label>
              <input
                type="text"
                placeholder="Enter mobile or username"
                className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition"
            >
              Sign In
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-gray-600 mt-4">
            Don’t have an account?{" "}
            <a href="#" className="text-green-600 font-semibold hover:underline">
              Sign up & Create Account
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
