
import { Link } from "react-router-dom";

export default function Footer() {
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Medicines", path: "/medicines" },
    { name: "Doctors", path: "/doctors" },
    { name: "Categories", path: "/categories" },
    { name: "My Orders", path: "/orders" },
  ];

  const supportLinks = [
    { name: "Help Center", path: "/help" },
    { name: "Contact Us", path: "/contact" },
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms & Conditions", path: "/terms" },
  ];

  return (
    <footer className="mt-16 bg-[#101713] text-white">

      {/* TOP CTA */}
      <div className="max-w-7xl mx-auto px-5 lg:px-8 ">
        <div className="relative overflow-hidden rounded-3xl bg-[#b5f36d] p-7 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">

          <div className="relative z-10">
            <p className="text-xs font-bold uppercase tracking-widest text-[#344b24]">
              Your health matters
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold text-[#172316] mt-2">
              Healthcare, made easier.
            </h2>

            <p className="text-sm text-[#344b24] mt-2">
              Medicines and trusted doctors, all in one place.
            </p>
          </div>

          <Link
            to="/medicines"
            className="relative z-10 flex items-center gap-2 bg-[#172316] text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-[#273a29] transition"
          >
            Explore DOCmed
          </Link>

          <div className="absolute -right-5 -bottom-12 text-[#172316]/10 text-[180px] font-bold">
            +
          </div>
        </div>
      </div>

      {/* MAIN FOOTER */}
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-14">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* BRAND */}
          <div>
            <Link to="/" className="inline-flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#b5f36d] text-[#152019] text-2xl font-bold">
                +
              </div>

              <h2 className="text-2xl font-bold tracking-tight">
                DOC<span className="text-[#b5f36d]">med</span>
              </h2>

            </Link>

            <p className="mt-5 max-w-xs text-sm leading-7 text-gray-400">
              Your trusted healthcare partner. Discover medicines,
              connect with experienced doctors and get healthcare
              essentials delivered to your doorstep.
            </p>

            <div className="mt-6 flex items-center gap-2 text-sm text-gray-400">
              <span className="text-[#b5f36d] text-lg">✚</span>
              Healthcare you can trust.
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-base font-bold">
              Quick Links
            </h3>

            <div className="h-1 w-9 bg-[#b5f36d] rounded-full mt-3 mb-6" />

            <ul className="space-y-4">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="group flex items-center gap-2 text-sm text-gray-400 hover:text-[#b5f36d] transition"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-gray-600 group-hover:bg-[#b5f36d] transition" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h3 className="text-base font-bold">
              Customer Support
            </h3>

            <div className="h-1 w-9 bg-orange-400 rounded-full mt-3 mb-6" />

            <ul className="space-y-4">
              {supportLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-sm text-gray-400 hover:text-orange-400 transition"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-base font-bold">
              Get In Touch
            </h3>

            <div className="h-1 w-9 bg-[#b5f36d] rounded-full mt-3 mb-6" />

            <ul className="space-y-5 text-sm text-gray-400">

              <li className="flex items-center gap-3">
                <span className="text-[#b5f36d] text-lg">@</span>
                <a
                  href="mailto:support@docmed.com"
                  className="hover:text-white transition"
                >
                  support@docmed.com
                </a>
              </li>

              <li className="flex items-center gap-3">
                <span className="text-[#b5f36d] text-lg">☎</span>
                <a
                  href="tel:+910000000000"
                  className="hover:text-white transition"
                >
                  +91 XXXXX XXXXX
                </a>
              </li>

              <li className="flex items-center gap-3">
                <span className="text-orange-400 text-lg">⌖</span>
                India
              </li>

            </ul>

            {/* SOCIAL */}
            <div className="mt-7 flex items-center gap-3">

              <a
                href="#"
                aria-label="Facebook"
                className="h-10 w-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:bg-[#b5f36d] hover:text-[#152019] transition font-bold"
              >
                f
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="h-10 w-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:bg-orange-400 hover:text-[#152019] transition text-xl"
              >
                ◎
              </a>

            </div>
          </div>

        </div>

        {/* COPYRIGHT */}
        <div className="border-t border-white/10 mt-14 pt-7 flex flex-col sm:flex-row items-center justify-between gap-4">

          <p className="text-xs text-gray-500 text-center">
            © {new Date().getFullYear()} DOCmed. All rights reserved.
          </p>

          <p className="text-xs text-gray-500 flex items-center gap-2">
            Made for better healthcare
            <span className="text-[#b5f36d] text-base">♥</span>
          </p>

        </div>

      </div>
    </footer>
  );
}
