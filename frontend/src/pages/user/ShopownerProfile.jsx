
import { useEffect, useMemo, useState } from "react";
import {
  Package,
  Clock,
  CheckCircle,
  XCircle,
  ShoppingBag,
  Search,
  Eye,
  MapPin,
  Phone,
  UserRound,
  RefreshCw,
  Store,
  IndianRupee,
  CalendarDays,
  X,
  AlertCircle,
  LoaderCircle,
} from "lucide-react";

import api from "../../../api/api.js";

const ShopownerProfile = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [error, setError] = useState("");

  const [activeTab, setActiveTab] = useState("pending");
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Fetch pharmacy orders
  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const { data } = await api.get("/shopowner/orders");

      setOrders(data.orders || []);
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to fetch orders."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Accept or reject an order
  const updateOrderStatus = async (orderId, status) => {
    const action = status === "accepted" ? "accept" : "reject";

    const confirmed = window.confirm(
      `Are you sure you want to ${action} this order?`
    );

    if (!confirmed) return;

    try {
      setUpdatingId(orderId);
      setError("");

      await api.patch(`/shopowner/orders/${orderId}/status`, {
        status,
      });

      // Update local state after successful API response
      setOrders((previousOrders) =>
        previousOrders.map((order) =>
          order._id === orderId
            ? { ...order, status }
            : order
        )
      );

      setSelectedOrder((previousOrder) =>
        previousOrder?._id === orderId
          ? { ...previousOrder, status }
          : previousOrder
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          `Unable to ${action} this order.`
      );
    } finally {
      setUpdatingId(null);
    }
  };

  // Dashboard statistics
  const pendingCount = orders.filter(
    (order) => order.status === "pending"
  ).length;

  const acceptedCount = orders.filter(
    (order) => order.status === "accepted"
  ).length;

  const rejectedCount = orders.filter(
    (order) => order.status === "rejected"
  ).length;

  const completedCount = orders.filter(
    (order) => order.status === "completed"
  ).length;

  // Filter orders
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesTab =
        activeTab === "all" || order.status === activeTab;

      const customerName =
        order.user?.username || order.customerName || "";

      const orderId = order._id || "";

      const matchesSearch =
        customerName.toLowerCase().includes(search.toLowerCase()) ||
        orderId.toLowerCase().includes(search.toLowerCase());

      return matchesTab && matchesSearch;
    });
  }, [orders, activeTab, search]);

  const stats = [
    {
      title: "Total Orders",
      value: orders.length,
      icon: ShoppingBag,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
    },
    {
      title: "Pending Orders",
      value: pendingCount,
      icon: Clock,
      color: "text-orange-400",
      bg: "bg-orange-400/10",
    },
    {
      title: "Accepted Orders",
      value: acceptedCount,
      icon: CheckCircle,
      color: "text-[#b5f36d]",
      bg: "bg-[#b5f36d]/10",
    },
    {
      title: "Rejected Orders",
      value: rejectedCount,
      icon: XCircle,
      color: "text-red-400",
      bg: "bg-red-400/10",
    },
  ];

  const tabs = [
    { label: "All Orders", value: "all" },
    { label: "Pending", value: "pending" },
    { label: "Accepted", value: "accepted" },
    { label: "Rejected", value: "rejected" },
    { label: "Completed", value: "completed" },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case "accepted":
        return "bg-[#b5f36d]/10 text-[#b5f36d] border-[#b5f36d]/20";
      case "rejected":
        return "bg-red-500/10 text-red-400 border-red-500/20";
      case "completed":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      default:
        return "bg-orange-500/10 text-orange-400 border-orange-500/20";
    }
  };

  const formatDate = (date) => {
    if (!date) return "Date unavailable";

    return new Date(date).toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <main className="min-h-screen bg-[#101713] px-4 py-8 text-white sm:px-6 lg:px-10">

      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <header className="mb-9 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-[#b5f36d]">
              <Store size={17} />
              DOCmed Pharmacy
            </div>

            <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">
              Shop Owner Dashboard
            </h1>

            <p className="mt-2 text-sm text-gray-400">
              Manage your pharmacy orders and customer requests.
            </p>
          </div>

          <button
            onClick={fetchOrders}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#1b211e] px-5 py-3 text-sm font-semibold text-gray-300 transition hover:border-[#b5f36d]/40 hover:text-[#b5f36d] disabled:opacity-50"
          >
            <RefreshCw
              size={17}
              className={loading ? "animate-spin" : ""}
            />
            Refresh Orders
          </button>
        </header>

        {/* ERROR */}
        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
            <AlertCircle size={19} className="mt-0.5 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {/* STATISTICS */}
        <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="rounded-2xl border border-white/10 bg-[#1b211e] p-5 transition hover:border-white/20"
              >
                <div className="flex items-center justify-between">
                  <div className={`rounded-xl p-3 ${stat.bg} ${stat.color}`}>
                    <Icon size={22} />
                  </div>
                </div>

                <p className="mt-5 text-sm text-gray-400">
                  {stat.title}
                </p>

                <h2 className="mt-1 text-3xl font-bold">
                  {stat.value}
                </h2>
              </div>
            );
          })}
        </section>

        {/* ORDER MANAGEMENT */}
        <section className="mt-12">

          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <h2 className="text-2xl font-bold">
                Manage Orders
              </h2>

              <p className="mt-2 text-sm text-gray-400">
                Review customer requests and update order status.
              </p>
            </div>

            {/* SEARCH */}
            <div className="relative w-full lg:max-w-sm">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search customer or order ID..."
                className="w-full rounded-xl border border-white/10 bg-[#1b211e] py-3 pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-[#b5f36d]"
              />
            </div>
          </div>

          {/* TABS */}
          <div className="mt-7 flex gap-2 overflow-x-auto pb-3">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`shrink-0 rounded-xl px-5 py-3 text-sm font-semibold transition ${
                  activeTab === tab.value
                    ? "bg-[#b5f36d] text-[#152019]"
                    : "border border-white/10 bg-[#1b211e] text-gray-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* ORDERS */}
          {loading ? (
            <div className="flex min-h-60 flex-col items-center justify-center text-gray-400">
              <LoaderCircle className="h-9 w-9 animate-spin text-[#b5f36d]" />
              <p className="mt-4 text-sm">Loading orders...</p>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="mt-5 rounded-2xl border border-white/10 bg-[#1b211e] px-6 py-16 text-center">
              <Package className="mx-auto h-12 w-12 text-gray-600" />

              <h3 className="mt-4 text-xl font-bold">
                No Orders Found
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                No {activeTab === "all" ? "" : activeTab} orders available right now.
              </p>
            </div>
          ) : (
            <div className="mt-5 grid gap-5 xl:grid-cols-2">

              {filteredOrders.map((order) => (
                <article
                  key={order._id}
                  className="rounded-2xl border border-white/10 bg-[#1b211e] p-5 sm:p-6"
                >

                  {/* ORDER HEADER */}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-xs text-gray-500">
                        Order ID
                      </p>

                      <h3 className="mt-1 font-bold">
                        #{order._id?.slice(-8).toUpperCase()}
                      </h3>
                    </div>

                    <span
                      className={`rounded-full border px-3 py-1.5 text-xs font-bold capitalize ${getStatusStyle(order.status)}`}
                    >
                      {order.status}
                    </span>
                  </div>

                  <div className="my-5 border-t border-white/10" />

                  {/* CUSTOMER */}
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-[#b5f36d]/10 p-3 text-[#b5f36d]">
                      <UserRound size={21} />
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">
                        Customer
                      </p>

                      <h4 className="font-semibold">
                        {order.user?.username ||
                          order.customerName ||
                          "Customer"}
                      </h4>

                      <p className="mt-1 text-xs text-gray-400">
                        {order.user?.gmail || order.customerEmail || ""}
                      </p>
                    </div>
                  </div>

                  {/* ITEMS */}
                  <div className="mt-5">
                    <p className="mb-3 text-sm font-semibold text-gray-300">
                      Ordered Medicines
                    </p>

                    <div className="space-y-3">
                      {(order.items || []).slice(0, 3).map((item, index) => (
                        <div
                          key={item._id || index}
                          className="flex items-center justify-between gap-3 text-sm"
                        >
                          <div className="min-w-0">
                            <p className="truncate font-medium">
                              {item.product?.name ||
                                item.name ||
                                "Medicine"}
                            </p>

                            <p className="mt-1 text-xs text-gray-500">
                              Qty: {item.quantity || 1}
                            </p>
                          </div>

                          <p className="shrink-0 font-semibold text-[#b5f36d]">
                            ₹{item.price || 0}
                          </p>
                        </div>
                      ))}

                      {(order.items || []).length > 3 && (
                        <p className="text-xs text-gray-500">
                          +{order.items.length - 3} more items
                        </p>
                      )}
                    </div>
                  </div>

                  {/* ADDRESS AND DATE */}
                  <div className="mt-5 space-y-3 border-t border-white/10 pt-5">

                    <div className="flex items-start gap-2 text-sm text-gray-400">
                      <MapPin size={17} className="mt-0.5 shrink-0 text-orange-400" />
                      <span>
                        {order.address?.fullAddress ||
                          order.address?.address ||
                          order.deliveryAddress ||
                          "Address not available"}
                      </span>
                    </div>

                    {order.user?.phone && (
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Phone size={16} className="text-[#b5f36d]" />
                        {order.user.phone}
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <CalendarDays size={15} />
                      {formatDate(order.createdAt)}
                    </div>

                  </div>

                  {/* TOTAL */}
                  <div className="mt-5 flex items-center justify-between rounded-xl bg-[#101713] p-4">
                    <span className="text-sm text-gray-400">
                      Total Amount
                    </span>

                    <span className="flex items-center gap-1 text-xl font-bold text-[#b5f36d]">
                      <IndianRupee size={18} />
                      {order.totalAmount || order.total || 0}
                    </span>
                  </div>

                  {/* ACTIONS */}
                  <div className="mt-5 grid grid-cols-2 gap-3">

                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="col-span-2 flex items-center justify-center gap-2 rounded-xl border border-white/10 py-3 text-sm font-semibold text-gray-300 transition hover:bg-white/5 hover:text-white"
                    >
                      <Eye size={17} />
                      View Order Details
                    </button>

                    {order.status === "pending" && (
                      <>
                        <button
                          onClick={() =>
                            updateOrderStatus(order._id, "accepted")
                          }
                          disabled={updatingId === order._id}
                          className="flex items-center justify-center gap-2 rounded-xl bg-[#b5f36d] py-3 text-sm font-bold text-[#152019] transition hover:bg-orange-400 disabled:opacity-50"
                        >
                          {updatingId === order._id ? (
                            <LoaderCircle size={17} className="animate-spin" />
                          ) : (
                            <CheckCircle size={17} />
                          )}
                          Accept
                        </button>

                        <button
                          onClick={() =>
                            updateOrderStatus(order._id, "rejected")
                          }
                          disabled={updatingId === order._id}
                          className="flex items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 py-3 text-sm font-bold text-red-400 transition hover:bg-red-500 hover:text-white disabled:opacity-50"
                        >
                          <XCircle size={17} />
                          Reject
                        </button>
                      </>
                    )}

                  </div>

                </article>
              ))}

            </div>
          )}
        </section>

        {/* ORDER DETAILS MODAL */}
        {selectedOrder && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
            onClick={() => setSelectedOrder(null)}
          >
            <div
              className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-white/10 bg-[#1b211e] p-6 sm:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">
                  Order Details
                </h2>

                <button
                  onClick={() => setSelectedOrder(null)}
                  className="rounded-lg p-2 text-gray-400 transition hover:bg-white/10 hover:text-white"
                >
                  <X size={21} />
                </button>
              </div>

              <p className="mt-2 text-sm text-gray-500">
                Order #{selectedOrder._id?.slice(-8).toUpperCase()}
              </p>

              <div className="mt-6 space-y-4">

                <div className="rounded-xl bg-[#101713] p-4">
                  <p className="text-xs text-gray-500">Customer</p>
                  <p className="mt-1 font-semibold">
                    {selectedOrder.user?.username ||
                      selectedOrder.customerName ||
                      "Customer"}
                  </p>
                </div>

                <div className="rounded-xl bg-[#101713] p-4">
                  <p className="text-xs text-gray-500">Delivery Address</p>
                  <p className="mt-1 text-sm">
                    {selectedOrder.address?.fullAddress ||
                      selectedOrder.address?.address ||
                      selectedOrder.deliveryAddress ||
                      "Address not available"}
                  </p>
                </div>

                <div className="rounded-xl bg-[#101713] p-4">
                  <p className="mb-3 text-xs text-gray-500">
                    All Ordered Items
                  </p>

                  {(selectedOrder.items || []).map((item, index) => (
                    <div
                      key={item._id || index}
                      className="flex justify-between gap-3 border-b border-white/5 py-3 last:border-0"
                    >
                      <div>
                        <p className="text-sm font-semibold">
                          {item.product?.name || item.name || "Medicine"}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          Quantity: {item.quantity || 1}
                        </p>
                      </div>

                      <p className="text-sm font-bold text-[#b5f36d]">
                        ₹{item.price || 0}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between rounded-xl border border-[#b5f36d]/20 bg-[#b5f36d]/5 p-4">
                  <span className="font-semibold">Total Amount</span>
                  <span className="font-bold text-[#b5f36d]">
                    ₹{selectedOrder.totalAmount || selectedOrder.total || 0}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Current Status</span>

                  <span
                    className={`rounded-full border px-3 py-1.5 text-xs font-bold capitalize ${getStatusStyle(selectedOrder.status)}`}
                  >
                    {selectedOrder.status}
                  </span>
                </div>

                {selectedOrder.status === "pending" && (
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <button
                      onClick={() =>
                        updateOrderStatus(selectedOrder._id, "accepted")
                      }
                      disabled={updatingId === selectedOrder._id}
                      className="rounded-xl bg-[#b5f36d] py-3 font-bold text-[#152019] transition hover:bg-orange-400 disabled:opacity-50"
                    >
                      Accept Order
                    </button>

                    <button
                      onClick={() =>
                        updateOrderStatus(selectedOrder._id, "rejected")
                      }
                      disabled={updatingId === selectedOrder._id}
                      className="rounded-xl bg-red-500/10 py-3 font-bold text-red-400 transition hover:bg-red-500 hover:text-white disabled:opacity-50"
                    >
                      Reject Order
                    </button>
                  </div>
                )}

              </div>
            </div>
          </div>
        )}

      </div>
    </main>
  );
};

export default ShopownerProfile;
