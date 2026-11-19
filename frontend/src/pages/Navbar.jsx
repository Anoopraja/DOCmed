
import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Menu, Plus, ShoppingCart, X } from "lucide-react";
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
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#171d26]/95 text-white backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 md:px-10">
        <Link to="/" aria-label="DOCmed home" className="flex shrink-0 items-center gap-2">
          <div className="rounded-xl bg-emerald-500 p-2 text-black">
            <Plus size={22} strokeWidth={3} />
          </div>
          <span className="text-xl font-bold tracking-tight">
            DOC<span className="text-[#F97316]">med</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link key={item.label} to={item.to} className="transition hover:text-emerald-400">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/medicines"
            aria-label="View favorite medicines"
            className="rounded-full border border-white/10 p-2.5 text-slate-300 transition hover:bg-slate-700 hover:text-rose-300"
          >
            <Heart size={19} />
          </Link>
          <Link
            to="/cart"
            aria-label={`View cart${cartCount > 0 ? ` with ${cartCount} items` : ""}`}
            className="relative rounded-full border border-white/10 p-2.5 text-slate-300 transition hover:bg-slate-700 hover:text-emerald-400"
          >
            <ShoppingCart size={19} />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-emerald-400 px-1 text-[9px] font-bold text-black">
                {cartCount}
              </span>
            )}
          </Link>
          <Link
            to="/login"
            className="hidden rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-emerald-300 sm:block"
          >
            Login
          </Link>
          <button
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="rounded-full border border-white/10 p-2.5 text-slate-300 transition hover:bg-slate-700 md:hidden"
          >
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="border-t border-white/10 px-5 py-3 md:hidden" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              onClick={closeMenu}
              className="block border-b border-white/5 py-3 text-sm text-slate-300 last:border-0 hover:text-emerald-400"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}


export default Navbar;