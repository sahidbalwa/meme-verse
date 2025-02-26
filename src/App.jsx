import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Home from "./pages/Home";
import MemeExplorer from "./pages/MemeExplorer";
import MemeUpload from "./pages/MemeUpload";
import MemeDetails from "./pages/MemeDetails";
import Profile from "./pages/Profile";
import Leaderboard from "./pages/Leaderboard";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ErrorBoundary from "./components/ErrorBoundary";

const queryClient = new QueryClient();

function App() {
  return (
    <AppProvider>
      <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Navbar />
        <ErrorBoundary />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<MemeExplorer />} />
          <Route path="/upload" element={<MemeUpload />} />
          <Route path="/meme/:id" element={<MemeDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      </QueryClientProvider>
    </AppProvider>
  );
}

export default App;