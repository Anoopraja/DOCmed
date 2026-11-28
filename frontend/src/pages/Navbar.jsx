
import { Link, useNavigate, useLocation } from "react-router-dom";
import api from "../../api/api.js";
import { User } from "lucide-react";
import { useState, useEffect } from "react";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Medicines", to: "/medicines" },
  { label: "Doctors", to: "/doctors" },
  { label: "Emergency", to: "/emergency" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  // =========================
  // GET CURRENT USER
  // =========================

  useEffect(() => {
    let active = true;

    const getCurrentUser = async () => {
      try {
        // First check normal user
        try {
          const { data } = await api.get("/user/me");

          if (active && data.success) {
            setUser(data.user);
            return;
          }
        } catch (error) {
          // Try shopowner next
        }

        // Check shopowner
        try {
          const { data } = await api.get("/shopowner/me");

          if (active && data.success) {
            setUser(data.user);
            return;
          }
        } catch (error) {
          // No authenticated user found
        }

        if (active) {
          setUser(null);
          setCartCount(0);
        }
      } catch (error) {
        if (active) {
          setUser(null);
          setCartCount(0);
        }
      }
    };

    getCurrentUser();

    return () => {
      active = false;
    };
  }, [location.pathname]);

  // =========================
  // GET CART COUNT
  // =========================

  useEffect(() => {
    let active = true;

    const fetchCartCount = async () => {
      if (!user) {
        setCartCount(0);
        return;
      }

      try {
        const { data } = await api.get("/cart");

        if (active && data.success) {
          const total = data.data.reduce(
            (sum, item) => sum + Number(item.quantity || 0),
            0
          );

          setCartCount(total);
        }
      } catch (error) {
        console.error(
          "Cart count error:",
          error.response?.data || error.message
        );

        if (active) setCartCount(0);
      }
    };

    fetchCartCount();

    return () => {
      active = false;
    };
  }, [user]);

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = async () => {
    try {
      const logoutPath =
        user?.role === "shopowner"
          ? "/shopowner/logout"
          : "/user/logout";

      await api.post(logoutPath);
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setUser(null);
      setCartCount(0);
      setMenuOpen(false);
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      navigate("/login");
    }
  };

  // =========================
  // PROFILE ROUTE
  // =========================

  const profileRoute =
    user?.role === "shopowner"
      ? "/shopownerprofile"
      : user?.role === "admin"
        ? "/adminprofile"
        : "/userprofile";

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
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f9faf8] text-2xl font-bold text-[#152019]">
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
              className="group relative transition hover:text-[#b5f36d]"
            >
              {item.label}

              <span className="absolute -bottom-2 left-0 h-0.5 w-0 rounded-full bg-[#b5f36d] transition-all group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* RIGHT ACTIONS */}

        <div className="flex items-center gap-2 sm:gap-3">

          {/* WISHLIST

          <Link
            to="/wishlist"
            aria-label="View favorite medicines"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-xl text-gray-300 transition hover:bg-white/10 hover:text-orange-400"
          >
            ♡
          </Link> */}

          {/* CART */}

          <Link
            to="/cart"
            aria-label={`View cart with ${cartCount} items`}
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-gray-300 transition hover:bg-white/10 hover:text-[#b5f36d]"
          >
            <span className="text-xl">🛒</span>

            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-orange-400 px-1 text-[9px] font-bold text-black">
                {cartCount}
              </span>
            )}
          </Link>

          {/* DESKTOP AUTH */}

          {user ? (
            <div className="hidden items-center gap-3 sm:flex">

              <Link
                to={profileRoute}
                className="rounded-full border border-[#b5f36d]/30 px-5 py-2.5 text-sm font-semibold text-[#b5f36d] transition hover:bg-[#b5f36d]/10"
              >
               <User />
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-full border border-red-500/30 bg-red-500/10 px-5 py-2.5 text-sm font-semibold text-red-400 transition hover:bg-red-500 hover:text-white"
              >
                Logout
              </button>

            </div>
          ) : (
            <div className="hidden items-center gap-3 sm:flex">

              <Link
                to="/login"
                className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-[#b5f36d] hover:text-[#b5f36d]"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-full bg-[#b5f36d] px-5 py-2.5 text-sm font-semibold text-[#152019] transition hover:bg-orange-400"
              >
                Register
              </Link>

            </div>
          )}

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

          {/* MOBILE AUTH */}

          <div className="grid grid-cols-2 gap-3 pt-5">

            {user ? (
              <>
                <Link
                  to={profileRoute}
                  onClick={closeMenu}
                  className="rounded-xl border border-[#b5f36d]/30 py-3 text-center text-sm font-semibold text-[#b5f36d]"
                >
                  My Profile
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-xl bg-red-500/10 py-3 text-sm font-bold text-red-400 transition hover:bg-red-500 hover:text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
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
              </>
            )}

          </div>
        </nav>
      )}

    </header>
  );
};

export default Navbar;
