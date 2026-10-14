
"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Pill,
  Search,
  ShoppingCart,
  UserRound,
  Menu,
  X,
} from "lucide-react";

const links = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/products" },
  { name: "Categories", href: "/categories" },
  { name: "My Orders", href: "/orders" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  function handleSearch(e) {
    e.preventDefault();

    const query = search.trim();
    if (!query) return;

    window.location.href = `/products?search=${encodeURIComponent(query)}`;
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-41 w-full border-b border-slate-200 bg-white">
      <nav className="scrollbar-none mx-auto flex h-18 max-w-7xl items-center justify-between gap-5 px-4 py-3 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <span className="rounded-xl bg-blue-600 p-2 text-white">
            <Pill size={24} />
          </span>

          <span className="text-2xl font-bold tracking-tight text-slate-900">
            DOC<span className="text-blue-600">med</span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-6 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Search */}
        <form
          onSubmit={handleSearch}
          className="hidden max-w-sm flex-1 items-center rounded-xl border border-slate-200 bg-slate-50 px-3 focus-within:border-blue-500 md:flex"
        >
          <Search size={19} className="shrink-0 text-slate-400" />

          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search medicines..."
            aria-label="Search medicines"
            className="w-full bg-transparent px-3 py-2.5 text-sm text-slate-800 outline-none placeholder:text-slate-400"
          />
        </form>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-2">
          <Link
            href="/cart"
            aria-label="Shopping cart"
            className="relative rounded-xl p-2.5 text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
          >
            <ShoppingCart size={22} />
          </Link>

          <Link
            href="/login"
            className="hidden items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 sm:flex"
          >
            <UserRound size={17} />
            Login
          </Link>

          {/* Mobile menu toggle */}
          {/* <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="rounded-xl border border-slate-200 p-2.5 text-slate-700 lg:hidden"
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button> */}
        </div>
      </nav>

      {/* Mobile navigation */}
      {menuOpen && (
        <div className="border-t border-slate-100 bg-white px-4 py-4 shadow-lg lg:hidden">
          <form
            onSubmit={handleSearch}
            className="mb-4 flex items-center rounded-xl border border-slate-200 bg-slate-50 px-3 md:hidden"
          >
            <Search size={19} className="text-slate-400" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search medicines..."
              aria-label="Search medicines"
              className="w-full bg-transparent px-3 py-3 text-sm outline-none"
            />
          </form>

          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600"
              >
                {link.name}
              </Link>
            ))}

            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="mt-2 rounded-xl bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white sm:hidden"
            >
              Login / Sign up
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
