import Medicine from "./pages/Medicines";
import Home from "./pages/Home";
import Footer from "./pages/Footer";
import Navbar from "./pages/Navbar.jsx";
import Login from "./pages/Login.jsx";
import Cart from "./pages/Cart.jsx";
import Register from "./pages/Register.jsx";
import { Route, Routes } from "react-router-dom";
import Doctor from "./pages/Doctor.jsx";
import UserProfile from "./pages/user/UserProfile.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-[#111920] text-white">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/medicines" element={<Medicine />} />
          <Route path="/doctors" element={<Doctor />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/userprofile" element={<UserProfile />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}