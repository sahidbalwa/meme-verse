import { useQuery } from "@tanstack/react-query";
import { fetchTrendingMemes } from "../api/imgflip";
import { getTopMemes, getUserRankings } from "../utils/storage";
import { motion } from "motion/react"
import { Link } from "react-router-dom";

function Leaderboard() {
  const { data } = useQuery({
    queryKey: ["memes"],
    queryFn: fetchTrendingMemes,
  });

  const topMemes = getTopMemes();
  const userRankings = getUserRankings();

  const rankedMemes = topMemes
    .map((top) => {
      const meme = data?.memes.find((m) => m.id === top.id);
      return meme ? { ...meme, likes: top.likes } : null;
    })
    .filter(Boolean);

  return (
    <motion.div
      className="pt-20 pb-6 px-6 min-h-screen flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">Leaderboard</h1>

        <h2 className="text-2xl font-semibold mb-4">Top 10 Memes</h2>
        {rankedMemes.length > 0 ? (
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
          >
            {rankedMemes.map((meme, index) => (
              <motion.div
                key={meme.id}
                className="flex items-center p-4 bg-secondary text-primary rounded-lg shadow-md"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-xl font-bold w-8">{index + 1}</span>
                <Link to={`/meme/${meme.id}`} className="flex-1 flex items-center gap-4">
                  <img src={meme.url} alt={meme.name} className="w-16 h-16 object-cover rounded" />
                  <div>
                    <p className="font-semibold">{meme.name}</p>
                    <p>{meme.likes} Likes</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p>No memes have been liked yet!</p>
        )}

        <h2 className="text-2xl font-semibold mt-8 mb-4">Top Users</h2>
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {userRankings.map((user, index) => (
            <motion.div
              key={index}
              className="flex items-center p-4 bg-secondary text-primary rounded-lg shadow-md"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-xl font-bold w-8">{index + 1}</span>
              <div className="flex-1">
                <p className="font-semibold">{user.name}</p>
                <p>Score: {user.score}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Leaderboard;