import api from "../../api/api.js"
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  HeartPulse,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  Stethoscope,
  ShoppingBag,
  Truck,
} from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user",
    remember: false,

  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      const loginPath =
        formData.role === "shopowner" ? "/shopowner/login" : "/user/login";

      const response = await api.post(loginPath, {
        gmail: formData.email,   // map email -> gmail
        password: formData.password,
      });

      console.log(response.data);

      // Adjust to whatever your backend returns
      if (response.data.token) {
        const storage = formData.remember ? localStorage : sessionStorage;
        storage.setItem("token", response.data.token);
      }

      navigate(formData.role === "shopowner" ? "/shopowerprofile" : "/userprofile");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="min-h-screen bg-[#101713] text-white flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-6xl grid lg:grid-cols-2 overflow-hidden rounded-3xl border border-white/10 bg-[#18221c] shadow-2xl">

        {/* LEFT SIDE */}
        <div className="relative hidden lg:flex flex-col justify-between p-12 overflow-hidden bg-[#1d2b22]">

          <div className="absolute w-80 h-80 bg-green-500/10 blur-[100px] rounded-full -top-20 -left-20" />

          {/* Logo */}
          <Link to="/" className="relative flex items-center gap-3">
            <div className="bg-[#b5f36d] p-2.5 rounded-xl text-[#152019]">
              <HeartPulse size={28} />
            </div>

            <span className="text-2xl font-bold tracking-tight">
              DOC<span className="text-[#b5f36d]">med</span>
            </span>
          </Link>

          {/* Content */}
          <div className="relative z-10">

            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-green-300">
              <span className="w-2 h-2 rounded-full bg-green-400" />
              Your Health, Our Priority
            </span>

            <h1 className="text-5xl font-bold leading-tight mt-8">
              Healthcare
              <br />
              made <span className="text-[#b5f36d]">simple.</span>
              <br />
              Life made better.
            </h1>

            <p className="text-gray-400 mt-6 leading-7 max-w-md">
              Order medicines, consult trusted doctors and get healthcare
              essentials delivered right to your doorstep.
            </p>

            {/* Services */}
            <div className="grid grid-cols-3 gap-3 mt-12">

              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <ShoppingBag className="text-[#b5f36d] mb-3" size={24} />
                <p className="text-sm font-semibold">Medicines</p>
                <p className="text-xs text-gray-500 mt-1">Easy ordering</p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <Stethoscope className="text-orange-400 mb-3" size={24} />
                <p className="text-sm font-semibold">Doctors</p>
                <p className="text-xs text-gray-500 mt-1">Expert care</p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <Truck className="text-[#b5f36d] mb-3" size={24} />
                <p className="text-sm font-semibold">Delivery</p>
                <p className="text-xs text-gray-500 mt-1">At your door</p>
              </div>

            </div>
          </div>

          <div className="relative flex items-center gap-2 text-gray-500 text-sm">
            <ShieldCheck size={18} className="text-[#b5f36d]" />
            Healthcare you can trust.
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col justify-center p-7 sm:p-12 lg:p-14">

          {/* Mobile Logo */}
          <Link to="/" className="flex lg:hidden items-center gap-2 mb-12">
            <div className="bg-[#b5f36d] p-2 rounded-xl text-[#152019]">
              <HeartPulse size={25} />
            </div>
            <span className="text-2xl font-bold">
              DOC<span className="text-[#b5f36d]">med</span>
            </span>
          </Link>

          <div className="max-w-md w-full mx-auto">

            <div className="mb-9">
              <span className="text-orange-400 text-sm font-semibold uppercase tracking-widest">
                Welcome Back
              </span>

              <h2 className="text-3xl sm:text-4xl font-bold mt-3">
                Sign in to your account
              </h2>

              <p className="text-gray-400 mt-3 text-sm">
                Access your medicines, appointments and orders.
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                  />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    className="w-full bg-[#101713] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-gray-600 outline-none focus:border-[#b5f36d] transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Sign In As
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full bg-[#101713] border border-white/10 rounded-xl py-4 px-4 text-white outline-none focus:border-[#b5f36d] transition cursor-pointer"
                >
                  <option value="user">User</option>
                  <option value="shopowner">Shop Owner</option>
                </select>
              </div>

              {/* Password */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-gray-300">
                    Password
                  </label>

                  <Link
                    to="/forgot-password"
                    className="text-xs text-[#b5f36d] hover:text-orange-400 transition"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <div className="relative">
                  <Lock
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                    className="w-full bg-[#101713] border border-white/10 rounded-xl py-4 pl-12 pr-12 text-white placeholder:text-gray-600 outline-none focus:border-[#b5f36d] transition"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                  id="remember"
                  className="accent-[#b5f36d] w-4 h-4"
                />

                <label htmlFor="remember" className="text-sm text-gray-400">
                  Remember me
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-[#b5f36d] hover:bg-[#a2df5c] text-[#152019] font-bold py-4 rounded-xl transition duration-300 shadow-lg shadow-green-900/20 disabled:opacity-50"
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
              {error && (
                <p className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                  {error}
                </p>
              )}

            </form>

            {/* Signup */}
            <div className="text-center mt-8">
              <p className="text-sm text-gray-400">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-[#b5f36d] font-semibold hover:text-orange-400 transition"
                >
                  Create Account
                </Link>
              </p>
            </div>

            {/* Footer */}
            <div className="border-t border-white/10 mt-10 pt-6">
              <div className="flex items-center justify-center gap-2 text-gray-500 text-xs">
                <ShieldCheck size={15} className="text-[#b5f36d]" />
                Your health information deserves privacy.
              </div>

              <p className="text-center text-gray-600 text-xs mt-4">
                © {new Date().getFullYear()} DOCmed. All rights reserved.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
