
# MemeVerse

Welcome to **MemeVerse**, a multi-page, highly interactive web application where users can explore, upload, and engage with memes. Built with modern frontend technologies, this project brings the dankest corners of the internet to life with smooth animations and a user-friendly experience.

**[Live Demo](https://meme-verse-11.vercel.app)** *(Replace with your Vercel URL after deployment, e.g., `https://meme-verse-11.vercel.app`)*

---

## Features

### Core Functionalities
- **Homepage**: Displays trending memes fetched from the Imgflip API with smooth fade-in animations.
- **Meme Explorer**: Offers infinite scrolling, category filters (Trending, New, Classic, Random), and debounced search functionality.
- **Meme Upload**: Allows users to upload images (via ImgBB), add captions, generate AI-based memes (via Imgflip), and preview before submission.
- **Meme Details**: Features dynamic routing (`/meme/:id`), Instagram-style like button, comment system with delete functionality, and local storage persistence.
- **User Profile**: Shows uploaded memes, liked memes, and editable profile info (name, bio, avatar) stored locally.
- **Leaderboard**: Ranks top 10 liked memes and users based on engagement (simulated for now).
- **404 Page**: A fun, meme-based "Lost in the MemeVerse" error page with animations.

### Additional Highlights
- **Dark Mode**: Toggleable dark/light mode with a 60% primary (black/white), 30% secondary (white/black), and 10% accent (Yellow `#FFFF00`) color scheme.
- **Animations**: Powered by `Motion` for smooth transitions, hover effects, and loading states.
- **Responsive Design**: Fully mobile-friendly with a custom animated Navbar dropdown for smaller screens.

---

## Tech Stack

- **Frontend**: React (with Hooks and Components)
- **Build Tool**: Vite (fast development and optimized builds)
- **Styling**: Tailwind CSS (customized with theme colors)
- **Animations**: Motion
- **State Management**: Context API (for theme) + Local Storage (for data persistence)
- **API Handling**: React Query (for fetching and caching data)
- **APIs**:
  - **`Imgflip API`**: Fetches trending memes and generates captioned memes.
  - **`ImgBB API`**: Handles image uploads.
- **Deployment**: `Vercel` (hosting and CI/CD)

---

## Project Setup Locally

### Prerequisites
- **Node.js** (v16+ recommended): [Download](https://nodejs.org/)
- **npm**: Comes with Node.js
- **Git**: [Download](https://git-scm.com/)

### Installation
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/sahidbalwa/meme-verse.git
   cd meme-verse
   ```
   Replace `your-username` with your GitHub username.

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   - Create a `.env` file in the root directory:
     ```
     VITE_IMGBB_API_KEY=your_imgbb_api_key
     VITE_IMGFLIP_USERNAME=your_imgflip_username
     VITE_IMGFLIP_PASSWORD=your_imgflip_password
     ```
   - Get keys from [ImgBB](https://api.imgbb.com/) and [Imgflip](https://imgflip.com/api).

4. **Run Locally**:
   ```bash
   npm run dev
   ```
   - Open `http://localhost:5173` in your browser.

5. **Build for Production**:
   ```bash
   npm run build
   npm run preview
   ```

---

## Deployment to Vercel

### Steps
1. **Push to GitHub**:
   - Initialize Git (if not done):
     ```bash
     git init
     echo "node_modules\ndist\n.env" > .gitignore
     git add .
     git commit -m "Initial commit"
     ```
   - Create a GitHub repo (`meme-verse`) and push:
     ```bash
     git remote add origin https://github.com/your-username/meme-verse.git
     git branch -M main
     git push -u origin main
     ```

2. **Deploy with Vercel**:
   - **Via Dashboard**:
     - Log in to [vercel.com](https://vercel.com).
     - Click "New Project," import your `meme-verse` repo.
     - Set:
       - Framework: Vite
       - Build Command: `npm run build`
       - Output Directory: `dist`
     - Add environment variables in Vercel’s "Settings" > "Environment Variables":
       - `VITE_IMGBB_API_KEY`
       - `VITE_IMGFLIP_USERNAME`
       - `VITE_IMGFLIP_PASSWORD`
     - Click "Deploy."
   - **Via CLI**:
     ```bash
     npm install -g vercel
     vercel login
     cd meme-verse
     vercel
     vercel env add VITE_IMGBB_API_KEY
     vercel env add VITE_IMGFLIP_USERNAME
     vercel env add VITE_IMGFLIP_PASSWORD
     vercel --prod
     ```

3. **Fix Routing** (if needed):
   - Add `vercel.json` for React Router:
     ```json
     {
       "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
     }
     ```
   - Redeploy: `git add . && git commit -m "Add vercel.json" && git push && vercel --prod`.

4. **Live URL**: After deployment, Vercel provides a URL (e.g., `https://meme-verse-11.vercel.app`). Update the "Live Demo" link above.

---

## Usage
- **Home**: View trending memes.
- **Explore**: Filter and search memes with infinite scrolling.
- **Upload**: `Upload an image`, `add captions, preview, and submit.`
- **Details**: `Like` and `comment` on memes (stored locally).
- **Profile**: `Edit your profile` and `view uploaded/liked memes.`
- **Leaderboard**: `See top memes` and users.
- **Toggle Theme**: Switch between dark and light modes via the Navbar.

---

## Screenshots
*(Add screenshots of your app here after deployment, e.g., Homepage, Explorer, Upload page)*

- **Homepage**: ![Homepage](screenshots/Screenshot%202025-02-26%20225347.png)
- **Meme Explorer**: ![Explorer](screenshots/Screenshot%202025-02-26%20225714.png)
- **Upload Page**: ![Upload](screenshots/Screenshot%202025-02-26%20225741.png)
- **Profile Page**: ![Upload](screenshots/Screenshot%202025-02-26%20230124.png)
- **Meme Page**: ![Upload](screenshots/Screenshot%202025-02-26%20230044.png)
- **Leaderboard Page**: ![Upload](screenshots/Screenshot%202025-02-26%20230150.png)

---





## Contact
- **Author**: sahid balwa
- **GitHub**: [sahid balwa](https://github.com/sahidbalwa)
- **Email**: balwasahid@gmail.com

---

### Notes for Completion
- **Replace Placeholders**: Update `your-username`, `your-email@example.com`, and the live demo URL after deploying to Vercel.
- **Screenshots**: Capture images of your app (e.g., via browser tools) and place them in a `screenshots/` folder, then link them above.
- **Push to GitHub**: After adding this `README.md`:
  ```bash
  git add README.md
  git commit -m "Add README with instructions"
  git push
  ```

