
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Pill,
  UserRound,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (
      !formData.username.trim() ||
      !formData.email.trim() ||
      !formData.password
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username.trim(),
          email: formData.email.trim(),
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed.");
      }

      setSuccess("Account created successfully!");

      setFormData({
        username: "",
        email: "",
        password: "",
      });

      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-green-50/70 px-4 py-12 sm:px-6">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-green-100 bg-white shadow-xl shadow-green-900/5 md:grid-cols-2">
        {/* Left section */}
        <section className="relative hidden flex-col justify-between overflow-hidden bg-green-700 p-10 text-white md:flex lg:p-12">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-green-500/40" />
          <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-green-400/20" />

          <div className="relative z-10">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-green-700">
                <Pill size={27} />
              </div>
              <span className="text-2xl font-extrabold tracking-tight">
                DOC<span className="text-green-200">med</span>
              </span>
            </Link>

            <div className="mt-20">
              <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm text-green-50">
                <CheckCircle2 size={16} />
                Your health, our priority
              </p>

              <h1 className="text-4xl font-bold leading-tight lg:text-5xl">
                Better health starts with you.
              </h1>

              <p className="mt-5 max-w-sm text-base leading-7 text-green-100">
                Create your account to explore healthcare essentials and
                manage your shopping in one place.
              </p>
            </div>
          </div>

          <p className="relative z-10 text-sm text-green-100/80">
            Your trusted healthcare companion.
          </p>
        </section>

        {/* Registration form */}
        <section className="p-6 sm:p-10 lg:p-12">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-lg font-extrabold text-green-800 md:hidden"
          >
            <Pill size={25} className="text-green-600" />
            DOC<span className="text-green-500">med</span>
          </Link>

          <div className="mb-8">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-green-600">
              Get started today
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Create account
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Enter your details below to create your DOCmed account.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Username
              </label>

              <div className="flex items-center rounded-xl border border-gray-200 bg-gray-50 transition focus-within:border-green-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-green-100">
                <UserRound
                  size={19}
                  className="ml-4 shrink-0 text-green-600"
                />

                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent px-3 py-3.5 text-sm text-gray-900 outline-none placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Email address
              </label>

              <div className="flex items-center rounded-xl border border-gray-200 bg-gray-50 transition focus-within:border-green-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-green-100">
                <Mail size={19} className="ml-4 shrink-0 text-green-600" />

                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent px-3 py-3.5 text-sm text-gray-900 outline-none placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Password
              </label>

              <div className="flex items-center rounded-xl border border-gray-200 bg-gray-50 transition focus-within:border-green-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-green-100">
                <LockKeyhole
                  size={19}
                  className="ml-4 shrink-0 text-green-600"
                />

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Minimum 8 characters"
                  value={formData.password}
                  onChange={handleChange}
                  minLength={8}
                  required
                  className="w-full min-w-0 bg-transparent px-3 py-3.5 text-sm text-gray-900 outline-none placeholder:text-gray-400"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="mr-3 rounded-lg p-1.5 text-gray-500 transition hover:bg-green-100 hover:text-green-700"
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </div>

            {/* Error / Success messages */}
            {error && (
              <p
                role="alert"
                className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600"
              >
                {error}
              </p>
            )}

            {success && (
              <p
                role="status"
                className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
              >
                {success}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-700 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-green-700/15 transition hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Create account"}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-bold text-green-700 transition hover:text-green-900 hover:underline"
            >
              Login
            </Link>
          </p>

          <p className="mt-8 text-center text-xs leading-5 text-gray-400">
            By creating an account, you agree to our Terms of Service and
            Privacy Policy.
          </p>
        </section>
      </div>
    </main>
  );
}
