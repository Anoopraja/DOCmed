
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Store,
  ShoppingBag,
  Package,
  IndianRupee,
  UserRound,
  ShieldCheck,
  LogOut,
  RefreshCw,
  LoaderCircle,
  AlertCircle,
  ArrowUpRight,
  Activity,
  Pill,
  Clock,
  CheckCircle,
  XCircle,
  Settings,
  CalendarDays,
} from "lucide-react";

import api from "../../../api/api.js";

const AdminProfile = () => {
  const navigate = useNavigate();

  const [admin, setAdmin] = useState(null);
  const [stats, setStats] = useState({
    buyers: 0,
    shopowners: 0,
    orders: 0,
    medicines: 0,
    pending: 0,
    accepted: 0,
    rejected: 0,
    revenue: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch admin profile and dashboard statistics
  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const profileResponse = await api.get("/admin/me");

      setAdmin(profileResponse.data.admin);

      // These endpoints must be implemented in your backend.
      const [
        buyersResponse,
        shopsResponse,
        ordersResponse,
        medicinesResponse,
      ] = await Promise.all([
        api.get("/admin/buyers/count"),
        api.get("/admin/shopowners/count"),
        api.get("/admin/orders/count"),
        api.get("/admin/medicines/count"),
      ]);

      setStats({
        buyers: buyersResponse.data.count || 0,
        shopowners: shopsResponse.data.count || 0,
        orders: ordersResponse.data.count || 0,
        medicines: medicinesResponse.data.count || 0,
        pending: ordersResponse.data.pending || 0,
        accepted: ordersResponse.data.accepted || 0,
        rejected: ordersResponse.data.rejected || 0,
        revenue: ordersResponse.data.revenue || 0,
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to load admin dashboard."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  // Admin logout
  const handleLogout = async () => {
    try {
      await api.post("/admin/logout");
      setAdmin(null);
      navigate("/admin/login");
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to logout."
      );
    }
  };

  const quickStats = [
    {
      title: "Total Buyers",
      value: stats.buyers,
      icon: Users,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      path: "/admin/buyers",
    },
    {
      title: "Shop Owners",
      value: stats.shopowners,
      icon: Store,
      color: "text-purple-400",
      bg: "bg-purple-400/10",
      path: "/admin/shopowners",
    },
    {
      title: "Total Orders",
      value: stats.orders,
      icon: ShoppingBag,
      color: "text-orange-400",
      bg: "bg-orange-400/10",
      path: "/admin/orders",
    },
    {
      title: "Medicines",
      value: stats.medicines,
      icon: Pill,
      color: "text-[#b5f36d]",
      bg: "bg-[#b5f36d]/10",
      path: "/admin/medicines",
    },
  ];

  const orderStats = [
    {
      title: "Pending Orders",
      value: stats.pending,
      icon: Clock,
      color: "text-orange-400",
    },
    {
      title: "Accepted Orders",
      value: stats.accepted,
      icon: CheckCircle,
      color: "text-[#b5f36d]",
    },
    {
      title: "Rejected Orders",
      value: stats.rejected,
      icon: XCircle,
      color: "text-red-400",
    },
  ];

  const managementLinks = [
    {
      title: "Manage Buyers",
      description: "View and manage registered customers.",
      icon: Users,
      path: "/admin/buyers",
    },
    {
      title: "Manage Shopowners",
      description: "Monitor registered pharmacies and owners.",
      icon: Store,
      path: "/admin/shopowners",
    },
    {
      title: "Manage Orders",
      description: "Monitor all platform orders.",
      icon: ShoppingBag,
      path: "/admin/orders",
    },
    {
      title: "Manage Medicines",
      description: "Control medicine listings and categories.",
      icon: Package,
      path: "/admin/medicines",
    },
    {
      title: "Manage Profile",
      description: "View your administrator account.",
      icon: Settings,
      path: "/admin/settings",
    },
  ];

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#101713] text-white">
        <LoaderCircle className="h-10 w-10 animate-spin text-[#b5f36d]" />
        <p className="mt-4 text-sm text-gray-400">
          Loading admin dashboard...
        </p>
      </div>
    );
  }

  if (!admin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#101713] px-5 text-white">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#1b211e] p-8 text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-red-400" />

          <h2 className="mt-4 text-2xl font-bold">
            Admin Profile Unavailable
          </h2>

          <p className="mt-3 text-sm text-gray-400">
            {error || "Please login with your admin account."}
          </p>

          <Link
            to="/admin/login"
            className="mt-6 inline-flex rounded-xl bg-[#b5f36d] px-6 py-3 font-bold text-[#152019] hover:bg-orange-400"
          >
            Admin Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#101713] px-4 py-8 text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <header className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#b5f36d]">
              <ShieldCheck size={18} />
              DOCmed Administration
            </div>

            <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">
              Admin Dashboard
            </h1>

            <p className="mt-2 text-sm text-gray-400">
              Monitor and manage your healthcare platform.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={fetchDashboard}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-[#1b211e] px-4 py-3 text-sm font-semibold text-gray-300 transition hover:text-[#b5f36d]"
            >
              <RefreshCw size={17} />
              Refresh
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-400 transition hover:bg-red-500 hover:text-white"
            >
              <LogOut size={17} />
              Logout
            </button>
          </div>
        </header>

        {/* ERROR */}
        {error && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
            <AlertCircle size={19} />
            {error}
          </div>
        )}

        {/* ADMIN PROFILE CARD */}
        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#1b211e] p-6 sm:p-9">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#b5f36d]/10 blur-3xl" />

          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">

            <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-[#b5f36d] text-3xl font-extrabold text-[#152019]">
              {admin.profileImage ? (
                <img
                  src={admin.profileImage}
                  alt={admin.username || "Admin"}
                  className="h-full w-full object-cover"
                />
              ) : (
                (admin.username || "A").charAt(0).toUpperCase()
              )}
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-2xl font-bold">
                  {admin.username || "Administrator"}
                </h2>

                <span className="inline-flex items-center gap-1 rounded-full border border-[#b5f36d]/20 bg-[#b5f36d]/10 px-3 py-1 text-xs font-bold text-[#b5f36d]">
                  <ShieldCheck size={13} />
                  ADMIN
                </span>
              </div>

              <p className="mt-2 text-sm text-gray-400">
                {admin.email || admin.gmail || "Email unavailable"}
              </p>

              <p className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                <CalendarDays size={14} />
                Administrator Account
              </p>
            </div>

            <div className="rounded-xl border border-[#b5f36d]/20 bg-[#b5f36d]/5 p-4">
              <p className="text-xs text-gray-500">
                Account Status
              </p>
              <p className="mt-2 flex items-center gap-2 font-bold text-[#b5f36d]">
                <Activity size={17} />
                Active
              </p>
            </div>
          </div>
        </section>

        {/* PLATFORM STATISTICS */}
        <section className="mt-10">
          <div className="mb-5">
            <h2 className="text-xl font-bold">
              Platform Overview
            </h2>
            <p className="mt-1 text-sm text-gray-400">
              Overall DOCmed platform statistics.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {quickStats.map((stat) => {
              const Icon = stat.icon;

              return (
                <Link
                  key={stat.title}
                  to={stat.path}
                  className="rounded-2xl border border-white/10 bg-[#1b211e] p-5 transition hover:-translate-y-1 hover:border-[#b5f36d]/30"
                >
                  <div className="flex items-center justify-between">
                    <div className={`rounded-xl p-3 ${stat.bg} ${stat.color}`}>
                      <Icon size={22} />
                    </div>

                    <ArrowUpRight size={18} className="text-gray-500" />
                  </div>

                  <p className="mt-5 text-sm text-gray-400">
                    {stat.title}
                  </p>

                  <h3 className="mt-1 text-3xl font-extrabold">
                    {stat.value}
                  </h3>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ORDER OVERVIEW */}
        <section className="mt-10">
          <h2 className="text-xl font-bold">
            Order Overview
          </h2>

          <p className="mt-1 text-sm text-gray-400">
            Monitor order processing across all pharmacies.
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {orderStats.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-[#1b211e] p-5"
                >
                  <div className="flex items-center gap-3">
                    <Icon size={22} className={item.color} />
                    <p className="text-sm text-gray-400">
                      {item.title}
                    </p>
                  </div>

                  <h3 className={`mt-4 text-3xl font-bold ${item.color}`}>
                    {item.value}
                  </h3>
                </div>
              );
            })}
          </div>
        </section>

        {/* REVENUE */}
        <section className="mt-5 rounded-2xl border border-[#b5f36d]/20 bg-[#b5f36d]/5 p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-[#b5f36d]/10 p-3 text-[#b5f36d]">
              <IndianRupee size={25} />
            </div>

            <div>
              <p className="text-sm text-gray-400">
                Reported Order Revenue
              </p>

              <h2 className="mt-1 text-3xl font-extrabold text-[#b5f36d]">
                ₹{stats.revenue.toLocaleString("en-IN")}
              </h2>
            </div>
          </div>

          <p className="mt-3 text-xs text-gray-500">
            Revenue definition must be determined by your backend.
            This value should not automatically be treated as platform profit.
          </p>
        </section>

        {/* MANAGEMENT */}
        <section className="mt-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">
              Platform Management
            </h2>

            <p className="mt-2 text-sm text-gray-400">
              Access and manage DOCmed platform resources.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {managementLinks.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.title}
                  to={item.path}
                  className="group rounded-2xl border border-white/10 bg-[#1b211e] p-6 transition hover:-translate-y-1 hover:border-[#b5f36d]/30"
                >
                  <div className="flex items-center justify-between">
                    <div className="rounded-xl bg-[#b5f36d]/10 p-3 text-[#b5f36d]">
                      <Icon size={24} />
                    </div>

                    <ArrowUpRight
                      size={20}
                      className="text-gray-500 transition group-hover:text-[#b5f36d]"
                    />
                  </div>

                  <h3 className="mt-5 font-bold">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-400">
                    {item.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="mt-12 border-t border-white/10 py-7 text-center text-sm text-gray-500">
          DOCmed Admin Dashboard · Manage your healthcare ecosystem.
        </footer>

      </div>
    </main>
  );
};

export default AdminProfile;
