
"use client";

import Link from "next/link";
import { useState } from "react";
// import {
//   Pill,
//   Mail,
//   Phone,
//   MapPin,
//   Instagram,
// //   Facebook,
//   Linkedin,
//   ArrowRight,
//   Heart,
// } from "lucide-react";

const shopLinks = [
    { name: "All Products", href: "/products" },
    { name: "Categories", href: "/categories" },
    { name: "My Cart", href: "/cart" },
    { name: "My Orders", href: "/orders" },
];

const supportLinks = [
    { name: "Contact Us", href: "/contact" },
    { name: "FAQs", href: "/faq" },
    { name: "Shipping Policy", href: "/shipping-policy" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms & Conditions", href: "/terms" },
];

export default function Footer() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    function handleSubscribe(e) {
        e.preventDefault();

        if (!email.trim()) return;

        // Connect this form to your newsletter API.
        setMessage("Newsletter API integration is not configured yet.");
    }

    return (
        <footer className="border-t border-slate-200 bg-white text-slate-600">
            {/* Main footer */}
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">

                {/* Brand */}
                <div>
                    <Link href="/" className="mb-5 inline-flex items-center gap-2">
                        <span className="rounded-xl bg-blue-600 p-2 text-white">
                            {/* <Pill size={25} /> */}
                        </span>

                        <span className="text-2xl font-bold tracking-tight text-slate-900">
                            DOC<span className="text-blue-600">med</span>
                        </span>
                    </Link>

                    <p className="max-w-xs text-sm leading-7 text-slate-500">
                        Your trusted destination for healthcare essentials.
                        Discover healthcare products with a simple and convenient
                        online shopping experience.
                    </p>

                    <div className="mt-5 flex items-center gap-3">
                        <a
                            href="https://www.instagram.com/"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Instagram"
                            className="rounded-lg border border-slate-200 p-2.5 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                        >
                            {/* <Instagram size={18} /> */}
                        </a>

                        <a
                            href="https://www.facebook.com/"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Facebook"
                            className="rounded-lg border border-slate-200 p-2.5 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                        >
                            {/* <Facebook size={18} /> */}
                        </a>

                        <a
                            href="https://www.linkedin.com/"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="LinkedIn"
                            className="rounded-lg border border-slate-200 p-2.5 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                        >
                            {/* <Linkedin size={18} /> */}
                        </a>
                    </div>
                </div>

                {/* Shopping */}
                <div>
                    <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-slate-900">
                        Shop
                    </h3>

                    <ul className="space-y-3">
                        {shopLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className="text-sm transition hover:text-blue-600"
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Support */}
                <div>
                    <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-slate-900">
                        Customer Support
                    </h3>

                    <ul className="space-y-3">
                        {supportLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className="text-sm transition hover:text-blue-600"
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-5 space-y-3 text-sm">
                        <a
                            href="mailto:support@docmed.example"
                            className="flex items-center gap-2 hover:text-blue-600"
                        >
                            {/* <Mail size={16} /> */}
                            Contact support
                        </a>

                        <div className="flex items-center gap-2 text-slate-500">
                            {/* <Phone size={16} /> */}
                            Customer care
                        </div>

                        <div className="flex items-center gap-2 text-slate-500">
                            {/* <MapPin size={16} /> */}
                            Online healthcare store
                        </div>
                    </div>
                </div>

                {/* Newsletter */}
                <div>
                    <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-900">
                        Stay Updated
                    </h3>

                    <p className="mb-5 text-sm leading-6 text-slate-500">
                        Get updates about new products, offers, and healthcare essentials.
                    </p>

                    <form onSubmit={handleSubscribe} className="space-y-3">
                        <label htmlFor="newsletter-email" className="sr-only">
                            Email address
                        </label>

                        <input
                            id="newsletter-email"
                            type="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setMessage("");
                            }}
                            placeholder="Enter your email"
                            required
                            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />

                        <button
                            type="submit"
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                        >
                            Subscribe
                            {/* <ArrowRight size={17} /> */}
                        </button>

                        {message && (
                            <p role="status" className="text-xs text-amber-700">
                                {message}
                            </p>
                        )}
                    </form>

                    <p className="mt-3 text-xs leading-5 text-slate-400">
                        Subscribe only if you want to receive updates from DOCmed.
                    </p>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-slate-200">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-5 text-center sm:flex-row sm:px-8 sm:text-left">
                    <p className="text-xs text-slate-500">
                        {/* © {new Date().getFullYear()} DOCmed. All rights reserved. */}
                    </p>

                    <p className="flex items-center gap-1 text-xs text-slate-500">
                        Built with
                        {/* <Heart size={13} className="fill-red-500 text-red-500" /> */}
                        using Next.js
                    </p>
                </div>
            </div>
        </footer>
    );
}
