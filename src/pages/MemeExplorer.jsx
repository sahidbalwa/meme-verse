import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchMemes } from "../api/imgflip";
import MemeCard from "../components/MemeCard";
import Loader from "../components/common/Loader";
import { debounce } from "../utils/debounce";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // Added icons

function MemeExplorer() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Trending");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { data, fetchNextPage, hasNextPage, isFetching, isLoading } = useInfiniteQuery({
    queryKey: ["memes", category, search],
    queryFn: ({ pageParam = 1 }) => fetchMemes({ page: pageParam, search, category }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  const handleSearch = debounce((value) => setSearch(value), 500);

  const categories = ["Trending", "New", "Classic", "Random"];

  // Dropdown animations
  const dropdownVariants = {
    hidden: { opacity: 0, scaleY: 0, originY: 0 },
    visible: { opacity: 1, scaleY: 1, originY: 0, transition: { duration: 0.2 } },
  };

  const optionVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="pt-20 pb-6 px-6 min-h-screen flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">Explore Memes</h1>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="text"
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search memes..."
            className="flex-1 p-2 border-2 border-secondary rounded bg-primary text-secondary placeholder-secondary/50 focus:outline-none focus:border-gray-950"
          />
          <div className="relative w-32"> {/* Fixed width based on "Trending" */}
            <motion.button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="p-2 border border-secondary rounded bg-primary text-secondary focus:outline-none focus:border-gray-700 hover:bg-secondary/10 w-full flex justify-between items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>{category}</span>
              <motion.span
                animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {isDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
              </motion.span>
            </motion.button>
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.ul
                  className="absolute top-full left-0 mt-1 w-full bg-primary border border-secondary rounded shadow-lg z-10"
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  {categories.map((cat) => (
                    <motion.li
                      key={cat}
                      variants={optionVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ duration: 0.2, delay: categories.indexOf(cat) * 0.05 }}
                      className="p-2 text-secondary hover:bg-blue-950 hover:text-white cursor-pointer"
                      onClick={() => {
                        setCategory(cat);
                        setIsDropdownOpen(false);
                      }}
                    >
                      {cat}
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </div>

        {isLoading ? (
          <Loader />
        ) : (
          <>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
            >
              {data?.pages.map((page, i) =>
                page.memes.map((meme) => <MemeCard key={`${i}-${meme.id}`} meme={meme} />)
              )}
            </motion.div>

            {hasNextPage && (
              <motion.button
                onClick={() => fetchNextPage()}
                disabled={isFetching}
                className="mt-6 px-4 py-2 bg-accent text-black rounded hover:bg-opacity-80 disabled:opacity-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isFetching ? "Loading..." : "Load More"}
              </motion.button>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
}

export default MemeExplorer;