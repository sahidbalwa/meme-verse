import { motion } from "motion/react"
import { useQuery } from "@tanstack/react-query";
import { fetchTrendingMemes } from "../api/imgflip";
import MemeCard from "../components/MemeCard";
import DarkModeToggle from "../components/common/DarkModeToggle";
import Loader from "../components/common/Loader";
import FullScreenLoader from "../components/FullScreenLoader"; 
import { useEffect, useState } from "react";

function Home() {

  const [showFullScreenLoader, setShowFullScreenLoader] = useState(true);

  const { data, isLoading , error} = useQuery({
    queryKey: ["trendingMemes"],
    queryFn: fetchTrendingMemes,
  });

  useEffect(() => {
    // Show loader for 2.5 seconds
    const timer = setTimeout(() => setShowFullScreenLoader(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  // If still showing the full-screen loader, don’t render the content yet
  if (showFullScreenLoader) {
    return <FullScreenLoader />;
  }

  // After loader, render the page content

  return (
    <>
    <div className="min-h-screen p-6 flex flex-col items-center">
      {/* <div className="flex justify-between items-center w-full max-w-4xl mb-6">
        <motion.h1
          className="text-4xl font-bold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          MemeVerse
        </motion.h1>
        <DarkModeToggle />
      </div> */}

      <h2 className="text-3xl font-semibold mb-4 mt-16 font-poppins ">Trending Memes</h2>

      {isLoading ? (
        <Loader /> // Uses the existing funny Trollface loader
      ) : error ? (
        <p className="text-red-500">Oops! Something went wrong.</p>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {data?.memes.slice(0, 9).map((meme) => (
            <MemeCard key={meme.id} meme={meme} />
          ))}
        </motion.div>
      )}
    </div>
  </>
  );
}

export default Home;