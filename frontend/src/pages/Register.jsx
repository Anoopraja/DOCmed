import api from "../../api/api.js";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  HeartPulse,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Stethoscope,
  UserPlus,
} from "lucide-react";

export default function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/user/register", {
        username: formData.username,
        gmail: formData.email, // email -> gmail (backend yahi naam maangta hai)
        password: formData.password,
      });

      console.log(response.data);
      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#101713] text-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 overflow-hidden rounded-3xl border border-white/10 bg-[#18221c] shadow-2xl">
        {/* LEFT SIDE */}
        <div className="hidden lg:flex flex-col justify-between p-12 bg-[#1d2b22] relative overflow-hidden">
          <div className="absolute w-80 h-80 bg-green-500/10 blur-[100px] rounded-full -top-20 -left-20" />

          {/* Logo */}
          <Link to="/" className="relative flex items-center gap-3">
            <div className="bg-[#b5f36d] p-2.5 rounded-xl text-[#152019]">
              <HeartPulse size={28} />
            </div>
            <span className="text-2xl font-bold">
              DOC<span className="text-[#b5f36d]">med</span>
            </span>
          </Link>

          {/* Content */}
          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-green-300">
              <span className="w-2 h-2 rounded-full bg-green-400" />
              Join DOCmed Community
            </span>

            <h1 className="text-5xl font-bold leading-tight mt-8">
              Better care,
              <br />
              better <span className="text-[#b5f36d]">health.</span>
              <br />
              Starts here.
            </h1>

            <p className="text-gray-400 mt-6 leading-7 max-w-md">
              Create your account and experience convenient healthcare. Find
              medicines, connect with doctors and manage your health from one
              place.
            </p>

            {/* Features */}
            <div className="space-y-5 mt-12">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/5 rounded-xl">
                  <UserPlus className="text-[#b5f36d]" size={23} />
                </div>
                <div>
                  <p className="font-semibold">Easy Registration</p>
                  <p className="text-sm text-gray-500">
                    Get started in just a few steps.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/5 rounded-xl">
                  <Stethoscope className="text-orange-400" size={23} />
                </div>
                <div>
                  <p className="font-semibold">Healthcare Access</p>
                  <p className="text-sm text-gray-500">
                    Medicines and doctor consultations.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/5 rounded-xl">
                  <ShieldCheck className="text-[#b5f36d]" size={23} />
                </div>
                <div>
                  <p className="font-semibold">Secure Account</p>
                  <p className="text-sm text-gray-500">
                    Your account and information matter.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p className="relative text-gray-500 text-sm">
            Your Health, Our Priority.
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col justify-center p-7 sm:p-12 lg:p-14">
          {/* Mobile Logo */}
          <Link to="/" className="flex lg:hidden items-center gap-2 mb-8">
            <div className="bg-[#b5f36d] p-2 rounded-xl text-[#152019]">
              <HeartPulse size={25} />
            </div>
            <span className="text-2xl font-bold">
              DOC<span className="text-[#b5f36d]">med</span>
            </span>
          </Link>

          <div className="max-w-md w-full mx-auto">
            {/* Heading */}
            <div className="mb-7">
              <span className="text-orange-400 text-sm font-semibold uppercase tracking-widest">
                Get Started
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold mt-3">
                Create Account
              </h2>
              <p className="text-gray-400 mt-3 text-sm">
                Join DOCmed and take control of your healthcare.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter your username"
                  required
                  className="w-full bg-[#101713] border border-white/10 rounded-xl py-3.5 px-4 outline-none focus:border-[#b5f36d] transition"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    className="w-full bg-[#101713] border border-white/10 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:border-[#b5f36d] transition"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Password
                </label>
                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    minLength={8}
                    required
                    className="w-full bg-[#101713] border border-white/10 rounded-xl py-3.5 pl-12 pr-12 outline-none focus:border-[#b5f36d] transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <p className="text-red-400 text-sm bg-red-400/10 p-3 rounded-lg">
                  {error}
                </p>
              )}

              {/* Terms */}
              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  className="accent-[#b5f36d] mt-1"
                />
                <label htmlFor="terms" className="text-xs text-gray-400 leading-5">
                  I agree to the{" "}
                  <Link to="/terms" className="text-[#b5f36d]">
                    Terms &amp; Conditions
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-[#b5f36d]">
                    Privacy Policy
                  </Link>
                  .
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-[#b5f36d] hover:bg-[#a2df5c] text-[#152019] font-bold py-4 rounded-xl transition duration-300 shadow-lg shadow-green-900/20 disabled:opacity-50"
              >
                {loading ? "Creating Account..." : "Create Account"}
                {!loading && <ArrowRight size={19} />}
              </button>
            </form>

            {/* Login */}
            <div className="text-center mt-7">
              <p className="text-sm text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-[#b5f36d] font-semibold hover:text-orange-400 transition"
                >
                  Sign In
                </Link>
              </p>
            </div>

            {/* Footer */}
            <div className="border-t border-white/10 mt-8 pt-5">
              <p className="text-center text-gray-600 text-xs">
                © {new Date().getFullYear()} DOCmed. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}