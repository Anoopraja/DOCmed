import ProductCard from "../pages/ProductCard.jsx";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api.js";
const QUOTE = "The greatest wealth is health.";
const QUOTE_BY = "Virgil";

const SERVICES = [
  {
    title: "Order medicines",
    note: "Delivery in 2 hrs",
    icon: "pill",
    to: "/medicines",
  },
  {
    title: "Book a doctor",
    note: "Video or clinic",
    icon: "doctor",
    to: "/doctors",
  },
  {
    title: "Book lab test",
    note: "Home sample pickup",
    icon: "flask",
    to: "/lab-tests",
  },
  {
    title: "Upload prescription",
    note: "We pack it for you",
    icon: "upload",
    to: "/prescription",
  },
];

const DOCTORS = [
  {
    id: 1,
    name: "Dr. Ananya Sharma",
    spec: "General Physician",
    exp: "12 yrs",
    fee: 300,
    slot: "Today, 5:30 PM",
    initials: "AS",
  },
  {
    id: 2,
    name: "Dr. Rohit Verma",
    spec: "Dermatologist",
    exp: "9 yrs",
    fee: 600,
    slot: "Today, 7:15 PM",
    initials: "RV",
  },
  {
    id: 3,
    name: "Dr. Meera Iyer",
    spec: "Pediatrician",
    exp: "15 yrs",
    fee: 500,
    slot: "Tomorrow, 10:00 AM",
    initials: "MI",
  },
];

const STATS = [
  { value: "2 hrs", label: "Medicine delivery" },
  { value: "8,000+", label: "Verified doctors" },
  { value: "100%", label: "Genuine products" },
];

// INLINE SVG ICONS
function Icon({ name, size = 20, className = "" }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className,
    "aria-hidden": true,
  };

  const paths = {
    pin: (
      <>
        <path d="M12 21s7-6.2 7-11.5a7 7 0 0 0-14 0C5 14.8 12 21 12 21Z" />
        <circle cx="12" cy="9.5" r="2.5" />
      </>
    ),
    pill: (
      <>
        <rect
          x="3"
          y="9"
          width="18"
          height="6"
          rx="3"
          transform="rotate(-35 12 12)"
        />
        <path d="m9 8.5 6 6" />
      </>
    ),
    doctor: (
      <>
        <path d="M6 3v6a4 4 0 0 0 8 0V3" />
        <path d="M10 13v2a5 5 0 0 0 10 0v-2" />
        <circle cx="20" cy="11" r="2" />
      </>
    ),
    flask: (
      <path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3" />
    ),
    upload: (
      <>
        <path d="M12 16V4M7 9l5-5 5 5" />
        <path d="M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" />
      </>
    ),
    shield: (
      <>
        <path d="M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    truck: (
      <>
        <path d="M3 6h11v10H3zM14 9h4l3 3v4h-7" />
        <circle cx="7" cy="17" r="1.8" />
        <circle cx="17" cy="17" r="1.8" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    down: <path d="m6 9 6 6 6-6" />,
  };

  return <svg {...common}>{paths[name] || null}</svg>;
}

// INTERACTIVE DOT BACKGROUND
function HeroDots() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const GAP = 28;
    const RADIUS = 170;

    let w = 0;
    let h = 0;
    let raf = 0;

    const target = { x: -9999, y: -9999, on: 0 };
    const current = { x: -9999, y: -9999, s: 0 };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      const cols = Math.ceil(w / GAP) + 1;
      const rows = Math.ceil(h / GAP) + 1;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * GAP + GAP / 2;
          const y = j * GAP + GAP / 2;

          const d = Math.hypot(
            x - current.x,
            y - current.y
          );

          let t = Math.max(0, 1 - d / RADIUS) * current.s;
          t = t * t * (3 - 2 * t);

          const radius = 1.3 + t * 3.6;

          const r = Math.round(48 + (249 - 48) * t);
          const g = Math.round(61 + (115 - 61) * t);
          const b = Math.round(53 + (22 - 53) * t);

          ctx.fillStyle = `rgb(${r},${g},${b})`;
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      w = rect.width;
      h = rect.height;

      canvas.width = w * dpr;
      canvas.height = h * dpr;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };

    const tick = () => {
      current.x += (target.x - current.x) * 0.18;
      current.y += (target.y - current.y) * 0.18;
      current.s += (target.on - current.s) * 0.12;

      draw();

      const moving =
        Math.abs(target.x - current.x) > 0.5 ||
        Math.abs(target.y - current.y) > 0.5 ||
        Math.abs(target.on - current.s) > 0.01;

      raf = moving ? requestAnimationFrame(tick) : 0;
    };

    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const move = (e) => {
      const rect = canvas.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (
        x < 0 ||
        x > rect.width ||
        y < 0 ||
        y > rect.height
      ) {
        target.on = 0;
      } else {
        if (current.s < 0.02) {
          current.x = x;
          current.y = y;
        }

        target.x = x;
        target.y = y;
        target.on = 1;
      }

      kick();
    };

    const leave = () => {
      target.on = 0;
      kick();
    };

    resize();

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    if (!reduce) {
      window.addEventListener("pointermove", move, {
        passive: true,
      });
      window.addEventListener("pointerdown", move, {
        passive: true,
      });
      window.addEventListener("pointerup", leave);
      window.addEventListener("blur", leave);
    }

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();

      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", move);
      window.removeEventListener("pointerup", leave);
      window.removeEventListener("blur", leave);
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

// DOCTOR CARD
function DoctorRow({ doc }) {
  return (
    <div className="flex items-center gap-3.5 rounded-2xl border border-[#303D35] bg-[#1D2822] p-3">
      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#0B0F0E] text-[15px] font-extrabold">
        {doc.initials}
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-extrabold">
          {doc.name}
        </h3>

        <p className="text-xs text-[#A1AAA3]">
          {doc.spec} • {doc.exp}
        </p>

        <p className="mt-0.5 flex items-center gap-1.5 text-xs font-semibold text-[#22C55E]">
          <Icon name="clock" size={13} />
          {doc.slot}
        </p>
      </div>

      <div className="flex flex-col items-end gap-2">
        <span className="text-sm font-extrabold">
          ₹{doc.fee}
        </span>

        <Link
          to="/doctors"
          className="rounded-full border border-[#303D35] px-[18px] py-1.5 text-[13px] font-bold transition hover:border-[#F97316] hover:bg-[#F97316] hover:text-white"
        >
          Book
        </Link>
      </div>
    </div>
  );
}

const Product = async (req, res) => {
  try {
    const products = await api.get("/product/allproducts");

    return res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// MAIN HOME PAGE
export default function Home() {
  const [p, setP] = useState(0);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      cancelAnimationFrame(raf);

      raf = requestAnimationFrame(() => {
        const range = window.innerHeight * 0.6;

        setP(
          Math.min(
            1,
            Math.max(0, window.scrollY / range)
          )
        );
      });
    };

    update();

    window.addEventListener("scroll", update, {
      passive: true,
    });

    window.addEventListener("resize", update);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await api.get("/product/allproducts");
  //       setProducts(response.data.data ?? []);
  //     }
  //     catch (error) {
  //       return console.error("Error fetching products:", error);
  //     }
  //   }
  //   fetchProducts();
  // }, []);

  return (
    <main className="relative bg-[#0B0F0E] font-['Manrope',system-ui,sans-serif] text-[#F5F7F5] antialiased">

      {/* FONT */}
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');`}
      </style>

      {/* HERO */}
      <section
        aria-label="Welcome"
        className="sticky top-0 h-[100svh] min-h-[560px] overflow-hidden bg-[#0B0F0E]"
      >
        <HeroDots />

        <div
          className="relative z-10 mx-auto flex h-full max-w-[1280px] flex-col justify-center px-5 pb-[34svh] pt-24 sm:px-8 lg:pb-[26svh]"
          style={{
            filter: `blur(${(p * 18).toFixed(1)}px)`,
            transform: `scale(${(1 + p * 0.05).toFixed(3)})`,
            opacity: 1 - p * 0.45,
            willChange: "filter, transform",
          }}
        >
          <p className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-[#303D35] bg-[#1D2822] px-3.5 py-2 text-[13px] font-semibold">
            <Icon name="pin" size={15} />
            Delivering to Jamui, Bihar
          </p>

          <blockquote>
            <p className="mb-3 text-sm font-extrabold uppercase tracking-[0.22em] text-[#F97316]">
              Your health, our priority
            </p>

            <p className="max-w-[16ch] text-[clamp(44px,10vw,148px)] font-extrabold leading-[0.98] tracking-[-0.035em]">
              “{QUOTE}”
            </p>

            <footer className="mt-6 text-base font-semibold text-[#A1AAA3] sm:text-lg">
              {QUOTE_BY}
            </footer>
          </blockquote>

          <p className="mt-8 max-w-[44ch] text-base leading-relaxed text-[#A1AAA3] sm:text-lg">
            Medicines, doctors and lab tests from verified
            pharmacies and clinics near you.
          </p>
        </div>

        {/* SCROLL DIM LAYER */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[#0B0F0E]"
          style={{ opacity: p * 0.5 }}
        />
      </section>

      {/* MAIN CONTENT */}

      {/* <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {products.slice(0, 5).map((product) => (
          <ProductCard
            key={product._id}
            product={product}
          />
        ))}
      </div> */}
      <div className="relative z-10 -mt-[32svh] rounded-t-[32px] border-t border-[#303D35] bg-[#151C19] pb-16 sm:-mt-[30svh] sm:rounded-t-[40px] lg:-mt-[24svh]">

        <div className="mx-auto max-w-[1280px] px-4 pt-3 sm:px-8">

          {/* SCROLL HINT */}
          <div className="flex flex-col items-center gap-1 pb-4">
            <span className="h-1.5 w-12 rounded-full bg-[#303D35]" />

            <span className="flex items-center gap-1 text-xs font-semibold text-[#A1AAA3]">
              Scroll to explore
              <Icon name="down" size={14} />
            </span>
          </div>

          {/* QUICK SERVICES */}
          <div className="mt-8 grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((service) => (
              <Link
                key={service.title}
                to={service.to}
                className="flex items-center gap-3.5 rounded-2xl border border-[#303D35] bg-[#0B0F0E] px-4 py-3.5 transition hover:border-[#F97316]"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#1D2822]">
                  <Icon name={service.icon} size={22} />
                </span>

                <span>
                  <strong className="block text-[15px] font-bold">
                    {service.title}
                  </strong>

                  <small className="mt-0.5 block text-[12.5px] text-[#A1AAA3]">
                    {service.note}
                  </small>
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-between">
            <h2 className="text-xl font-extrabold tracking-tight sm:text-2xl">
              Featured Products
            </h2>     
            <Link
              to="/medicines"
              className="text-sm font-bold text-[#F97316] underline underline-offset-4"
            >
              See all
            </Link>
          </div>

          {/* DOCTORS AND STATS */}
          <div className="mt-12 grid gap-8 lg:grid-cols-[1.3fr_1fr]">

            {/* DOCTORS */}
            <div id="doctors">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-extrabold tracking-tight sm:text-2xl">
                  Doctors available today
                </h2>

                <Link
                  to="/doctors"
                  className="text-sm font-bold text-[#F97316] underline underline-offset-4"
                >
                  See all
                </Link>
              </div>

              <div className="flex flex-col gap-2.5">
                {DOCTORS.map((doc) => (
                  <DoctorRow key={doc.id} doc={doc} />
                ))}
              </div>
            </div>

            {/* STATS */}
            <div className="flex flex-col justify-between gap-6 rounded-[24px] border border-[#303D35] bg-[#0B0F0E] p-6">

              <dl className="grid grid-cols-3 gap-3 lg:grid-cols-1 lg:gap-5">
                {STATS.map((stat) => (
                  <div key={stat.label}>
                    <dt className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                      {stat.value}
                    </dt>

                    <dd className="mt-0.5 text-[13px] text-[#A1AAA3]">
                      {stat.label}
                    </dd>
                  </div>
                ))}
              </dl>

              <ul className="space-y-2.5 border-t border-[#303D35] pt-5 text-sm font-semibold text-[#A1AAA3]">
                <li className="flex items-center gap-2.5">
                  <Icon
                    name="shield"
                    size={18}
                    className="text-[#22C55E]"
                  />
                  Licensed, verified pharmacies
                </li>

                <li className="flex items-center gap-2.5">
                  <Icon
                    name="truck"
                    size={18}
                    className="text-[#22C55E]"
                  />
                  Free delivery over ₹499
                </li>
              </ul>

            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
