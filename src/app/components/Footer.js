
import Link from "next/link";
import {
  Pill,
  Heart,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
} from "lucide-react";

const footerLinks = {
  "Quick Links": [
    { name: "Home", href: "/" },
    { name: "Medicines", href: "/medicines" },
    { name: "Categories", href: "/categories" },
    { name: "About Us", href: "/about" },
  ],
  "Customer Support": [
    { name: "My Account", href: "/profile" },
    { name: "My Orders", href: "/orders" },
    { name: "Shopping Cart", href: "/cart" },
    { name: "Contact Us", href: "/contact" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-green-950 relative bottom-0 w-full text-green-50">
      {/* Main footer */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 py-12 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:py-16">
        {/* Brand */}
        <div>
          <Link href="/" className="mb-4 inline-flex items-center gap-2">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-500 text-white">
              <Pill size={24} />
            </div>

            <span className="text-2xl font-extrabold">
              DOC<span className="text-green-400">med</span>
            </span>
          </Link>

          <p className="max-w-xs text-sm leading-7 text-green-100/70">
            Your trusted healthcare companion. Find medicines and healthcare
            essentials with a simple shopping experience.
          </p>

          <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-green-900 px-3 py-2 text-xs text-green-200">
            <Heart size={15} className="fill-green-400 text-green-400" />
            Caring for your health
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <h2 className="mb-5 text-base font-bold text-white">{title}</h2>

            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-2 text-sm text-green-100/70 transition hover:translate-x-1 hover:text-green-300"
                  >
                    <ArrowRight size={14} />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Contact */}
        <div>
          <h2 className="mb-5 text-base font-bold text-white">
            Get in Touch
          </h2>

          <ul className="space-y-4 text-sm text-green-100/70">
            <li className="flex items-start gap-3">
              <MapPin size={19} className="mt-0.5 shrink-0 text-green-400" />
              <span>Your business address here</span>
            </li>

            <li className="flex items-center gap-3">
              <Phone size={18} className="shrink-0 text-green-400" />
              <a href="tel:+910000000000" className="hover:text-green-300">
                +91 XXXXX XXXXX
              </a>
            </li>

            <li className="flex items-center gap-3">
              <Mail size={18} className="shrink-0 text-green-400" />
              <a
                href="mailto:support@example.com"
                className="break-all hover:text-green-300"
              >
                support@example.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-green-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-5 text-center text-xs text-green-100/60 sm:flex-row sm:px-8 sm:text-left">
          <p>
            {/* © {new Date().getFullYear()} DOCmed. All rights reserved. */}
          </p>

          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-green-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-green-300">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
