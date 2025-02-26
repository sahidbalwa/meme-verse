import { useState, useRef } from "react"; // Added useRef
import { uploadImage } from "../api/imgbb";
import { generateMeme } from "../api/imgflip";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { addUploadedMeme } from "../utils/storage";

function MemeUpload() {
  const [image, setImage] = useState(null);
  const [captionTop, setCaptionTop] = useState("");
  const [captionBottom, setCaptionBottom] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null); // Ref to access input directly

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    try {
      const uploadedUrl = await uploadImage(file);
      setImage(uploadedUrl);
      setPreviewUrl(uploadedUrl);
    } catch (error) {
      toast.error("Upload failed!");
    }
  };

  const suggestCaption = () => {
    const suggestions = ["LOL", "WTF", "Epic Fail", "Bruh"];
    setCaptionTop(suggestions[Math.floor(Math.random() * suggestions.length)]);
    setCaptionBottom("MemeVerse Rocks!");
  };

  const generatePreview = async () => {
    if (!image) return;
    try {
      const memeUrl = await generateMeme({
        templateId: "112126428",
        text0: captionTop || "TOP TEXT",
        text1: captionBottom || "BOTTOM TEXT",
      });
      setPreviewUrl(memeUrl);
      toast.success("Preview generated!");
    } catch (error) {
      toast.error("Failed to generate meme!");
    }
  };

  const submitMeme = () => {
    if (previewUrl) {
      addUploadedMeme({ url: previewUrl, captionTop, captionBottom });
      toast.success("Meme uploaded!");
      setImage(null);
      setPreviewUrl(null);
      setCaptionTop("");
      setCaptionBottom("");
    }
  };

  // Function to trigger file input click
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <motion.div
      className="pt-20 pb-6 px-6 min-h-screen flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">Upload a Meme</h1>

        {/* Custom File Input */}
        <div className="mb-4 w-full">
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
            id="file-upload"
            ref={fileInputRef} // Attach ref
          />
          <motion.button
            onClick={handleButtonClick} // Trigger input click
            className="w-full p-2 border border-secondary rounded bg-primary text-secondary hover:bg-secondary/10 focus:outline-none focus:border-accent flex items-center justify-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Choose File</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16V4m0 12l-4-4m4 4l4-4m6 4v-6a2 2 0 00-2-2h-6m-2 8h10a2 2 0 002-2v-6"
              />
            </svg>
          </motion.button>
        </div>

        {previewUrl && (
          <motion.img
            src={previewUrl}
            alt="Meme Preview"
            className="max-w-full h-auto mb-4 rounded"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}
        <div className="space-y-4">
          <input
            type="text"
            value={captionTop}
            onChange={(e) => setCaptionTop(e.target.value)}
            placeholder="Top Caption"
            className="w-full p-2 border border-secondary rounded bg-primary text-secondary placeholder-secondary/50"
          />
          <input
            type="text"
            value={captionBottom}
            onChange={(e) => setCaptionBottom(e.target.value)}
            placeholder="Bottom Caption"
            className="w-full p-2 border border-secondary rounded bg-primary text-secondary placeholder-secondary/50"
          />
        </div>
        <div className="mt-4 flex gap-4">
          <motion.button
            onClick={suggestCaption}
            className="px-4 py-2 bg-accent text-black rounded hover:bg-opacity-80"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Suggest Caption
          </motion.button>
          <motion.button
            onClick={generatePreview}
            className="px-4 py-2 bg-primary text-secondary border border-secondary rounded hover:bg-secondary hover:text-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Generate Preview
          </motion.button>
          <motion.button
            onClick={submitMeme}
            disabled={!previewUrl}
            className="px-4 py-2 bg-accent text-black rounded hover:bg-opacity-80 disabled:opacity-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Upload Meme
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default MemeUpload;