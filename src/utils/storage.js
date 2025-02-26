// Existing functions
export const getLikes = (memeId) => {
    const likes = JSON.parse(localStorage.getItem("memeLikes") || "{}");
    return likes[memeId] || 0;
  };
  
  export const setLike = (memeId, liked) => {
    const likes = JSON.parse(localStorage.getItem("memeLikes") || "{}");
    likes[memeId] = liked ? (likes[memeId] || 0) + 1 : Math.max((likes[memeId] || 0) - 1, 0);
    localStorage.setItem("memeLikes", JSON.stringify(likes));
  };
  
  export const getComments = (memeId) => {
    const comments = JSON.parse(localStorage.getItem("memeComments") || "{}");
    return comments[memeId] || [];
  };

  
  
  // export const addComment = (memeId, comment) => {
  //   const comments = JSON.parse(localStorage.getItem("memeComments") || "{}");
  //   comments[memeId] = [...(comments[memeId] || []), { text: comment, id: Date.now() }];
  //   localStorage.setItem("memeComments", JSON.stringify(comments));
  // };
  
  export const addComment = (memeId, commentObj) => {
    const comments = JSON.parse(localStorage.getItem("memeComments") || "{}");
    comments[memeId] = [...(comments[memeId] || []), { ...commentObj, id: Date.now() }];
    localStorage.setItem("memeComments", JSON.stringify(comments));
  };

  export const deleteComment = (memeId, commentId) => {
    const comments = JSON.parse(localStorage.getItem("memeComments") || "{}");
    if (comments[memeId]) {
      comments[memeId] = comments[memeId].filter((c) => c.id !== commentId);
      localStorage.setItem("memeComments", JSON.stringify(comments));
    }
    return comments[memeId] || [];
  };


  export const getProfile = () => {
    return JSON.parse(localStorage.getItem("userProfile") || '{"name": "User", "bio": "Meme lover", "avatar": "https://via.placeholder.com/150"}');
  };
  
  export const setProfile = (profile) => {
    localStorage.setItem("userProfile", JSON.stringify(profile));
  };
  
  export const getUploadedMemes = () => {
    return JSON.parse(localStorage.getItem("uploadedMemes") || "[]");
  };
  
  export const addUploadedMeme = (meme) => {
    const memes = getUploadedMemes();
    memes.push({ ...meme, id: Date.now() });
    localStorage.setItem("uploadedMemes", JSON.stringify(memes));
  };
  
  export const getLikedMemes = () => {
    const likes = JSON.parse(localStorage.getItem("memeLikes") || "{}");
    return Object.keys(likes).filter((id) => likes[id] > 0);
  };
  
  // New function for leaderboard
  export const getTopMemes = () => {
    const likes = JSON.parse(localStorage.getItem("memeLikes") || "{}");
    return Object.entries(likes)
      .map(([id, count]) => ({ id, likes: count }))
      .sort((a, b) => b.likes - a.likes)
      .slice(0, 10);
  };
  
  // Simulated user rankings (for demo purposes)
  export const getUserRankings = () => {
    const profile = getProfile();
    const uploadedCount = getUploadedMemes().length;
    const likedCount = getLikedMemes().length;
    // Fake other users for demo
    return [
      { name: profile.name, score: uploadedCount * 10 + likedCount * 5 },
      { name: "MemeLord", score: 150 },
      { name: "LaughMaster", score: 120 },
      { name: "DankKing", score: 90 },
    ].sort((a, b) => b.score - a.score);
  };


  