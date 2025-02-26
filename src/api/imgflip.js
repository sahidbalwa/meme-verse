import axios from "axios";

export const fetchTrendingMemes = async () => {
  const response = await axios.get("https://api.imgflip.com/get_memes");
  return response.data.data; // { memes: [...] }
};

export const fetchMemes = async ({ page = 1, search = "", category = "Trending" }) => {
  const response = await axios.get("https://api.imgflip.com/get_memes");
  let memes = response.data.data.memes;

  if (search) {
    memes = memes.filter((meme) => meme.name.toLowerCase().includes(search.toLowerCase()));
  }
  if (category === "New") memes.sort((a, b) => b.id - a.id);
  if (category === "Classic") memes.sort((a, b) => a.id - b.id);
  if (category === "Random") memes.sort(() => Math.random() - 0.5);

  const pageSize = 9;
  const start = (page - 1) * pageSize;
  const paginatedMemes = memes.slice(start, start + pageSize);

  return {
    memes: paginatedMemes,
    nextPage: paginatedMemes.length === pageSize ? page + 1 : undefined,
  };
};

// New function to generate a meme with a caption
export const generateMeme = async ({ templateId, text0, text1 }) => {
  const username = import.meta.env.VITE_IMGFLIP_USERNAME; // Replace with your Imgflip username
  const password = import.meta.env.VITE_IMGFLIP_PASSWORD; // Replace with your Imgflip password
  const response = await axios.post(
    "https://api.imgflip.com/caption_image",
    new URLSearchParams({
      template_id: templateId,
      username: username,
      password: password,
      text0: text0, // Top text
      text1: text1, // Bottom text
    }),
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }
  );
  return response.data.data.url; // Returns the generated meme URL
};