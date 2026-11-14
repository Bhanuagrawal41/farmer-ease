import { motion, AnimatePresence } from "framer-motion";
import { Leaf, User, Settings, LogOut, Menu, X, Globe, Phone } from "lucide-react";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/authSlice";

const navItems = [
  { name: "Home",                target: "home" },
  { name: "Field Analytics",    target: "why" },
  { name: "Crop Advisory",      target: "our-features" },
  { name: "Equipment & Machinery", target: "equipment" },
  { name: "Smart Market",       target: "smart-market" },
  { name: "About Us",           target: "contact-us" },
];

export default function Header() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [menuOpen,    setMenuOpen]    = useState(false);

  const { user } = useSelector((state) => state.auth);
  const dispatch  = useDispatch();
  const navigate  = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("auth");
    navigate("/auth");
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <motion.header
      className="sticky top-0 z-50 w-full bg-white border-b border-cardBorder shadow-sm"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 70, damping: 18 }}
    >
      {/* ── Main bar ─────────────────────────────────────────────── */}
      <div className="max-w-screen-xl mx-auto px-4 md:px-8 h-14 flex items-center gap-6">

        {/* Logo */}
        <motion.div
          className="flex items-center gap-2 shrink-0 cursor-pointer"
          whileHover={{ scale: 1.04 }}
          onClick={() => scrollTo("home")}
        >
          <img
            src="/assets/logo.png"
            alt="FarmEase Logo"
            className="w-8 h-8 object-contain"
          />
          <span className="font-bold text-base text-forest tracking-tight">FarmEase</span>
        </motion.div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1 flex-1">
          {navItems.map((item) => (
            <motion.button
              key={item.name}
              onClick={() => scrollTo(item.target)}
              whileHover={{ color: "#1B4D3E" }}
              className="px-3 py-1.5 text-sm text-gray-600 font-medium rounded-md hover:bg-sage transition-colors whitespace-nowrap"
            >
              {item.name}
            </motion.button>
          ))}
        </nav>

        {/* Right utility strip */}
        <div className="hidden md:flex items-center gap-3 shrink-0 ml-auto">
          {/* Weather chip */}
          <div className="flex items-center gap-1.5 bg-sage border border-cardBorder rounded-full px-3 py-1 text-xs text-forest font-medium">
            <span>☀️</span>
            <span>74°F · Fair Wind</span>
          </div>

          {/* Language */}
          <div className="flex items-center gap-1 text-xs text-gray-500 cursor-pointer hover:text-forest transition">
            <Globe className="w-3.5 h-3.5" />
            <span>EN / Global</span>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Phone className="w-3.5 h-3.5" />
            <span>1-800-FARM-EASE</span>
          </div>

          {/* CTA */}
          <motion.a
            href="#start"
            whileHover={{ scale: 1.04 }}
            className="px-4 py-1.5 bg-forest text-white text-sm font-semibold rounded-md hover:bg-accentGreen transition"
          >
            Get Started
          </motion.a>

          {/* Profile avatar */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="w-8 h-8 rounded-full border-2 border-forest overflow-hidden hover:ring-2 hover:ring-goldDark transition"
            >
              <img
                src={user?.profilePic || "https://via.placeholder.com/50"}
                alt="profile"
                className="w-full h-full object-cover"
              />
            </button>

            {/* Profile dropdown */}
            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  key="profile-dropdown"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="absolute right-0 mt-2 w-44 bg-white border border-cardBorder rounded-xl shadow-lg py-1.5 text-sm"
                >
                  <div className="px-3 py-2 border-b border-cardBorder">
                    <p className="font-semibold text-forest text-sm">{user?.name || "Farmer"}</p>
                    <p className="text-xs text-gray-400">{user?.role || "Member"}</p>
                  </div>
                  <button className="flex items-center gap-2 w-full px-3 py-2 hover:bg-sage text-gray-600">
                    <User className="w-3.5 h-3.5" /> Profile
                  </button>
                  <button className="flex items-center gap-2 w-full px-3 py-2 hover:bg-sage text-gray-600">
                    <Settings className="w-3.5 h-3.5" /> Settings
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full px-3 py-2 hover:bg-red-50 text-red-600"
                  >
                    <LogOut className="w-3.5 h-3.5" /> Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden ml-auto p-2 rounded-md text-forest hover:bg-sage transition"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* ── Mobile nav ───────────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-white border-t border-cardBorder"
          >
            <ul className="flex flex-col px-4 py-3 gap-1">
              {navItems.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => scrollTo(item.target)}
                    className="w-full text-left px-3 py-2 rounded-md text-sm text-gray-700 font-medium hover:bg-sage hover:text-forest transition"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
              <li className="pt-2 border-t border-cardBorder">
                <a
                  href="#start"
                  className="block text-center px-4 py-2 bg-forest text-white text-sm font-semibold rounded-md hover:bg-accentGreen transition"
                >
                  Get Started
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
