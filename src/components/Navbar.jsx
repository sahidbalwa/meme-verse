import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import DarkModeToggle from "./common/DarkModeToggle";
import { useAppContext } from "../context/AppContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useAppContext();

  const linkStyle = ({ isActive }) =>
    `transition-colors ${isActive ? "text-accent bg-blue-950 p-4 rounded-tl-3xl rounded-br-3xl" : "hover:border-b-4 border-secondary"}`;

  const menuVariants = {
    closed: {
      height: 0,
      opacity: 0,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    open: {
      height: "auto",
      opacity: 1,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 w-full bg-primary/50 backdrop-blur-3xl text-secondary  font-semibold text-xl shadow-md z-10"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto px-4 py-0 flex justify-between items-center h-full">
        {/* Logo */}
        <div className="h-full flex items-center"> {/* Wrapper for full height */}
          <NavLink
            to="/"
            className={`text-3xl text-accent font-bold spicy-rice-regular p-3 h-full flex items-center justify-center rounded-tl-3xl rounded-br-3xl ro ${
              theme === "light" ? "bg-blue-950" : "bg-blue-950"
            } px-4 w-40`} // Fixed width to control space
          >
            MemeVerse
          </NavLink>
        </div>

        {/* Hamburger Icon (mobile) */}
        <button
          className="md:hidden text-2xl focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <motion.span
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isOpen ? "✕" : "☰"}
          </motion.span>
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4 px-4 items-center justify-evenly">
          <NavLink to="/explore" className={linkStyle}>
            Explore
          </NavLink>
          <NavLink to="/upload" className={linkStyle}>
            Upload
          </NavLink>
          <NavLink to="/profile" className={linkStyle}>
            Profile
          </NavLink>
          <NavLink to="/leaderboard" className={linkStyle}>
            Leaderboard
          </NavLink>
          <DarkModeToggle />
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-primary px-4 pb-4 overflow-hidden"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="flex flex-col space-y-4">
              <NavLink to="/explore" className={linkStyle} onClick={() => setIsOpen(false)}>
                Explore
              </NavLink>
              <NavLink to="/upload" className={linkStyle} onClick={() => setIsOpen(false)}>
                Upload
              </NavLink>
              <NavLink to="/profile" className={linkStyle} onClick={() => setIsOpen(false)}>
                Profile
              </NavLink>
              <NavLink to="/leaderboard" className={linkStyle} onClick={() => setIsOpen(false)}>
                Leaderboard
              </NavLink>
              <div className="mt-2">
                <DarkModeToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;