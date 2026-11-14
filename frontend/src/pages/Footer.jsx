// import {
//   Activity,
//   MapPin,
//   Mail,
//   Phone,
//   Facebook,
//   Instagram,
// } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-12 bg-[#151f28]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-9 px-5 py-10 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">

        {/* BRAND */}
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400 text-[#111920]">
              {/* <Activity size={23} /> */}
            </div>

            <h2 className="text-xl font-bold">
              DOC<span className="text-emerald-400">med</span>
            </h2>
          </div>

          <p className="mt-4 max-w-xs text-sm leading-6 text-gray-400">
            Your trusted healthcare partner. Find medicines
            and healthcare essentials with ease.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-sm font-semibold text-white">
            Quick Links
          </h3>

          <ul className="mt-4 space-y-3 text-sm text-gray-400">
            {["Home", "Medicines", "Categories", "My Orders"].map(
              (item) => (
                <li key={item}>
                  <a
                    href={item === "Home" ? "/" : "#medicines"}
                    className="transition hover:text-emerald-400"
                  >
                    {item}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h3 className="text-sm font-semibold text-white">
            Customer Support
          </h3>

          <ul className="mt-4 space-y-4 text-sm text-gray-400">
            <li>
              <a href="#" className="hover:text-emerald-400">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-emerald-400">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-emerald-400">
                Terms & Conditions
              </a>
            </li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-sm font-semibold text-white">
            Contact Us
          </h3>

          <ul className="mt-4 space-y-4 text-sm text-gray-400">
            <li className="flex items-center gap-3">
              {/* <Mail size={17} className="text-emerald-400" /> */}
              support@docmed.com
            </li>

            <li className="flex items-center gap-3">
              {/* <Phone size={17} className="text-emerald-400" /> */}
              +91 XXXXX XXXXX
            </li>

            <li className="flex items-center gap-3">
              {/* <MapPin size={17} className="text-emerald-400" /> */}
              India
            </li>
          </ul>

          <div className="mt-5 flex gap-4 text-gray-400">
            <a href="#" aria-label="Facebook" className="hover:text-emerald-400">
              {/* <Facebook size={19} /> */}
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-emerald-400">
              {/* <Instagram size={19} /> */}
            </a>
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="bg-[#111920] px-4 py-5 text-center">
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} DOCmed. All rights reserved.
        </p>
      </div>
    </footer>
  );
}