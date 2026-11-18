import Navbar from "./pages/Navbar.jsx";
import Medicines from "./pages/Medicine.jsx";
import Home from "./pages/Home.jsx";
import Footer from "./pages/Footer.jsx";
import { Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <div className="min-h-screen bg-[#111920] text-white">
      <Navbar />

      {/* <main> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/medicines" element={<Medicines />} />
        </Routes>
      {/* </main> */}

      <Footer />
    </div>
  );
}
