import { motion, AnimatePresence } from "framer-motion";
import { Leaf, User, Settings, ChevronLeft, LogOut, Menu, X } from "lucide-react";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/authSlice";

export default function Header() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { user } = useSelector((state) => state.auth); // ✅ get user from Redux
  const dispatch = useDispatch();
  const navigate = useNavigate();

//   const navItems = ["Home", "Why", "Contact Us", "Features"];
const navItems = [
  { name: "Home", target: "home" },
  { name: "Why", target: "why" },
  { name: "Contact Us", target: "contact-us" },
  { name: "Features", target: "our-features" }, // ← add the id here
];

  const handleLogout = () => {
    dispatch(logout()); // clear Redux state
    localStorage.removeItem("auth"); // clear localStorage
    navigate("/auth"); // redirect to login
  };

  return (
    <motion.header
      className="sticky top-0 z-50 w-full bg-green-700 text-white shadow-lg px-4 md:px-8 py-2"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 60 }}
    >
      <div className="flex items-center justify-between relative">
        {/* Left section: Hamburger (mobile only) */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-green-600"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Logo */}
        <motion.div
          className="flex items-center ml-11 space-x-1"
          whileHover={{ scale: 1.05 }}
        >
          <Leaf className="w-8 h-8 text-yellow-300" />
          <span className="font-bold text-lg md:text-xl">FarmEase</span>
        </motion.div>

        

{/* start */}
<nav className="hidden md:flex space-x-6 text-sm md:text-lg">
  {navItems.map((item, index) => (
    <motion.button
      key={index}
      onClick={() => {
        const el = document.getElementById(item.target);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }}
      whileHover={{ scale: 1.05, color: "#FFD700" }}
      transition={{ type: "spring", stiffness: 200 }}
      className="cursor-pointer"
    >
      {item.name}
    </motion.button>
  ))}
</nav>

{/* end */}
        {/* Right section: Farmer profile */}
        <div className="relative flex items-center gap-2">
          <ChevronLeft
            onClick={() => setProfileOpen(!profileOpen)}
            className={`w-5 h-5 cursor-pointer transition-transform ${
              profileOpen ? "rotate-180" : ""
            }`}
          />

          <div className="flex flex-col items-center">
            <img
              src={user?.profilePic || "https://via.placeholder.com/50"}
              alt="farmer"
              className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white"
            />
            <span className="text-xs md:text-sm font-semibold">
              {user?.name || "Farmer"}
            </span>
            <span className="text-[10px] md:text-xs text-yellow-200">
              {user?.role || "Member"}
            </span>
          </div>
        </div>
      </div>

      {/* Mobile nav (slide in) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 80, damping: 20 }}
            className="absolute left-0 w-64 bg-white text-black shadow-lg rounded-b-lg md:hidden"
            style={{ top: "100%", height: "3.5rem" }}
          >
            <ul className="flex h-full items-center justify-around">
             
{navItems.map((item, index) => (
  <li
    key={index}
    onClick={() => {
      const el = document.getElementById(item.target);
      if (el) el.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }}
    className="font-bold text-sm hover:text-green-600 cursor-pointer"
  >
    {item.name}
  </li>
))}

            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Profile dropdown (slide in) */}
      <AnimatePresence>
        {profileOpen && (
          <motion.div
            key="profile-bar"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 80, damping: 20 }}
            className="absolute right-0 w-64 bg-white text-black shadow-lg rounded-b-lg"
            style={{ top: "100%", height: "3.5rem" }}
          >
            <ul className="flex h-full items-center justify-around">
              <li className="flex items-center gap-1 font-bold text-sm cursor-pointer hover:text-green-700">
                <User className="w-4 h-4" /> Profile
              </li>
              <li className="flex items-center gap-1 font-bold text-sm cursor-pointer hover:text-green-700">
                <Settings className="w-4 h-4" /> Settings
              </li>
              <li
                onClick={handleLogout}
                className="flex items-center gap-1 font-bold text-sm cursor-pointer text-red-600 hover:text-red-800"
              >
                <LogOut className="w-4 h-4" /> Logout
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
