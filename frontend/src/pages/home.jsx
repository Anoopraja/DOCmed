import { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------
   Home.jsx – landing page (Tailwind + React only)
   Idea:
   1. A full-screen hero with one big quote.
   2. A rounded container peeks up from the bottom (search + chips).
   3. As the user scrolls, the container slides over the hero and the
      quote behind it becomes blurred.
   Theme from the reference image, solid colours only:
     bg #1b2128 | surface #262d36 | surface2 #2f3741 | border #3b444f
     text #f3f5f7 | muted #9ba5b0 | green #5fd08a
   Responsive: phones, tablets, laptops, large screens.
------------------------------------------------------------------- */

const QUOTE = "The greatest wealth is health.";
const QUOTE_BY = "Virgil";

const CATEGORIES = ["All", "Medicines", "Doctors", "Lab tests", "Devices", "Wellness", "Baby care"];

const SERVICES = [
  { title: "Order medicines", note: "Delivery in 2 hrs", icon: "pill" },
  { title: "Book a doctor", note: "Video or clinic", icon: "steth" },
  { title: "Book lab test", note: "Home sample pickup", icon: "flask" },
  { title: "Upload prescription", note: "We pack it for you", icon: "upload" },
];

const PRODUCTS = [
  { id: 1, name: "Dolo 650 Tablet", pack: "Strip of 15", price: 30, mrp: 34, rating: 4.6, eta: "from 2 hrs", dist: "1.2 km", art: "strip" },
  { id: 2, name: "Digital BP Monitor", pack: "Omron HEM-7120", price: 1499, mrp: 1920, rating: 4.4, eta: "from 1 day", dist: "2.5 km", art: "bp" },
  { id: 3, name: "Vitamin D3 60K", pack: "Strip of 4", price: 118, mrp: 128, rating: 4.5, eta: "from 3 hrs", dist: "1.8 km", art: "bottle" },
  { id: 4, name: "ORS Electrolyte", pack: "Pack of 10", price: 85, mrp: 100, rating: 4.3, eta: "from 2 hrs", dist: "1.2 km", art: "strip" },
  { id: 5, name: "Glucometer Kit", pack: "With 25 strips", price: 899, mrp: 1250, rating: 4.5, eta: "from 1 day", dist: "3.0 km", art: "bp" },
];

const DOCTORS = [
  { id: 1, name: "Dr. Ananya Sharma", spec: "General Physician", exp: "12 yrs", fee: 300, slot: "Today, 5:30 PM", initials: "AS" },
  { id: 2, name: "Dr. Rohit Verma", spec: "Dermatologist", exp: "9 yrs", fee: 600, slot: "Today, 7:15 PM", initials: "RV" },
  { id: 3, name: "Dr. Meera Iyer", spec: "Pediatrician", exp: "15 yrs", fee: 500, slot: "Tomorrow, 10:00 AM", initials: "MI" },
];

const STATS = [
  { value: "2 hrs", label: "Medicine delivery" },
  { value: "8,000+", label: "Verified doctors" },
  { value: "100%", label: "Genuine products" },
];

/* ---------- icons ---------- */
function Icon({ name, size = 20, className = "" }) {
  const p = {
    width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor",
    strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round", className, "aria-hidden": true,
  };
  switch (name) {
    case "search": return (<svg {...p}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>);
    case "heart": return (<svg {...p}><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" /></svg>);
    case "pin": return (<svg {...p}><path d="M12 21s7-6.2 7-11.5a7 7 0 0 0-14 0C5 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" /></svg>);
    case "pill": return (<svg {...p}><rect x="3" y="9" width="18" height="6" rx="3" transform="rotate(-35 12 12)" /><path d="m9 8.5 6 6" /></svg>);
    case "steth": return (<svg {...p}><path d="M6 3v6a4 4 0 0 0 8 0V3" /><path d="M10 13v2a5 5 0 0 0 10 0v-2" /><circle cx="20" cy="11" r="2" /></svg>);
    case "flask": return (<svg {...p}><path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3" /></svg>);
    case "upload": return (<svg {...p}><path d="M12 16V4M7 9l5-5 5 5" /><path d="M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" /></svg>);
    case "shield": return (<svg {...p}><path d="M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z" /><path d="m9 12 2 2 4-4" /></svg>);
    case "truck": return (<svg {...p}><path d="M3 6h11v10H3zM14 9h4l3 3v4h-7" /><circle cx="7" cy="17" r="1.8" /><circle cx="17" cy="17" r="1.8" /></svg>);
    case "clock": return (<svg {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>);
    case "star": return (<svg {...p} fill="currentColor" stroke="none"><path d="m12 3 2.7 5.6 6.1.8-4.5 4.3 1.1 6.1L12 16.8 6.6 19.8l1.1-6.1L3.2 9.4l6.1-.8L12 3Z" /></svg>);
    case "down": return (<svg {...p}><path d="m6 9 6 6 6-6" /></svg>);
    default: return null;
  }
}

/* ---------- flat product art (solid fills) ---------- */
function Art({ kind, size = 84 }) {
  if (kind === "bp")
    return (
      <svg width={size} height={size} viewBox="0 0 80 80" aria-hidden="true">
        <rect x="14" y="10" width="52" height="60" rx="12" fill="#e9edf1" />
        <rect x="22" y="18" width="36" height="22" rx="6" fill="#1b2128" />
        <text x="40" y="34" textAnchor="middle" fontSize="13" fontWeight="700" fill="#5fd08a">120/80</text>
        <circle cx="40" cy="54" r="7" fill="#c3cad2" />
        <circle cx="40" cy="54" r="3" fill="#1b2128" />
      </svg>
    );
  if (kind === "bottle")
    return (
      <svg width={size} height={size} viewBox="0 0 80 80" aria-hidden="true">
        <rect x="28" y="8" width="24" height="12" rx="3" fill="#d7dde3" />
        <rect x="22" y="20" width="36" height="54" rx="9" fill="#e9edf1" />
        <rect x="22" y="36" width="36" height="22" fill="#5fd08a" />
        <text x="40" y="51" textAnchor="middle" fontSize="11" fontWeight="800" fill="#1b2128">D3</text>
      </svg>
    );
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" aria-hidden="true">
      <rect x="8" y="14" width="64" height="52" rx="10" fill="#e9edf1" />
      {[0, 1, 2].map((r) =>
        [0, 1, 2].map((c) => (
          <circle key={`${r}${c}`} cx={24 + c * 16} cy={28 + r * 14} r="5.5" fill="#c3cad2" />
        ))
      )}
      <rect x="8" y="56" width="64" height="10" rx="5" fill="#5fd08a" />
    </svg>
  );
}

/* ---------- product card (Flipkart / Amazon style) ---------- */
function ProductCard({ item, liked, onLike, added, onAdd }) {
  const off = Math.round(((item.mrp - item.price) / item.mrp) * 100);
  return (
    <article className="w-[172px] shrink-0 snap-start rounded-[18px] border border-[#3b444f] bg-[#2f3741] p-2.5 sm:w-[196px]">
      <div className="relative grid h-[116px] place-items-center rounded-xl bg-[#262d36] sm:h-[132px]">
        <Art kind={item.art} />
        <button
          onClick={onLike}
          aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={liked}
          className={`absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full ${
            liked ? "bg-white text-black" : "bg-[#1b2128] text-[#f3f5f7]"
          }`}
        >
          <Icon name="heart" size={16} />
        </button>
        <span className="absolute bottom-2 left-2 inline-flex items-center gap-1 rounded-md bg-black px-1.5 py-0.5 text-[11px] font-bold text-white">
          <Icon name="star" size={11} /> {item.rating}
        </span>
      </div>
      <h3 className="mt-3 text-[15px] font-extrabold leading-tight tracking-tight">{item.name}</h3>
      <p className="mt-0.5 text-xs text-[#9ba5b0]">{item.pack}</p>
      <div className="mt-2.5 flex flex-wrap items-baseline gap-x-1.5">
        <span className="text-lg font-extrabold">₹{item.price.toLocaleString("en-IN")}</span>
        <span className="text-xs text-[#9ba5b0] line-through">₹{item.mrp.toLocaleString("en-IN")}</span>
        <span className="text-xs font-bold text-[#5fd08a]">{off}% off</span>
      </div>
      <p className="mt-1.5 text-xs text-[#9ba5b0]">
        {item.eta} &nbsp; {item.dist}
      </p>
      <button
        onClick={onAdd}
        className={`mt-3 w-full rounded-full border py-2 text-[13px] font-bold ${
          added
            ? "border-white bg-white text-black"
            : "border-[#3b444f] text-[#f3f5f7] hover:border-white"
        }`}
      >
        {added ? "Added to cart" : "Add to cart"}
      </button>
    </article>
  );
}

function DoctorRow({ doc }) {
  return (
    <div className="flex items-center gap-3.5 rounded-2xl border border-[#3b444f] bg-[#2f3741] p-3">
      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#1b2128] text-[15px] font-extrabold">
        {doc.initials}
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-extrabold">{doc.name}</h3>
        <p className="text-xs text-[#9ba5b0]">{doc.spec} • {doc.exp}</p>
        <p className="mt-0.5 flex items-center gap-1.5 text-xs font-semibold text-[#5fd08a]">
          <Icon name="clock" size={13} /> {doc.slot}
        </p>
      </div>
      <div className="flex flex-col items-end gap-2">
        <span className="text-sm font-extrabold">₹{doc.fee}</span>
        <button className="rounded-full border border-[#3b444f] px-[18px] py-1.5 text-[13px] font-bold hover:border-white hover:bg-white hover:text-black">
          Book
        </button>
      </div>
    </div>
  );
}

/* ---------- interactive background: dot grid that reacts to the pointer ---------- */
// Solid colours only. Dots near the cursor grow and turn green; they ease back
// when the cursor leaves. Works with mouse, pen and touch. Static when the
// user prefers reduced motion.
function HeroDots({ progress }) {
  const ref = useRef(null);
  const prog = useRef(0);

  useEffect(() => {
    prog.current = progress;
  }, [progress]);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const GAP = 28; // space between dots
    const RADIUS = 170; // reach of the hover effect
    const BASE = [59, 68, 79]; // #3b444f
    const HIGH = [95, 208, 138]; // #5fd08a

    let w = 0, h = 0, raf = 0;
    const target = { x: -9999, y: -9999, on: 0 };
    const cur = { x: -9999, y: -9999, s: 0 };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const cols = Math.ceil(w / GAP) + 1;
      const rows = Math.ceil(h / GAP) + 1;
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * GAP + GAP / 2;
          const y = j * GAP + GAP / 2;
          const d = Math.hypot(x - cur.x, y - cur.y);
          let t = Math.max(0, 1 - d / RADIUS) * cur.s;
          t = t * t * (3 - 2 * t); // smooth falloff
          const r = 1.3 + t * 3.6;
          const c0 = Math.round(BASE[0] + (HIGH[0] - BASE[0]) * t);
          const c1 = Math.round(BASE[1] + (HIGH[1] - BASE[1]) * t);
          const c2 = Math.round(BASE[2] + (HIGH[2] - BASE[2]) * t);
          ctx.fillStyle = `rgb(${c0},${c1},${c2})`;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };

    const tick = () => {
      cur.x += (target.x - cur.x) * 0.18;
      cur.y += (target.y - cur.y) * 0.18;
      cur.s += (target.on - cur.s) * 0.12;
      draw();
      const moving =
        Math.abs(target.x - cur.x) > 0.5 ||
        Math.abs(target.y - cur.y) > 0.5 ||
        Math.abs(target.on - cur.s) > 0.01;
      raf = moving ? requestAnimationFrame(tick) : 0;
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const move = (e) => {
      if (prog.current > 0.98) return; // hero is fully covered, skip work
      const r = canvas.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      if (y < 0 || y > r.height) {
        target.on = 0;
      } else {
        if (cur.s < 0.02) { cur.x = x; cur.y = y; }
        target.x = x;
        target.y = y;
        target.on = 1;
      }
      kick();
    };
    const leave = () => { target.on = 0; kick(); };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    if (!reduce) {
      window.addEventListener("pointermove", move, { passive: true });
      window.addEventListener("pointerdown", move, { passive: true });
      window.addEventListener("pointerup", leave);
      window.addEventListener("blur", leave);
      document.documentElement.addEventListener("mouseleave", leave);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", move);
      window.removeEventListener("pointerup", leave);
      window.removeEventListener("blur", leave);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    />
  );
}

/* ---------- page ---------- */
export default function Home() {
  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");
  const [liked, setLiked] = useState({});
  const [cart, setCart] = useState({});
  const [p, setP] = useState(0); // scroll progress 0 → 1

  // blur amount follows scroll position (throttled with rAF)
  useEffect(() => {
    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const range = window.innerHeight * 0.6;
        setP(Math.min(1, Math.max(0, window.scrollY / range)));
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const flip = (set) => (id) => set((s) => ({ ...s, [id]: !s[id] }));

  const onSearch = (e) => {
    e.preventDefault();
    // connect to your router / search page here
    console.log("search:", { category: active, query });
  };

  return (
    <main className="relative bg-[#1b2128] font-['Manrope',system-ui,sans-serif] text-[#f3f5f7] antialiased">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');`}</style>

      {/* ============ 1. HERO: big quote, stays pinned and blurs on scroll ============ */}
      <section
        aria-label="Welcome"
        className="sticky top-0 h-[100svh] min-h-[560px] overflow-hidden bg-[#1b2128]"
      >
        <HeroDots progress={p} />

        <div
          className="relative z-10 mx-auto flex h-full max-w-[1280px] flex-col justify-center px-5 pb-[34svh] pt-24 sm:px-8 lg:pb-[26svh]"
          style={{
            filter: `blur(${(p * 18).toFixed(1)}px)`,
            transform: `scale(${(1 + p * 0.05).toFixed(3)})`,
            opacity: 1 - p * 0.45,
            willChange: "filter, transform",
          }}
        >
          <p className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-[#3b444f] bg-[#2f3741] px-3.5 py-2 text-[13px] font-semibold">
            <Icon name="pin" size={15} /> Delivering to Jamui, Bihar
          </p>

          <blockquote>
            <p className="max-w-[16ch] text-[clamp(44px,10vw,148px)] font-extrabold leading-[0.98] tracking-[-0.035em]">
              “{QUOTE}”
            </p>
            <footer className="mt-6 text-base font-semibold text-[#9ba5b0] sm:text-lg">
              {QUOTE_BY}
            </footer>
          </blockquote>

          <p className="mt-8 max-w-[44ch] text-base leading-relaxed text-[#9ba5b0] sm:text-lg">
            Medicines, doctors and lab tests from verified pharmacies and clinics near you.
          </p>
        </div>

        {/* solid dim layer that fades in while scrolling */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[#1b2128]"
          style={{ opacity: p * 0.5 }}
        />
      </section>

      {/* ============ 2. CONTAINER: peeks at the bottom, slides over the hero ============ */}
      <div className="relative z-10 -mt-[32svh] rounded-t-[32px] border-t border-[#3b444f] bg-[#262d36] pb-16 sm:-mt-[30svh] sm:rounded-t-[40px] lg:-mt-[24svh]">
        <div className="mx-auto max-w-[1280px] px-4 pt-3 sm:px-8">
          {/* drag handle + scroll hint */}
          <div className="flex flex-col items-center gap-1 pb-4">
            <span className="h-1.5 w-12 rounded-full bg-[#3b444f]" />
            <span className="flex items-center gap-1 text-xs font-semibold text-[#9ba5b0]">
              Scroll to explore <Icon name="down" size={14} />
            </span>
          </div>

          {/* search */}
          <form
            onSubmit={onSearch}
            role="search"
            className="flex items-center gap-3 rounded-[18px] border border-[#3b444f] bg-[#2f3741] py-2 pl-[18px] pr-2 focus-within:border-white lg:max-w-[760px]"
          >
            <Icon name="search" size={20} className="shrink-0 text-[#9ba5b0]" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search medicines, doctors, lab tests"
              aria-label="Search medicines, doctors, lab tests"
              className="min-w-0 flex-1 bg-transparent py-2.5 text-base font-medium outline-none placeholder:text-[#9ba5b0]"
            />
            <button
              type="submit"
              className="rounded-xl bg-white px-5 py-3 text-[15px] font-bold text-black hover:bg-[#dfe4e9]"
            >
              Search
            </button>
          </form>

          {/* category chips */}
          <div
            role="tablist"
            aria-label="Browse by category"
            className="-mx-4 mt-4 flex gap-2.5 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
          >
            {CATEGORIES.map((c) => (
              <button
                key={c}
                role="tab"
                aria-selected={active === c}
                onClick={() => setActive(c)}
                className={`shrink-0 rounded-full border px-[18px] py-2.5 text-sm font-semibold ${
                  active === c
                    ? "border-black bg-black text-white"
                    : "border-[#3b444f] bg-[#2f3741] hover:border-[#9ba5b0]"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* quick services */}
          <div className="mt-8 grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s) => (
              <a
                key={s.title}
                href="#"
                className="flex items-center gap-3.5 rounded-2xl border border-[#3b444f] bg-[#1b2128] px-4 py-3.5 hover:border-[#9ba5b0]"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#2f3741]">
                  <Icon name={s.icon} size={22} />
                </span>
                <span>
                  <strong className="block text-[15px] font-bold">{s.title}</strong>
                  <small className="mt-0.5 block text-[12.5px] text-[#9ba5b0]">{s.note}</small>
                </span>
              </a>
            ))}
          </div>

          {/* medicines near you */}
          <div id="medicines" className="mb-4 mt-12 flex items-center justify-between">
            <h2 className="text-xl font-extrabold tracking-tight sm:text-2xl">Medicines near you</h2>
            <a href="/medicines" className="text-sm font-bold underline underline-offset-4">See all</a>
          </div>
          <div className="-mx-4 flex snap-x snap-mandatory gap-3.5 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
            {PRODUCTS.map((it) => (
              <ProductCard
                key={it.id}
                item={it}
                liked={!!liked[it.id]}
                onLike={() => flip(setLiked)(it.id)}
                added={!!cart[it.id]}
                onAdd={() => flip(setCart)(it.id)}
              />
            ))}
          </div>

          {/* doctors + stats */}
          <div className="mt-12 grid gap-8 lg:grid-cols-[1.3fr_1fr]">
            <div id="doctors">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-extrabold tracking-tight sm:text-2xl">Doctors available today</h2>
                <a href="#" className="text-sm font-bold underline underline-offset-4">See all</a>
              </div>
              <div className="flex flex-col gap-2.5">
                {DOCTORS.map((d) => <DoctorRow key={d.id} doc={d} />)}
              </div>
            </div>

            <div className="flex flex-col justify-between gap-6 rounded-[24px] border border-[#3b444f] bg-[#1b2128] p-6">
              <dl className="grid grid-cols-3 gap-3 lg:grid-cols-1 lg:gap-5">
                {STATS.map((s) => (
                  <div key={s.label}>
                    <dt className="text-2xl font-extrabold tracking-tight sm:text-3xl">{s.value}</dt>
                    <dd className="mt-0.5 text-[13px] text-[#9ba5b0]">{s.label}</dd>
                  </div>
                ))}
              </dl>
              <ul className="space-y-2.5 border-t border-[#3b444f] pt-5 text-sm font-semibold text-[#9ba5b0]">
                <li className="flex items-center gap-2.5">
                  <Icon name="shield" size={18} className="text-[#5fd08a]" /> Licensed, verified pharmacies
                </li>
                <li className="flex items-center gap-2.5">
                  <Icon name="truck" size={18} className="text-[#5fd08a]" /> Free delivery over ₹499
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
