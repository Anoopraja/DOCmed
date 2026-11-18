import Medicine from "./pages/Medicines";
import Home from "./pages/Home";
import Footer from "./pages/Footer";
import Navbar from "./pages/Navbar.jsx";
import { Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <div className="min-h-screen bg-[#111920] text-white">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/medicines" element={<Medicine />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
