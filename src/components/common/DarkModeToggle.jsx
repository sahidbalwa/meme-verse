import { motion } from "motion/react";
import { useAppContext } from "../../context/AppContext";

function DarkModeToggle() {
  const { theme, toggleTheme } = useAppContext();

  return (
    <motion.button
      onClick={toggleTheme}
      className="p-2 bg-blue-950 text-black rounded-full"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </motion.button>
  );
}

export default DarkModeToggle;