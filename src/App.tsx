import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Movies from "./pages/Movies";
import Watchlist from "./pages/Watchlist";
import Banner from "./components/Banner";

function App() {

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-background text-text">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<><Banner /><Movies /></>} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="*" element={<><Banner /><Movies /></>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
