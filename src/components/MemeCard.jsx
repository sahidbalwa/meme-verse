import { motion } from "motion/react";
import { Link } from "react-router-dom";

function MemeCard({ meme }) {
  return (
    <motion.div
      className="rounded-lg overflow-hidden shadow-lg bg-secondary text-primary"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/meme/${meme.id}`}>
        <img src={meme.url} alt={meme.name} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h3 className="text-lg font-semibold">{meme.name}</h3>
        </div>
      </Link>
    </motion.div>
  );
}

export default MemeCard;