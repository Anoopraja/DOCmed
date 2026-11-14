
import { useMemo, useState } from "react";
import {
  Search,
  ShoppingCart,
  Heart,
  MapPin,
  Menu,
  Home,
  Package,
  UserRound,
  Pill,
  ShieldCheck,
  Truck,
  Clock3,
  Plus,
  ArrowRight,
  Activity,
  X,
  ChevronRight,
} from "lucide-react";

const categories = [
  "All",
  "Medicines",
  "Healthcare",
  "Vitamins",
  "Personal Care",
  "Baby Care",
];

const products = [
  {
    id: 1,
    name: "Paracetamol 650mg",
    brand: "Dolo",
    category: "Medicines",
    price: 30,
    mrp: 35,
    unit: "15 tablets",
    image:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500",
    tag: "Bestseller",
  },
  {
    id: 2,
    name: "Vitamin C Tablets",
    brand: "Limcee",
    category: "Vitamins",
    price: 28,
    mrp: 32,
    unit: "15 tablets",
    image:
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500",
    tag: "Popular",
  },
  {
    id: 3,
    name: "Digital Thermometer",
    brand: "Dr. Morepen",
    category: "Healthcare",
    price: 175,
    mrp: 220,
    unit: "1 unit",
    image:
      "https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=500",
    tag: "Essential",
  },
  {
    id: 4,
    name: "Hand Sanitizer",
    brand: "Dettol",
    category: "Personal Care",
    price: 55,
    mrp: 65,
    unit: "200 ml",
    image:
      "https://images.unsplash.com/photo-1584483720412-ce931f4aefa8?w=500",
    tag: "",
  },
  {
    id: 5,
    name: "Multivitamin Tablets",
    brand: "Healthkart",
    category: "Vitamins",
    price: 199,
    mrp: 249,
    unit: "30 tablets",
    image:
      "https://images.unsplash.com/photo-1550572017-edd951b55104?w=500",
    tag: "Trending",
  },
  {
    id: 6,
    name: "First Aid Kit",
    brand: "Generic",
    category: "Healthcare",
    price: 299,
    mrp: 350,
    unit: "1 kit",
    image:
      "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=500",
    tag: "",
  },
];

const navItems = [
  { name: "Home", icon: Home },
  { name: "Categories", icon: Package },
  { name: "Orders", icon: Clock3 },
  { name: "Profile", icon: UserRound },
];

function ProductCard({ product, onAdd }) {
  const [liked, setLiked] = useState(false);

  return (
    <article className="group min-w-0 overflow-hidden rounded-2xl bg-[#1b252e] transition duration-300 hover:bg-[#222e38]">

      <div className="relative flex h-36 items-center justify-center overflow-hidden bg-[#26323c] sm:h-48">

        {product.tag && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-[#17231f] px-3 py-1 text-[10px] font-medium text-emerald-400">
            {product.tag}
          </span>
        )}

        <button
          onClick={() => setLiked(!liked)}
          aria-label="Toggle wishlist"
          className="absolute right-3 top-3 z-10 rounded-full bg-[#17212a] p-2 text-gray-400 hover:text-red-400"
        >
          <Heart
            size={17}
            fill={liked ? "currentColor" : "none"}
            className={liked ? "text-red-400" : ""}
          />
        </button>

        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-3 sm:p-4">
        <p className="text-[10px] text-gray-500 sm:text-xs">
          {product.brand} · {product.unit}
        </p>

        <h3 className="mt-1 min-h-10 text-sm font-semibold leading-5 text-gray-100 sm:text-base">
          {product.name}
        </h3>

        <div className="mt-3 flex items-center justify-between gap-2">
          <div>
            <span className="text-sm font-bold text-white sm:text-base">
              ₹{product.price}
            </span>
            <span className="ml-1 text-[10px] text-gray-500 line-through">
              ₹{product.mrp}
            </span>
          </div>

          <button
            onClick={() => onAdd(product)}
            className="flex items-center gap-1 rounded-lg bg-emerald-400 px-3 py-2 text-xs font-semibold text-[#101820] transition hover:bg-emerald-300"
          >
            <Plus size={14} />
            Add
          </button>
        </div>
      </div>
    </article>
  );
}

export default function HomePage() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("Home");
  const [message, setMessage] = useState("");

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryMatch =
        category === "All" || product.category === category;

      const searchMatch = [
        product.name,
        product.brand,
        product.category,
      ]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());

      return categoryMatch && searchMatch;
    });
  }, [category, search]);

  const addToCart = (product) => {
    setCart((previous) => {
      const exists = previous.find(
        (item) => item.id === product.id
      );

      if (exists) {
        return previous.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...previous, { ...product, quantity: 1 }];
    });

    setMessage(`${product.name} added to cart`);
    setTimeout(() => setMessage(""), 2000);
  };

  return (
    <div className="min-h-screen bg-[#111920] pb-24 text-white lg:pb-0">

      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-[#111920]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">

          <a href="/" className="flex shrink-0 items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400 text-[#111920]">
              <Activity size={23} />
            </div>

            <div>
              <h1 className="text-xl font-bold tracking-tight">
                DOC<span className="text-emerald-400">med</span>
              </h1>
              <p className="text-[9px] tracking-[2px] text-gray-500">
                YOUR HEALTH PARTNER
              </p>
            </div>
          </a>

          <div className="hidden items-center gap-2 lg:flex">
            <MapPin size={18} className="text-emerald-400" />
            <div>
              <p className="text-[10px] text-gray-500">Deliver to</p>
              <p className="text-xs font-medium">Your location</p>
            </div>
            <ChevronRight size={15} className="text-gray-500" />
          </div>

          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => setActiveNav(item.name)}
                className={`text-sm transition ${
                  activeNav === item.name
                    ? "text-emerald-400"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setMessage(`Cart contains ${cartCount} items`)}
              aria-label="Open cart"
              className="relative rounded-xl bg-[#202b35] p-3 text-gray-300 hover:text-emerald-400"
            >
              <ShoppingCart size={19} />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-emerald-400 px-1 text-[9px] font-bold text-black">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              className="rounded-xl bg-[#202b35] p-3 text-gray-300 lg:hidden"
            >
              {menuOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="bg-[#19232c] px-5 py-3 lg:hidden">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  setActiveNav(item.name);
                  setMenuOpen(false);
                }}
                className="flex w-full items-center gap-3 py-3 text-sm text-gray-300"
              >
                <item.icon size={18} />
                {item.name}
              </button>
            ))}
          </div>
        )}
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* LOCATION */}
        <div className="mt-3 flex items-center gap-2 text-xs text-gray-400 lg:hidden">
          <MapPin size={15} className="text-emerald-400" />
          Delivering to
          <span className="font-medium text-white">Your location</span>
          <ChevronRight size={14} />
        </div>

        {/* SEARCH */}
        <section className="mt-5">
          <div className="relative">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search medicines, products..."
              className="w-full rounded-2xl bg-[#202b35] py-4 pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-gray-500 focus:bg-[#27343f]"
            />
          </div>
        </section>

        {/* HERO */}
        <section className="relative mt-7 overflow-hidden rounded-3xl bg-[#1c302e] p-6 sm:p-10 lg:p-12">
          <div className="relative z-10 max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#263e39] px-3 py-2 text-[10px] font-medium text-emerald-300 sm:text-xs">
              <ShieldCheck size={15} />
              Healthcare made simple
            </span>

            <h2 className="mt-5 text-3xl font-bold leading-tight sm:text-5xl">
              Your health,
              <br />
              our <span className="text-emerald-400">priority.</span>
            </h2>

            <p className="mt-4 max-w-sm text-xs leading-6 text-gray-300 sm:text-sm">
              Find medicines and healthcare essentials from
              nearby pharmacies, all in one place.
            </p>

            <button
              onClick={() =>
                document.getElementById("products")?.scrollIntoView({
                  behavior: "smooth",
                })
              }
              className="mt-7 flex items-center gap-2 rounded-xl bg-emerald-400 px-5 py-3 text-xs font-bold text-[#111920] transition hover:bg-emerald-300 sm:text-sm"
            >
              Explore medicines
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="pointer-events-none absolute -right-10 -bottom-16 hidden h-72 w-72 items-center justify-center rounded-full bg-[#24413c] md:flex">
            <Pill
              size={125}
              strokeWidth={1}
              className="rotate-[-35deg] text-emerald-300/40"
            />
          </div>
        </section>

        {/* FEATURES */}
        <section className="mt-6 grid grid-cols-3 gap-3">
          {[
            { icon: ShieldCheck, title: "Genuine", sub: "Medicines" },
            { icon: Truck, title: "Fast", sub: "Delivery" },
            { icon: Clock3, title: "Easy", sub: "Ordering" },
          ].map((feature) => (
            <div
              key={feature.title}
              className="flex min-w-0 items-center gap-2 rounded-xl bg-[#1b252e] p-3 sm:gap-3 sm:p-5"
            >
              <feature.icon
                size={21}
                className="shrink-0 text-emerald-400 sm:h-6 sm:w-6"
              />
              <div className="min-w-0">
                <p className="text-[11px] font-semibold sm:text-sm">
                  {feature.title}
                </p>
                <p className="text-[9px] text-gray-500 sm:text-xs">
                  {feature.sub}
                </p>
              </div>
            </div>
          ))}
        </section>

        {/* CATEGORIES */}
        <section className="mt-9">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold sm:text-xl">
              Explore categories
            </h2>
            <span className="text-xs text-gray-500">Browse all</span>
          </div>

          <div className="mt-4 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`shrink-0 rounded-full px-5 py-2.5 text-xs font-medium transition sm:text-sm ${
                  category === item
                    ? "bg-emerald-400 text-[#111920]"
                    : "bg-[#202b35] text-gray-300 hover:bg-[#2b3944]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        {/* PRODUCTS */}
        <section id="products" className="mt-9 scroll-mt-24">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold sm:text-xl">
                {category === "All" ? "Popular products" : category}
              </h2>
              <p className="mt-1 text-[10px] text-gray-500 sm:text-xs">
                Healthcare essentials for everyday needs
              </p>
            </div>

            <button
              onClick={() => setCategory("All")}
              className="flex items-center gap-1 text-xs text-emerald-400"
            >
              View all <ArrowRight size={14} />
            </button>
          </div>

          {filteredProducts.length ? (
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAdd={addToCart}
                />
              ))}
            </div>
          ) : (
            <div className="mt-5 rounded-2xl bg-[#1b252e] py-14 text-center">
              <Search size={30} className="mx-auto text-gray-500" />
              <p className="mt-3 text-sm font-semibold">
                No products found
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Try another search.
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                }}
                className="mt-4 text-xs text-emerald-400"
              >
                Clear filters
              </button>
            </div>
          )}
        </section>

        {/* PHARMACY PARTNER */}
        <section className="mt-10 flex flex-col justify-between gap-5 rounded-2xl bg-[#1b252e] p-6 sm:flex-row sm:items-center sm:p-8">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-emerald-400">
              Pharmacy partners
            </p>

            <h2 className="mt-2 text-xl font-bold sm:text-2xl">
              Own a pharmacy?
            </h2>

            <p className="mt-2 max-w-md text-xs leading-6 text-gray-400 sm:text-sm">
              Join DOCmed, manage inventory and receive orders
              from customers in your area.
            </p>
          </div>

          <button className="flex shrink-0 items-center gap-2 self-start rounded-xl bg-emerald-400 px-5 py-3 text-xs font-bold text-[#111920] hover:bg-emerald-300 sm:self-center">
            Become a partner
            <ArrowRight size={15} />
          </button>
        </section>

        {/* FOOTER */}
        <footer className="mt-10 py-7 text-center">
          <p className="text-lg font-bold">
            DOC<span className="text-emerald-400">med</span>
          </p>
          <p className="mt-2 text-[10px] text-gray-500">
            Your health partner. © {new Date().getFullYear()} DOCmed.
          </p>
        </footer>
      </main>

      {/* NOTIFICATION */}
      {message && (
        <div
          role="status"
          className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded-xl bg-[#26343c] px-5 py-3 text-xs text-emerald-300 shadow-xl lg:bottom-6"
        >
          {message}
        </div>
      )}

      {/* MOBILE NAVIGATION */}
      <nav className="fixed bottom-0 left-0 z-40 w-full bg-[#17212a] px-3 pb-[max(10px,env(safe-area-inset-bottom))] pt-2 lg:hidden">
        <div className="mx-auto flex max-w-lg items-center justify-around">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                setActiveNav(item.name);

                if (item.name === "Categories") {
                  document.getElementById("products")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }
              }}
              className={`flex flex-col items-center gap-1 px-4 py-1.5 ${
                activeNav === item.name
                  ? "text-emerald-400"
                  : "text-gray-500"
              }`}
            >
              <item.icon size={20} />
              <span className="text-[10px]">{item.name}</span>
            </button>
          ))}

          <button
            onClick={() => setMessage(`Cart contains ${cartCount} items`)}
            className="relative flex flex-col items-center gap-1 px-3 py-1.5 text-gray-500"
          >
            <ShoppingCart size={20} />
            <span className="text-[10px]">Cart</span>
            {cartCount > 0 && (
              <span className="absolute right-1 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-emerald-400 px-1 text-[9px] font-bold text-black">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </nav>
    </div>
  );
}
