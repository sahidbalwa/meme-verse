import { motion } from "motion/react";

function Loader() {
  const trollfaceUrl = "https://i.imgflip.com/1bij.jpg"; // Trollface meme (or use Doge)

  return (
    <motion.div
      className="flex flex-col items-center justify-center py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.img
        src={trollfaceUrl}
        alt="Trolling Loader"
        className="w-20 h-20 mb-2"
        animate={{
          rotate: [0, 360], // Spin
          scale: [1, 1.1, 1], // Pulse
          x: [-5, 5, -5], // Wiggle
        }}
        transition={{
          rotate: { repeat: Infinity, duration: 1.5, ease: "linear" },
          scale: { repeat: Infinity, duration: 0.6, ease: "easeInOut" },
          x: { repeat: Infinity, duration: 0.4, ease: "easeInOut" },
        }}
      />
      <motion.p
        className="text-lg font-semibold text-secondary"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 1 }}
      >
        Trolling while loading...
      </motion.p>
    </motion.div>
  );
}

export default Loader;