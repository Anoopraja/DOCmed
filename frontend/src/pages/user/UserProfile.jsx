
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  UserRound,
  Mail,
  Phone,
  ShoppingBag,
  Heart,
  MapPin,
  LogOut,
  Settings,
  ArrowRight,
  Package,
  ShieldCheck,
  LoaderCircle,
  AlertCircle,
  CalendarDays,
} from "lucide-react";

import api from "../../../api/api.js";

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch logged-in buyer details
  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data } = await api.get("/user/me");
        setUser(data.user);
      } catch (err) {
        setError(
          err.response?.data?.message || "Unable to load your profile."
        );
      } finally {
        setLoading(false);
      }
    };

    getProfile();
  }, []);

  // Logout buyer
  const handleLogout = async () => {
    try {
      await api.post("/user/logout");
      setUser(null);
      navigate("/user/login");
    } catch (err) {
      console.error("Logout failed:", err);
      setError("Unable to logout. Please try again.");
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#101713] flex flex-col items-center justify-center text-white">
        <LoaderCircle className="w-10 h-10 text-[#b5f36d] animate-spin" />
        <p className="mt-4 text-gray-400">Loading your profile...</p>
      </div>
    );
  }

  // Authentication / API error
  if (!user) {
    return (
      <div className="min-h-screen bg-[#101713] flex items-center justify-center px-5">
        <div className="max-w-md w-full rounded-3xl border border-white/10 bg-[#18231c] p-8 text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-orange-400" />

          <h2 className="mt-4 text-2xl font-bold text-white">
            Profile unavailable
          </h2>

          <p className="mt-3 text-sm text-gray-400">
            {error || "Please login to view your profile."}
          </p>

          <Link
            to="/user/login"
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-[#b5f36d] px-6 py-3 font-bold text-[#152019] transition hover:bg-orange-400"
          >
            Login to continue
          </Link>
        </div>
      </div>
    );
  }

  const fullName = user.username || "DOCmed Buyer";
  const email = user.gmail || user.email || "Email not available";
  const phone = user.phone || "Not added yet";

  const joinedDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Not available";

  const quickLinks = [
    {
      title: "My Orders",
      description: "Track and manage your orders",
      icon: Package,
      path: "/user/orders",
      color: "text-[#b5f36d]",
      bg: "bg-[#b5f36d]/10",
    },
    {
      title: "Wishlist",
      description: "Your saved medicines",
      icon: Heart,
      path: "/wishlist",
      color: "text-orange-400",
      bg: "bg-orange-400/10",
    },
    {
      title: "Shopping Cart",
      description: "View your selected products",
      icon: ShoppingBag,
      path: "/cart",
      color: "text-blue-400",
      bg: "bg-blue-400/10",
    },
  ];

  return (
    <main className="min-h-screen bg-[#101713] px-4 py-10 text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">

        {/* HEADER */}
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b5f36d]">
            DOCmed / Account
          </p>

          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
            My Profile
          </h1>

          <p className="mt-2 text-gray-400">
            Manage your personal information and healthcare activities.
          </p>
        </div>

        {/* PROFILE CARD */}
        <section className="overflow-hidden rounded-3xl border border-white/10 bg-[#18231c]">

          {/* COVER */}
          <div className="h-36 bg-gradient-to-r from-[#263c2d] via-[#334a32] to-[#b5f36d]/30 sm:h-48" />

          <div className="px-6 pb-7 sm:px-9">

            {/* USER INFORMATION */}
            <div className="-mt-12 flex flex-col gap-5 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">

              <div className="flex flex-col gap-4 sm:flex-row sm:items-end">

                {/* PROFILE IMAGE */}
                <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl border-4 border-[#18231c] bg-[#b5f36d] text-4xl font-bold text-[#152019] sm:h-28 sm:w-28">
                  {user.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt={fullName}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    fullName.charAt(0).toUpperCase()
                  )}
                </div>

                <div className="pb-1">
                  <h2 className="text-2xl font-bold">{fullName}</h2>

                  <p className="mt-1 text-sm text-gray-400">
                    {email}
                  </p>

                  <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-[#b5f36d]/20 bg-[#b5f36d]/10 px-3 py-1 text-xs font-semibold text-[#b5f36d]">
                    <ShieldCheck size={14} />
                    Buyer Account
                  </span>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-3 text-sm font-semibold text-red-400 transition hover:bg-red-500 hover:text-white"
              >
                <LogOut size={17} />
                Logout
              </button>
            </div>
          </div>
        </section>

        {/* ACCOUNT DETAILS */}
        <section className="mt-9">
          <div className="mb-5">
            <h2 className="text-xl font-bold">Personal Information</h2>
            <p className="mt-1 text-sm text-gray-400">
              Your registered account details.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">

            {/* NAME */}
            <div className="rounded-2xl border border-white/10 bg-[#18231c] p-5">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-[#b5f36d]/10 p-3 text-[#b5f36d]">
                  <UserRound size={20} />
                </div>

                <div>
                  <p className="text-xs text-gray-400">Full Name</p>
                  <p className="mt-1 font-semibold">{fullName}</p>
                </div>
              </div>
            </div>

            {/* EMAIL */}
            <div className="rounded-2xl border border-white/10 bg-[#18231c] p-5">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-orange-400/10 p-3 text-orange-400">
                  <Mail size={20} />
                </div>

                <div className="min-w-0">
                  <p className="text-xs text-gray-400">Email Address</p>
                  <p className="mt-1 break-all font-semibold">{email}</p>
                </div>
              </div>
            </div>

            {/* PHONE */}
            <div className="rounded-2xl border border-white/10 bg-[#18231c] p-5">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-blue-400/10 p-3 text-blue-400">
                  <Phone size={20} />
                </div>

                <div>
                  <p className="text-xs text-gray-400">Phone Number</p>
                  <p className="mt-1 font-semibold">{phone}</p>
                </div>
              </div>
            </div>

            {/* JOINED DATE */}
            <div className="rounded-2xl border border-white/10 bg-[#18231c] p-5">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-purple-400/10 p-3 text-purple-400">
                  <CalendarDays size={20} />
                </div>

                <div>
                  <p className="text-xs text-gray-400">Member Since</p>
                  <p className="mt-1 font-semibold">{joinedDate}</p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* QUICK LINKS */}
        <section className="mt-10">
          <div className="mb-5">
            <h2 className="text-xl font-bold">Your Activities</h2>
            <p className="mt-1 text-sm text-gray-400">
              Quickly access your DOCmed activities.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {quickLinks.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.title}
                  to={item.path}
                  className="group rounded-2xl border border-white/10 bg-[#18231c] p-5 transition hover:-translate-y-1 hover:border-[#b5f36d]/40"
                >
                  <div className="flex items-center justify-between">
                    <div className={`rounded-xl p-3 ${item.bg} ${item.color}`}>
                      <Icon size={23} />
                    </div>

                    <ArrowRight
                      size={20}
                      className="text-gray-500 transition group-hover:translate-x-1 group-hover:text-[#b5f36d]"
                    />
                  </div>

                  <h3 className="mt-5 font-bold">{item.title}</h3>

                  <p className="mt-2 text-sm text-gray-400">
                    {item.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>

        {/* FOOTER ACTION */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-[#b5f36d]/20 bg-[#b5f36d]/5 p-6 sm:flex-row">
          <div>
            <h3 className="font-bold text-[#b5f36d]">
              Your Health, Our Priority
            </h3>
            <p className="mt-1 text-sm text-gray-400">
              Explore medicines and healthcare services with DOCmed.
            </p>
          </div>

          <Link
            to="/medicines"
            className="inline-flex items-center gap-2 rounded-xl bg-[#b5f36d] px-5 py-3 text-sm font-bold text-[#152019] transition hover:bg-orange-400"
          >
            Explore Medicines
            <ArrowRight size={17} />
          </Link>
        </div>

      </div>
    </main>
  );
};

export default Profile;
