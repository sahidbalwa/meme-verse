import { motion } from "motion/react";

function FullScreenLoader() {
  const pepeUrl = "https://i.imgflip.com/3bjkke.jpg"; // Pepe meme for fun

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center bg-primary/90 backdrop-blur-md z-50"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.img
        src={pepeUrl}
        alt="Loading Pepe"
        className="w-52 h-52 mb-4"
        animate={{
          y: [-20, 0, -20], // Bounce up and down
          rotate: [0, 10, -10, 0], // Wiggle
          scale: [1, 1.1, 1], // Pulse
        }}
        transition={{
          y: { repeat: Infinity, duration: 0.8, ease: "easeInOut" },
          rotate: { repeat: Infinity, duration: 0.6, ease: "easeInOut" },
          scale: { repeat: Infinity, duration: 1, ease: "easeInOut" },
        }}
      />
      <motion.p
        className="text-2xl font-bold text-secondary"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 1 }}
      >
        Rickrolling into the MemeVerse...
      </motion.p>
      <motion.div
        className="mt-4 w-24 h-2 bg-accent rounded-full"
        animate={{ scaleX: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      />
    </motion.div>
  );
}

export default FullScreenLoader;