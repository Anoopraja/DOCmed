import { useState, useEffect, useMemo } from "react";
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Truck,
  ShoppingBag,
  Tag,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/api.js";

const getProduct = (item) => {
  return item.product && typeof item.product === "object"
    ? item.product
    : {};
};

const getPrice = (item) => {
  const product = getProduct(item);

  return Number(
    product["price(₹)"] ??
    product.sellingPrice ??
    product.price ??
    0
  ) || 0;
};

export default function Cart() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(null);

  // =========================
  // GET ALL CART ITEMS
  // =========================

  const getAllCartItems = async () => {
    try {
      const { data } = await api.get("/cart");
      setError("");
      setCart(Array.isArray(data.data) ? data.data : []);
    } catch (error) {
      console.error("Get cart items error:", error);
      setError(error.response?.data?.message || "Unable to load your cart.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;

    api.get("/cart")
      .then(({ data }) => {
        if (active) {
          setCart(Array.isArray(data.data) ? data.data : []);
        }
      })
      .catch((error) => {
        if (active) {
          console.error("Get cart items error:", error);
          setError(error.response?.data?.message || "Unable to load your cart.");
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  // =========================
  // CALCULATE TOTALS
  // =========================

  const subtotal = useMemo(() => {
    return cart.reduce((total, item) => {
      return total + getPrice(item) * item.quantity;
    }, 0);
  }, [cart]);

  const deliveryFee = subtotal === 0 || subtotal >= 499 ? 0 : 40;

  const total = subtotal + deliveryFee;

  // =========================
  // UPDATE QUANTITY
  // =========================

  const updateQuantity = async (cartItemId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      setActionLoading(cartItemId);

      await api.patch(`/cart/${cartItemId}`, {
        quantity: newQuantity,
      });

      await getAllCartItems();
    } catch (error) {
      console.error("Update quantity error:", error);

      alert(
        error.response?.data?.message ||
        "Unable to update quantity."
      );
    } finally {
      setActionLoading(null);
    }
  };

  // =========================
  // REMOVE ITEM
  // =========================

  const removeItem = async (cartItemId) => {
    try {
      setActionLoading(cartItemId);

      await api.delete(`/cart/${cartItemId}`);

      setCart((prev) =>
        prev.filter((item) => item._id !== cartItemId)
      );
    } catch (error) {
      console.error("Remove cart item error:", error);

      alert(
        error.response?.data?.message ||
        "Unable to remove product."
      );
    } finally {
      setActionLoading(null);
    }
  };

  // =========================
  // CLEAR CART
  // =========================

  const clearCart = async () => {
    try {
      setActionLoading("clear");

      await api.delete("/cart");

      setCart([]);
    } catch (error) {
      console.error("Clear cart error:", error);

      alert(
        error.response?.data?.message ||
        "Unable to clear cart."
      );
    } finally {
      setActionLoading(null);
    }
  };

  // =========================
  // LOADING UI
  // =========================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#090d0b] flex items-center justify-center text-white">
        <p className="text-green-500 animate-pulse">
          Loading your cart...
        </p>
      </div>
    );
  }

  // =========================
  // MAIN UI
  // =========================

  return (
    <div className="min-h-screen bg-[#090d0b] text-white px-4 sm:px-8 lg:px-16 py-10">

      {/* HEADER */}

      <div className="max-w-7xl mx-auto mb-10">

        <p className="text-green-500 text-sm font-semibold mb-2">
          DOCMED / YOUR CART
        </p>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

          <div>
            <h1 className="text-3xl sm:text-4xl font-bold">
              Shopping <span className="text-green-500">Cart</span>
            </h1>

            <p className="text-gray-400 mt-2">
              Review your medicines before checkout.
            </p>
          </div>

          <Link
            to="/medicines"
            className="flex items-center gap-2 text-orange-500 hover:text-orange-400 font-medium"
          >
            <ShoppingBag size={19} />
            Continue Shopping
          </Link>

        </div>
      </div>

      {/* ERROR */}

      {error && (
        <div className="max-w-7xl mx-auto mb-6 rounded-xl bg-red-500/10 border border-red-500/20 p-4 text-red-400">
          {error}
          <button
            onClick={getAllCartItems}
            className="ml-3 underline"
          >
            Retry
          </button>
        </div>
      )}

      {/* EMPTY CART */}

      {cart.length === 0 ? (

        <div className="max-w-xl mx-auto text-center py-20">

          <div className="w-24 h-24 rounded-full bg-[#17221b] flex items-center justify-center mx-auto mb-6">
            <ShoppingCart size={42} className="text-green-500" />
          </div>

          <h2 className="text-2xl font-bold mb-3">
            Your cart is empty!
          </h2>

          <p className="text-gray-400 mb-7">
            Looks like you haven't added any medicines yet.
          </p>

          <Link
            to="/medicines"
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-black px-7 py-3 rounded-xl font-bold transition"
          >
            Explore Medicines
            <ArrowRight size={18} />
          </Link>

        </div>

      ) : (

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* CART ITEMS */}

          <div className="lg:col-span-2 space-y-4">

            <div className="flex items-center justify-between mb-5">

              <h2 className="text-xl font-semibold">
                Your Items
                <span className="text-gray-500 text-sm ml-2">
                  ({cart.length} products)
                </span>
              </h2>

              <button
                onClick={clearCart}
                disabled={actionLoading !== null}
                className="text-sm text-red-400 hover:text-red-300 disabled:opacity-50"
              >
                Clear Cart
              </button>

            </div>

            {cart.map((item) => {
              const product = getProduct(item);
              const price = getPrice(item);
              const busy = actionLoading === item._id;

              return (
                <div
                  key={item._id}
                  className="bg-[#121a15] border border-[#243329] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row gap-5"
                >

                  {/* PRODUCT IMAGE */}

                  <div className="w-full sm:w-32 h-32 shrink-0 bg-[#1c2820] rounded-xl overflow-hidden flex items-center justify-center">

                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain p-2"
                      />
                    ) : (
                      <ShoppingBag
                        size={38}
                        className="text-green-500"
                      />
                    )}

                  </div>

                  {/* PRODUCT DETAILS */}

                  <div className="flex-1 flex flex-col justify-between gap-4">

                    <div className="flex justify-between gap-3">

                      <div>

                        <p className="text-green-500 text-xs font-medium mb-1">
                          {product.type || "Medicine"}
                        </p>

                        <h3 className="text-lg font-semibold">
                          {product.name || "Medicine"}
                        </h3>

                        <p className="text-gray-400 text-sm">
                          Manufacturer: {" "}
                          {product.manufacturerName || "N/A"}
                        </p>

                        <p className="text-gray-500 text-xs mt-1">
                          {product.packSizeLabel || ""}
                        </p>

                      </div>

                      <button
                        onClick={() => removeItem(item._id)}
                        disabled={actionLoading !== null}
                        className="text-gray-500 hover:text-red-500 transition h-fit disabled:opacity-50"
                        title="Remove item"
                      >
                        <Trash2 size={20} />
                      </button>

                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4">

                      {/* QUANTITY */}

                      <div className="flex items-center gap-3 bg-[#202b23] rounded-lg p-1">

                        <button
                          onClick={() =>
                            updateQuantity(
                              item._id,
                              item.quantity - 1
                            )
                          }
                          disabled={busy || actionLoading !== null || item.quantity <= 1}
                          className="p-1.5 hover:text-orange-400 disabled:opacity-30"
                        >
                          <Minus size={16} />
                        </button>

                        <span className="font-semibold w-5 text-center">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            updateQuantity(
                              item._id,
                              item.quantity + 1
                            )
                          }
                          disabled={busy || actionLoading !== null}
                          className="p-1.5 text-green-500 hover:text-green-400 disabled:opacity-30"
                        >
                          <Plus size={16} />
                        </button>

                      </div>

                      <p className="text-xl font-bold text-white">
                        ₹{(price * item.quantity).toFixed(2)}
                      </p>

                    </div>

                  </div>

                </div>
              );
            })}

            {/* DELIVERY INFO */}

            <div className="bg-[#121a15] border border-[#243329] rounded-xl p-5 flex gap-4 items-center">

              <Truck className="text-orange-500 shrink-0" size={26} />

              <div>
                <h3 className="font-semibold text-sm">
                  {deliveryFee === 0
                    ? "You unlocked free delivery!"
                    : `Add ₹${(499 - subtotal).toFixed(2)} more for free delivery`}
                </h3>

                <p className="text-gray-400 text-xs mt-1">
                  Free delivery on orders above ₹499.
                </p>
              </div>

            </div>

          </div>

          {/* ORDER SUMMARY */}

          <div className="lg:col-span-1">

            <div className="bg-[#121a15] border border-[#243329] rounded-2xl p-6 sticky top-24">

              <h2 className="text-xl font-bold mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 text-sm">

                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span className="text-white font-medium">
                    ₹{subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between text-gray-400">
                  <span>Delivery Fee</span>
                  <span className={deliveryFee === 0 ? "text-green-500" : "text-white"}>
                    {deliveryFee === 0
                      ? "FREE"
                      : `₹${deliveryFee.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex justify-between text-gray-400">
                  <span>Discount</span>
                  <span>₹0.00</span>
                </div>

              </div>

              <div className="border-t border-[#29372d] my-6" />

              <div className="flex justify-between items-center mb-7">

                <span className="font-semibold text-lg">
                  Total Amount
                </span>

                <span className="text-2xl font-bold text-green-500">
                  ₹{total.toFixed(2)}
                </span>

              </div>

              {/* COUPON */}

              <div className="flex gap-2 mb-6">

                <div className="flex-1 flex items-center gap-2 bg-[#202b23] rounded-lg px-3">

                  <Tag size={17} className="text-orange-500" />

                  <input
                    type="text"
                    placeholder="Coupon code"
                    className="w-full bg-transparent py-3 outline-none text-sm min-w-0"
                  />

                </div>

                <button
                  type="button"
                  disabled
                  className="text-gray-500 font-semibold text-sm"
                  title="Coupon feature coming soon"
                >
                  Apply
                </button>

              </div>

              {/* CHECKOUT */}

              <button
                onClick={() => navigate("/checkout")}
                disabled={cart.length === 0 || actionLoading !== null}
                className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition disabled:opacity-50"
              >
                Proceed to Checkout
                <ArrowRight size={19} />
              </button>

              <div className="flex justify-center items-center gap-2 mt-5 text-gray-500 text-xs">

                <ShieldCheck size={16} className="text-green-500" />

                Secure and safe checkout

              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}
