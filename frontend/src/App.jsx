import Navbar from "./pages/Navbar";
import Medicines from "./pages/Medicines";
import Home from "./pages/Home";
import Footer from "./pages/Footer";
import { Navigate, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <div className="min-h-screen bg-[#111920] text-white">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/medicines" element={<Medicines />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />
    </div>
  );
}
