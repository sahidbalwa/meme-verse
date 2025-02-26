import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTrendingMemes } from "../api/imgflip";
import { getProfile, setProfile, getUploadedMemes, getLikedMemes } from "../utils/storage";
import { motion } from "motion/react";
import { toast } from "react-hot-toast";
import MemeCard from "../components/MemeCard";

function Profile() {
  const [profile, setProfileState] = useState(getProfile());
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(profile.name);
  const [bio, setBio] = useState(profile.bio);
  const [avatar, setAvatar] = useState(profile.avatar);
  const uploadedMemes = getUploadedMemes();

  const { data } = useQuery({
    queryKey: ["memes"],
    queryFn: fetchTrendingMemes,
  });

  const likedMemeIds = getLikedMemes();
  const likedMemes = data?.memes.filter((meme) => likedMemeIds.includes(meme.id)) || [];

  const handleSave = () => {
    const newProfile = { name, bio, avatar };
    setProfile(newProfile);
    setProfileState(newProfile);
    setIsEditing(false);
    toast.success("Profile updated!");
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatar(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div
      className="pt-20 pb-6 px-6 min-h-screen flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">Your Profile</h1>

        <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
          <motion.img
            src={avatar}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          />
          {isEditing ? (
            <div className="flex-1 space-y-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border border-secondary rounded bg-primary text-secondary"
              />
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full p-2 border border-secondary rounded bg-primary text-secondary"
                rows="3"
              />
              <input type="file" accept="image/*" onChange={handleAvatarUpload} className="mb-2" />
              <div className="flex gap-4">
                <motion.button
                  onClick={handleSave}
                  className="px-4 py-2 bg-accent text-black rounded hover:bg-opacity-80"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Save
                </motion.button>
                <motion.button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-primary text-secondary border border-secondary rounded hover:bg-secondary hover:text-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancel
                </motion.button>
              </div>
            </div>
          ) : (
            <div className="flex-1">
              <h2 className="text-2xl font-semibold">{profile.name}</h2>
              <p className="text-secondary/80">{profile.bio}</p>
              <motion.button
                onClick={() => setIsEditing(true)}
                className="mt-2 px-4 py-2 bg-accent text-black rounded hover:bg-opacity-80"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Edit Profile
              </motion.button>
            </div>
          )}
        </div>

        <h3 className="text-2xl font-semibold mb-4">Uploaded Memes</h3>
        {uploadedMemes.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
          >
            {uploadedMemes.map((meme) => (
              <motion.div
                key={meme.id}
                className="rounded-lg overflow-hidden shadow-lg bg-secondary text-primary"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img src={meme.url} alt="Uploaded Meme" className="w-full h-48 object-cover" />
                <div className="p-4">
                  <p>{meme.captionTop}</p>
                  <p>{meme.captionBottom}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p>No memes uploaded yet!</p>
        )}

        <h3 className="text-2xl font-semibold mt-8 mb-4">Liked Memes</h3>
        {likedMemes.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
          >
            {likedMemes.map((meme) => (
              <MemeCard key={meme.id} meme={meme} />
            ))}
          </motion.div>
        ) : (
          <p>No liked memes yet!</p>
        )}
      </div>
    </motion.div>
  );
}

export default Profile;