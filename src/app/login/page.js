"use client";

import { useState } from "react";
import { Pill, UserRound, LockKeyhole, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        if (!formData.username.trim() || !formData.password) {
            setError("Please enter your username and password.");
            return;
        }

        setLoading(true);

        try {
            // Replace this demo with your Next.js login API endpoint.
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                }, 
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Login failed");
                return;
            }

            // Login successful
            console.log(data);
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-blue-50 px-4 py-10">
            <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-lg sm:p-9">
                {/* Logo */}
                <Link href="/" className="mb-8 flex items-center justify-center gap-2">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
                        <Pill size={27} />
                    </span>

                    <span className="text-3xl font-extrabold text-slate-900">
                        DOC<span className="text-blue-600">med</span>
                    </span>
                </Link>

                <div className="mb-7 text-center">
                    <h1 className="text-2xl font-extrabold text-slate-900">
                        Welcome Back!
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        Login to your DOCmed account
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Username */}
                    <div>
                        <label
                            htmlFor="username"
                            className="mb-2 block text-sm font-semibold text-slate-700"
                        >
                            Username
                        </label>

                        <div className="flex items-center rounded-lg border border-slate-300 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100">
                            <UserRound className="ml-3 text-slate-400" size={20} />

                            <input
                                id="username"
                                name="username"
                                type="text"
                                autoComplete="username"
                                placeholder="Enter your username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                                className="w-full rounded-lg px-3 py-3 text-sm outline-none"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label
                            htmlFor="password"
                            className="mb-2 block text-sm font-semibold text-slate-700"
                        >
                            Password
                        </label>

                        <div className="flex items-center rounded-lg border border-slate-300 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100">
                            <LockKeyhole className="ml-3 text-slate-400" size={20} />

                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                autoComplete="current-password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full rounded-lg px-3 py-3 text-sm outline-none"
                            />

                            <button
                                type="button"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                                onClick={() => setShowPassword((previous) => !previous)}
                                className="mr-3 text-slate-500 hover:text-blue-600"
                            >
                                {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <Link
                            href="/forgot-password"
                            className="text-sm font-semibold text-blue-600 hover:underline"
                        >
                            Forgot Password?
                        </Link>
                    </div>

                    {error && (
                        <p
                            role="alert"
                            className="rounded-lg bg-red-50 p-3 text-sm text-red-600"
                        >
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-blue-600 py-3 font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-slate-600">
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/signup"
                        className="font-bold text-blue-600 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>

                <p className="mt-7 text-center text-xs text-slate-400">
                    © 2026 DOCmed. All rights reserved.
                </p>
            </div>
        </main>
    );
}