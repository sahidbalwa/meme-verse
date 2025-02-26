import { Link } from "react-router-dom";
import { motion } from "motion/react";

function NotFound() {
  const meme404Url = "https://i.imgflip.com/1g8my4.jpg"; // "Distracted Boyfriend" meme as a fun 404

  return (
    <motion.div
      className="pt-20 pb-6 px-6 min-h-screen flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center max-w-2xl">
        <motion.h1
          className="text-6xl font-bold mb-4"
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
        >
          404
        </motion.h1>
        <motion.p
          className="text-2xl mb-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Lost in the MemeVerse?
        </motion.p>

        <motion.img
          src={meme404Url}
          alt="404 Meme"
          className="w-full max-w-md h-auto rounded-lg mb-6"
          initial={{ rotate: -5 }}
          animate={{ rotate: 5 }}
          transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
        />

        <motion.p
          className="text-lg mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          This page doesn’t exist... or maybe it’s just hiding in the dankest corner of the internet!
        </motion.p>

        <Link to="/">
          <motion.button
            className="px-6 py-3 bg-accent text-black rounded-lg font-semibold"
            whileHover={{ scale: 1.1, boxShadow: "0 0 10px rgba(144, 238, 144, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            Back to Home
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
}

export default NotFound;