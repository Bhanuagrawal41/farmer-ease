

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Leaf, Brain, CloudSun, ShieldCheck, ShoppingBag } from "lucide-react";
import { useDispatch} from "react-redux";
import { signupUser, loginUser } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
// import ChatBot from "./chatBot"; // <-- ChatBot is now imported via FloatingChatButton

export default function AuthPage() {
  const dispatch = useDispatch();
  // const { user, error, loading } = useSelector((state) => state.auth);

  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    language: "ml",
    location: "",
    crops: "",
    password: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      dispatch(signupUser(formData));
    } else {
      dispatch(loginUser({ mobile: formData.mobile, password: formData.password }));
    }
  };



  const features = [
    { Icon: Brain, title: "AI Crop Diagnosis", desc: "Detect diseases instantly" },
    { Icon: CloudSun, title: "Weather Updates", desc: "Real-time irrigation advice" },
    { Icon: ShieldCheck, title: "Secure Data", desc: "Safe & reliable farming" },
    { Icon: ShoppingBag, title: "Online Store", desc: "Seeds, sprays & equipment" },
  ];

  return (
    <section className="h-screen w-full bg-green-600 text-white flex items-start md:items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-full max-w-7xl mx-auto">
        
        {/* Left Column */}
        <div className="space-y-4 mt-4 md:mt-8 text-center md:text-left px-2 sm:px-4">
          <div className="flex mt-0 items-center justify-center md:justify-start space-x-2">
            <Leaf className="w-12 h-12 md:w-10 md:h-10 text-white animate-pulse" />
            <h1 className="text-2xl sm:text-2xl md:text-4xl font-bold">FarmAssist</h1>
          </div>

          <h2 className="text-lg sm:text-2xl md:text-4xl lg:text-5xl font-extrabold leading-snug">
            Transform Your Farming with <span className="text-yellow-300">AI Technology</span>
          </h2>

          <p className="text-xs sm:text-sm md:text-lg text-gray-100 max-w-md mx-auto md:mx-0">
            Join thousands of Kerala farmers using smart AI tools for crop disease detection, weather-based irrigation advice, and modern farming solutions.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-4 mt-6">
            {features.map(({ Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ scale: 1.05, rotate: 1 }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-700 hover:bg-green-800 transition-colors p-3 sm:p-4 rounded-xl shadow-md text-center cursor-pointer"
              >
                <Icon className="w-6 h-6 sm:w-7 sm:h-7 mx-auto mb-2 text-white" />
                <h3 className="font-semibold text-xs sm:text-base">{title}</h3>
                <p className="text-[10px] sm:text-sm text-gray-200">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column - Auth Box */}
        <div className="bg-white text-gray-900 rounded-2xl shadow-lg p-6 sm:p-8 w-full max-w-md mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-center">
            {isSignup ? "Create Account" : "Welcome Back"}
          </h2>
          <p className="text-sm text-gray-600 text-center mt-1 sm:mt-2">
            {isSignup
              ? "Sign up to access your digital farming assistant"
              : "Sign in to access your farming dashboard"}
          </p>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            {isSignup && (
              <>
                <InputField
                  label="Full Name"
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  onChange={handleChange}
                />

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Preferred Language
                  </label>
                  <select
                    name="language"
                    onChange={handleChange}
                    value={formData.language}
                    className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-green-500"
                  >
                    <option value="ml">Malayalam</option>
                    <option value="en">English</option>
                    <option value="hi">Hindi</option>
                  </select>
                </div>

                <InputField
                  label="District / Panchayat"
                  name="location"
                  type="text"
                  placeholder="Enter your district"
                  onChange={handleChange}
                />

                <InputField
                  label="Crops Grown"
                  name="crops"
                  type="text"
                  placeholder="e.g. Rice, Banana, Coconut"
                  onChange={handleChange}
                />
              </>
            )}

            <InputField
              label="Mobile Number"
              name="mobile"
              type="tel"
              placeholder="Enter your mobile number"
              onChange={handleChange}
            />

            <InputField
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
              onChange={handleChange}
            />

            <button
              type="submit"
              className="w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition"
            >
              {isSignup ? "Sign Up" : "Login"}
            </button>
          </form>

          {/* Display error safely */}
          {/* {error && (
            <p className="text-red-600 text-sm mt-2 text-center">
              {typeof error === "string" ? error : error.message || JSON.stringify(error)}
            </p>
          )} */}

          <p className="text-center text-sm text-gray-600 mt-4">
            {isSignup ? "Already have an account?" : "Don’t have an account?"}{" "}
            <button
              className="text-green-600 font-semibold hover:underline"
              onClick={() => setIsSignup(!isSignup)}
            >
              {isSignup ? "Sign in" : "Sign up"}
            </button>
          </p>
        </div>
      </div>
    </section>
  );
}

// Reusable Input Field
function InputField({ label, name, type, placeholder, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
      />
    </div>
  );
}

// <-- THE FINAL LINE OF CODE IS NOW REMOVED, FIXING THE ROUTER ERROR