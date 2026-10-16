
"use client";

import Link from "next/link";
import { useState } from "react";
import AuthButton from "@/app/api/auth/authButton.js";
import RegisterLink from "@/app/api/auth/register/registerButton";
import {
    Menu,
    X,
    ShoppingCart,
    UserRound,
    Pill,
    Search,
} from "lucide-react";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Medicines", href: "/medicines" },
    { name: "Categories", href: "/categories" },
    { name: "About Us", href: "/about" },
];

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="sticky top-0 z-50 border-b border-green-100 bg-white/95 backdrop-blur">
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-600 text-white">
                        <Pill size={23} />
                    </div>

                    <div>
                        <h1 className="text-xl font-extrabold tracking-tight text-green-800">
                            DOC<span className="text-green-500">med</span>
                        </h1>
                        <p className="text-[10px] font-medium text-gray-500">
                            Healthcare made simple
                        </p>
                    </div>
                </Link>

                {/* Desktop links */}
                <div className="hidden items-center gap-7 md:flex">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium text-gray-600 transition hover:text-green-700"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Search and actions */}
                <div className="hidden items-center gap-3 md:flex">
                    <Link
                        href="/search"
                        aria-label="Search"
                        className="rounded-xl bg-green-50 p-2.5 text-green-800 transition hover:bg-green-100"
                    >
                        <Search size={20} />
                    </Link>

                    <Link
                        href="/cart"
                        aria-label="Shopping cart"
                        className="rounded-xl bg-green-50 p-2.5 text-green-800 transition hover:bg-green-100"
                    >
                        <ShoppingCart size={20} />
                    </Link>

                    <div
                        className="inline-flex items-center justify-center rounded-xl bg-green-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-green-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                        {/* <UserRound size={18} /> */}
                        <AuthButton />
                    </div>

                    <div
                        className="inline-flex items-center justify-center rounded-xl bg-green-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-green-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                        <RegisterLink />
                    </div>
                </div>

                {/* Mobile menu button */}
                <button
                    type="button"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={menuOpen}
                    className="rounded-lg bg-green-50 p-2 text-green-800 md:hidden"
                >
                    {menuOpen ? <X size={23} /> : <Menu size={23} />}
                </button>
            </nav>

            {/* Mobile menu */}
            {menuOpen && (
                <div className="border-t border-green-100 bg-white px-4 py-4 md:hidden">
                    <div className="flex flex-col gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMenuOpen(false)}
                                className="rounded-lg px-3 py-3 text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-green-800"
                            >
                                {link.name}
                            </Link>
                        ))}

                        <div className="mt-2 grid grid-cols-2 gap-3">
                            <Link
                                href="/cart"
                                onClick={() => setMenuOpen(false)}
                                className="flex items-center justify-center gap-2 rounded-xl bg-green-50 px-3 py-3 text-sm font-semibold text-green-800"
                            >
                                <ShoppingCart size={18} />
                                Cart
                            </Link>


                            <div className="inline-flex items-center justify-center rounded-xl bg-green-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-green-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                                <AuthButton />
                            </div>
                            <div className="inline-flex items-center justify-center rounded-xl bg-green-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-green-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                                <RegisterLink />
                            </div>


                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
