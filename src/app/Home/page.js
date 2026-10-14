"use client";

import { useState } from "react";
import {
  Search,
  UserRound,
  ShoppingCart,
  Pill,
  Truck,
  ShieldCheck,
  Headset,
  LockKeyhole,
  ArrowRight,
  Heart,
  Star,
  Menu,
  X,
} from "lucide-react";

const categories = [
  { name: "Medicines", count: "1200+ products", image: "💊" },
  { name: "Vitamins & Supplements", count: "800+ products", image: "🧴" },
  { name: "Personal Care", count: "600+ products", image: "🧼" },
  { name: "First Aid", count: "400+ products", image: "🧰" },
  { name: "Baby Care", count: "300+ products", image: "🍼" },
  { name: "Medical Devices", count: "250+ products", image: "🩺" },
];

const products = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    description: "Pain Relief Tablet (20s)",
    price: 2.99,
    oldPrice: 4.99,
    rating: 4.8,
    image: "💊",
    color: "bg-blue-50",
  },
  {
    id: 2,
    name: "Vitamin D3 1000 IU",
    description: "Softgels (60s)",
    price: 8.99,
    oldPrice: 12.99,
    rating: 4.7,
    image: "🟡",
    color: "bg-amber-50",
  },
  {
    id: 3,
    name: "Cetaphil Gentle Skin Cleanser",
    description: "(500ml)",
    price: 14.99,
    oldPrice: 18.99,
    rating: 4.9,
    image: "🧴",
    color: "bg-cyan-50",
  },
  {
    id: 4,
    name: "Omron BP Monitor",
    description: "Digital (HEM-7120)",
    price: 49.99,
    oldPrice: 69.99,
    rating: 4.6,
    image: "🩺",
    color: "bg-slate-100",
  },
  {
    id: 5,
    name: "Nestlé NAN 1",
    description: "Infant Formula (400g)",
    price: 18.99,
    oldPrice: 24.99,
    rating: 4.8,
    image: "🥫",
    color: "bg-orange-50",
  },
];

const benefits = [
  {
    icon: Truck,
    title: "Fast & Reliable Delivery",
    description: "Get your orders in 2-5 days",
  },
  {
    icon: ShieldCheck,
    title: "100% Authentic Products",
    description: "Genuine & trusted brands",
  },
  {
    icon: Headset,
    title: "24/7 Customer Support",
    description: "We're here to help",
  },
  {
    icon: LockKeyhole,
    title: "Secure Payments",
    description: "Safe & encrypted checkout",
  },
];

const Home = () => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [search, setSearch] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [email, setEmail] = useState("");

  const filteredProducts = products.filter((product) =>
    `${product.name} ${product.description}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const addToCart = (product) => {
    setCart((previousCart) => [...previousCart, product]);
  };

  const toggleWishlist = (id) => {
    setWishlist((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  };

  const handleSearch = (event) => {
    event.preventDefault();
    document.getElementById("products")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const handleNewsletter = (event) => {
    event.preventDefault();
    alert(`Newsletter subscription demo: ${email}`);
    setEmail("");
  };

  return (
<main className="min-h-screen w-full bg-white text-slate-800">     

      {/* HERO */}
      <section className="overflow-hidden w-auto bg-gradient-to-r from-sky-50 via-blue-50 to-blue-100">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 py-12 md:grid-cols-2 md:py-16">
          <div>
            <span className="inline-block rounded-full bg-blue-100 px-4 py-2 text-xs font-bold text-blue-800">
              Your Trusted Healthcare Partner
            </span>

            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
              Better Health
              <br />
              for a <span className="text-blue-600">Brighter Tomorrow</span>
            </h1>

            <p className="mt-4 max-w-lg text-base leading-7 text-slate-600">
              Get high-quality medicines, wellness products and healthcare
              essentials — all in one place. Safe. Convenient. Reliable.
            </p>

            <a
              href="/products"
              className="mt-6 inline-flex items-center gap-3 rounded-lg bg-blue-600 px-6 py-3 font-bold text-white transition hover:bg-blue-700"
            >
              Shop Now <ArrowRight size={19} />
            </a>
          </div>

          <div className="relative flex min-h-72 items-center justify-center">
            <div className="absolute h-64 w-64 rounded-full bg-blue-200/70 sm:h-80 sm:w-80" />

            <div className="absolute left-8 top-5 text-6xl text-blue-200">
              +
            </div>

            <div className="relative z-10 flex flex-col items-center">
              <div className="flex h-48 w-48 items-center justify-center rounded-full border-8 border-white/70 bg-white text-blue-600 shadow-xl sm:h-60 sm:w-60">
                <UserRound size={130} strokeWidth={1.1} />
              </div>

              <p className="mt-4 text-xl font-extrabold text-blue-700">
                Health is Wealth
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="border-b border-slate-100 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-5 py-7 md:grid-cols-4">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <div
                key={benefit.title}
                className="flex items-center gap-3"
              >
                <Icon
                  size={34}
                  className="shrink-0 text-blue-600"
                  strokeWidth={1.8}
                />

                <div>
                  <h3 className="text-sm font-bold">{benefit.title}</h3>
                  <p className="mt-1 text-xs text-slate-500">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-5 py-10">
        <div className="mb-5 flex items-center justify-between gap-3">
          <h2 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
            Shop by Category
          </h2>

          <a
            href="/categories"
            className="flex shrink-0 items-center gap-1 text-xs font-bold text-blue-600 sm:text-sm"
          >
            View All Categories <ArrowRight size={15} />
          </a>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => (
            <a
              key={category.name}
              href="/categories"
              className="rounded-xl bg-sky-50 p-4 text-center transition hover:-translate-y-1 hover:bg-blue-100 sm:p-5"
            >
              <div className="flex h-16 items-center justify-center text-5xl">
                {category.image}
              </div>

              <h3 className="mt-3 text-sm font-bold text-slate-900">
                {category.name}
              </h3>

              <p className="mt-2 text-xs text-slate-500">
                {category.count}
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section id="products" className="mx-auto max-w-7xl px-5 pb-10">
        <div className="mb-5 flex items-center justify-between gap-3">
          <h2 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
            Featured Products
          </h2>

          <a
            href="/products"
            className="flex shrink-0 items-center gap-1 text-xs font-bold text-blue-600 sm:text-sm"
          >
            View All Products <ArrowRight size={15} />
          </a>
        </div>

        {filteredProducts.length === 0 ? (
          <p className="rounded-xl bg-slate-50 p-8 text-center text-slate-500">
            No products found for "{search}".
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {filteredProducts.map((product) => (
              <article
                key={product.id}
                className="rounded-xl border border-slate-200 bg-white p-3 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div
                  className={`relative flex h-32 items-center justify-center rounded-lg sm:h-40 ${product.color}`}
                >
                  <span className="text-6xl" role="img" aria-label={product.name}>
                    {product.image}
                  </span>

                  <button
                    type="button"
                    aria-label="Toggle wishlist"
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute right-2 top-2 rounded-full bg-white p-2 shadow-sm"
                  >
                    <Heart
                      size={17}
                      className={
                        wishlist.includes(product.id)
                          ? "fill-red-500 text-red-500"
                          : "text-slate-500"
                      }
                    />
                  </button>
                </div>

                <div className="mt-4">
                  <h3 className="line-clamp-2 min-h-10 text-sm font-bold text-slate-800">
                    {product.name}
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    {product.description}
                  </p>

                  <div className="mt-3 flex items-center gap-1 text-xs">
                    <span className="flex text-amber-500">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={12}
                          fill="currentColor"
                          strokeWidth={1}
                        />
                      ))}
                    </span>
                    <span className="text-slate-500">{product.rating}</span>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span className="text-lg font-extrabold text-blue-600">
                      ${product.price.toFixed(2)}
                    </span>

                    <span className="text-xs text-slate-400 line-through">
                      ${product.oldPrice.toFixed(2)}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => addToCart(product)}
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-2 py-3 text-xs font-bold text-white transition hover:bg-blue-700"
                  >
                    <ShoppingCart size={15} />
                    Add to Cart
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* SPECIAL OFFER */}
      <section className="mx-auto max-w-7xl px-5 pb-10">
        <div className="flex flex-col items-center justify-between gap-6 rounded-2xl bg-gradient-to-r from-sky-100 to-blue-50 px-6 py-8 sm:flex-row sm:px-10">
          <div>
            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
              Special Offer
            </span>

            <h2 className="mt-3 text-3xl font-extrabold text-blue-600">
              Up to 30% Off
            </h2>

            <p className="mt-2 font-semibold text-slate-700">
              on Selected Health Products
            </p>
          </div>

          <a
            href="/products"
            className="inline-flex items-center gap-3 rounded-lg bg-blue-600 px-6 py-3 font-bold text-white hover:bg-blue-700"
          >
            Shop Now <ArrowRight size={18} />
          </a>

          <div className="flex items-center gap-3">
            <Heart size={45} className="text-blue-600" strokeWidth={1.5} />
            <p className="text-sm font-bold leading-6 text-slate-800">
              Healthy Choices
              <br />
              for a Better You
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <a href="/" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
                <Pill size={22} />
              </span>

              <span className="text-xl font-extrabold text-slate-900">
                DOC<span className="text-blue-600">med</span>
              </span>
            </a>

            <p className="mt-4 max-w-xs text-sm leading-6 text-slate-500">
              Your trusted destination for healthcare essentials. Shop with
              confidence.
            </p>
          </div>

          <div>
            <h3 className="font-extrabold text-slate-900">Quick Links</h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-500">
              <li><a href="/" className="hover:text-blue-600">Home</a></li>
              <li><a href="/products" className="hover:text-blue-600">Shop Products</a></li>
              <li><a href="/categories" className="hover:text-blue-600">Categories</a></li>
              <li><a href="/about" className="hover:text-blue-600">About Us</a></li>
              <li><a href="/contact" className="hover:text-blue-600">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-extrabold text-slate-900">Customer Support</h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-500">
              <li><a href="/contact" className="hover:text-blue-600">Contact Us</a></li>
              <li><a href="/faqs" className="hover:text-blue-600">FAQs</a></li>
              <li><a href="/shipping" className="hover:text-blue-600">Shipping Policy</a></li>
              <li><a href="/privacy" className="hover:text-blue-600">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-blue-600">Terms & Conditions</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-extrabold text-slate-900">Stay Updated</h3>

            <p className="mt-4 text-sm leading-6 text-slate-500">
              Get updates about new products, offers, and healthcare tips.
            </p>

            <form
              onSubmit={handleNewsletter}
              className="mt-4 flex overflow-hidden rounded-lg border border-slate-200 bg-white"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email address"
                className="min-w-0 flex-1 px-3 py-3 text-sm outline-none"
              />

              <button
                type="submit"
                aria-label="Subscribe"
                className="bg-blue-600 px-4 text-white hover:bg-blue-700"
              >
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-slate-200">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-2 px-5 py-5 text-xs text-slate-500 sm:flex-row">
            <p>© 2026 DOCmed. All rights reserved.</p>
            <p>Built with ❤️ using Next.js</p>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Home;