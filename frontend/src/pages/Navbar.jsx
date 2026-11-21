
import { useState } from "react";
import { Link } from "react-router-dom";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Medicines", to: "/medicines" },
  { label: "Doctors", to: "/doctors" },
  { label: "Emergency", to: "/emergency" },
];

const Navbar = ({ cartCount = 0 }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#101713]/95 text-white backdrop-blur-xl">

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 md:px-10">

        {/* LOGO */}
        <Link
          to="/"
          aria-label="DOCmed home"
          className="flex shrink-0 items-center gap-2"
          onClick={closeMenu}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#b5f36d] text-[#152019] text-2xl font-bold">
            +
          </div>

          <span className="text-xl font-bold tracking-tight">
            DOC<span className="text-[#b5f36d]">med</span>
          </span>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav
          className="hidden items-center gap-8 text-sm text-gray-300 md:flex"
          aria-label="Primary navigation"
        >
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="relative transition hover:text-[#b5f36d] group"
            >
              {item.label}

              <span className="absolute -bottom-2 left-0 h-0.5 w-0 rounded-full bg-[#b5f36d] transition-all group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* FAVORITES */}
          <Link
            to="/wishlist"
            aria-label="View favorite medicines"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-gray-300 transition hover:bg-white/10 hover:text-orange-400"
          >
            <span className="text-xl">♡</span>
          </Link>

          {/* CART */}
          <Link
            to="/cart"
            aria-label={`View cart${cartCount > 0 ? ` with ${cartCount} items` : ""}`}
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-gray-300 transition hover:bg-white/10 hover:text-[#b5f36d]"
          >
            <span className="text-xl">🛒</span>

            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-orange-400 px-1 text-[9px] font-bold text-black">
                {cartCount}
              </span>
            )}
          </Link>

          {/* LOGIN */}
          <Link
            to="/login"
            className="hidden rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-[#b5f36d] hover:text-[#b5f36d] sm:block"
          >
            Login
          </Link>

          {/* REGISTER */}
          <Link
            to="/register"
            className="hidden rounded-full bg-[#b5f36d] px-5 py-2.5 text-sm font-semibold text-[#152019] transition hover:bg-orange-400 sm:block"
          >
            Register
          </Link>

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-xl text-gray-300 transition hover:bg-white/10 md:hidden"
          >
            {menuOpen ? "✕" : "☰"}
          </button>

        </div>
      </div>

      {/* MOBILE NAVIGATION */}
      {menuOpen && (
        <nav
          className="border-t border-white/10 bg-[#101713] px-5 py-4 md:hidden"
          aria-label="Mobile navigation"
        >

          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              onClick={closeMenu}
              className="block border-b border-white/5 py-3 text-sm text-gray-300 transition last:border-0 hover:text-[#b5f36d]"
            >
              {item.label}
            </Link>
          ))}

          {/* MOBILE AUTH BUTTONS */}
          <div className="grid grid-cols-2 gap-3 pt-5">

            <Link
              to="/login"
              onClick={closeMenu}
              className="rounded-xl border border-white/20 py-3 text-center text-sm font-semibold hover:border-[#b5f36d] hover:text-[#b5f36d]"
            >
              Login
            </Link>

            <Link
              to="/register"
              onClick={closeMenu}
              className="rounded-xl bg-[#b5f36d] py-3 text-center text-sm font-bold text-[#152019] hover:bg-orange-400"
            >
              Register
            </Link>

          </div>
        </nav>
      )}

    </header>
  );
};

export default Navbar;
