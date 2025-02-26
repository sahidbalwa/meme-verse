import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchTrendingMemes } from "../api/imgflip";
import { getLikes, setLike, getComments, addComment, deleteComment } from "../utils/storage"; // Added deleteComment
import { motion, AnimatePresence } from "framer-motion"; // Corrected import
import { toast } from "react-hot-toast";
import { FaHeart, FaRegHeart, FaTrash } from "react-icons/fa"; // Added FaTrash for delete
import { useAppContext } from "../context/AppContext"; // Import context


function MemeDetails() {
  const { id } = useParams();
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [showAllComments, setShowAllComments] = useState(false);

  const { theme } = useAppContext(); // Get theme from context

  const { data, isLoading, error } = useQuery({
    queryKey: ["memes"],
    queryFn: fetchTrendingMemes,
  });

  const meme = data?.memes.find((m) => m.id === id);

  useEffect(() => {
    if (id) {
      const currentLikes = getLikes(id);
      setLikes(currentLikes);
      setComments(getComments(id));
      setLiked(currentLikes > 0);
    }
  }, [id]);

  const handleLike = () => {
    const newLiked = !liked;
    setLiked(newLiked);
    setLike(id, newLiked);
    setLikes((prev) => (newLiked ? prev + 1 : Math.max(prev - 1, 0)));
    toast.success(newLiked ? "Liked!" : "Unliked!");
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      const timestamp = new Date().toLocaleString();
      addComment(id, { text: comment, timestamp });
      setComments(getComments(id));
      setComment("");
      toast.success("Comment added!");
    }
  };

  const handleDeleteComment = (commentId) => {
    setComments(deleteComment(id, commentId));
    toast.success("Comment deleted!");
  };

  if (isLoading) {
    return <div className="pt-20 text-center text-secondary">Loading meme...</div>;
  }
  if (error) {
    return (
      <div className="pt-20 text-center text-accent">
        Error loading meme: {error.message}
      </div>
    );
  }
  if (!meme) {
    return (
      <div className="pt-20 text-center text-secondary">
        Meme not found! Check the ID or try another.
      </div>
    );
  }

  const visibleComments = showAllComments ? comments : comments.slice(0, 1);

  return (
    <motion.div
      className="pt-20 pb-6 px-6 min-h-screen flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-4 text-center">{meme.name}</h1>

        <motion.img
          src={meme.url}
          alt={meme.name}
          className="w-full h-auto rounded-lg mb-4"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        />

        <div className="flex items-center gap-4 mb-4">
          <motion.button
            onClick={handleLike}
            className="text-2xl focus:outline-none"
            whileTap={{ scale: 0.9 }}
            animate={liked ? { scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            {liked ? (
              <FaHeart className="text-accent" />
            ) : (
              <FaRegHeart className="text-secondary" />
            )}
          </motion.button>
          <span className="text-secondary">{likes} Likes</span>
          <span className="text-secondary">{comments.length} Comments</span>
        </div>

        <form onSubmit={handleCommentSubmit} className="mb-6">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full p-3 border-2 border-secondary rounded-3xl bg-primary text-secondary placeholder-secondary/50 focus:outline-none focus:border-accent resize-none"
            rows="1"
          />
          <motion.button
            type="submit"
            className="mt-2 px-4 py-2 bg-accent text-black text-lg font-poppins font-medium rounded-3xl hover:bg-opacity-80"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Post Comment
          </motion.button>
        </form>

        <div className="space-y-4">
          <AnimatePresence>
            {visibleComments.map((c) => (
              <motion.div
                key={c.id}
                className="p-3 bg-secondary text-primary rounded-3xl flex justify-between items-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div>
                  <p>{c.text}</p>
                  <p className="text-sm text-secondary/70">{c.timestamp}</p>
                </div>
                <motion.button
                  onClick={() => handleDeleteComment(c.id)}
                  className={` p-3 rounded-3xl text-2xl text-accent hover:text-accent/80 ${theme === "light" ? "bg-white" : "bg-black"}  focus:outline-none`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaTrash />
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>
          {comments.length > 1 && (
            <motion.button
              onClick={() => setShowAllComments(!showAllComments)}
              className="text-accent flex border-2 border-secondary p-2 rounded-3xl mt-10 justify-self-center hover:text-accent/85 focus:outline-none"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {showAllComments ? "Hide comments" : `Show all ${comments.length} comments`}
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default MemeDetails;