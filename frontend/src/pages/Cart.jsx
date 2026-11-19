import React, { useState } from "react";
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

const initialCart = [
  {
    _id: "1",
    name: "Paracetamol 500mg",
    brand: "Dolo",
    category: "Pain Relief",
    price: 30,
    quantity: 2,
    image: "https://placehold.co/200x200/1c2420/22c55e?text=Dolo",
  },
  {
    _id: "2",
    name: "Vitamin C Tablets",
    brand: "HealthVit",
    category: "Vitamins",
    price: 120,
    quantity: 1,
    image: "https://placehold.co/200x200/1c2420/22c55e?text=Vitamin+C",
  },
  {
    _id: "3",
    name: "Cetirizine 10mg",
    brand: "Cetzine",
    category: "Allergy",
    price: 45,
    quantity: 2,
    image: "https://placehold.co/200x200/1c2420/22c55e?text=Cetzine",
  },
];

export default function Cart() {
  const [cart, setCart] = useState(initialCart);
  const navigate = useNavigate();

  const updateQuantity = (id, type) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id
          ? {
              ...item,
              quantity:
                type === "increase"
                  ? item.quantity + 1
                  : Math.max(1, item.quantity - 1),
            }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
  };

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const deliveryFee = subtotal === 0 || subtotal >= 499 ? 0 : 40;
  const total = subtotal + deliveryFee;

  return (
    <div className="min-h-screen bg-[#090d0b] text-white px-4 sm:px-8 lg:px-16 py-10">

      {/* Header */}
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

      {cart.length === 0 ? (
        /* Empty Cart */
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
            Explore Medicines <ArrowRight size={18} />
          </Link>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">

            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-semibold">
                Your Items
                <span className="text-gray-500 text-sm ml-2">
                  ({cart.length} products)
                </span>
              </h2>

              <button
                onClick={() => setCart([])}
                className="text-sm text-red-400 hover:text-red-300"
              >
                Clear Cart
              </button>
            </div>

            {cart.map((item) => (
              <div
                key={item._id}
                className="bg-[#121a15] border border-[#243329] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row gap-5"
              >
                {/* Product Image */}
                <div className="w-full sm:w-32 h-32 shrink-0 bg-[#1c2820] rounded-xl overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain p-2"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1 flex flex-col justify-between gap-4">

                  <div className="flex justify-between gap-3">
                    <div>
                      <p className="text-green-500 text-xs font-medium mb-1">
                        {item.category}
                      </p>

                      <h3 className="text-lg font-semibold">
                        {item.name}
                      </h3>

                      <p className="text-gray-400 text-sm">
                        Brand: {item.brand}
                      </p>
                    </div>

                    <button
                      onClick={() => removeItem(item._id)}
                      className="text-gray-500 hover:text-red-500 transition h-fit"
                      title="Remove item"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4">
                    {/* Quantity */}
                    <div className="flex items-center gap-3 bg-[#202b23] rounded-lg p-1">
                      <button
                        onClick={() =>
                          updateQuantity(item._id, "decrease")
                        }
                        className="p-1.5 hover:text-orange-400"
                      >
                        <Minus size={16} />
                      </button>

                      <span className="font-semibold w-5 text-center">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          updateQuantity(item._id, "increase")
                        }
                        className="p-1.5 text-green-500 hover:text-green-400"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <p className="text-xl font-bold text-white">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Delivery Info */}
            <div className="bg-[#121a15] border border-[#243329] rounded-xl p-5 flex gap-4 items-center">
              <Truck className="text-orange-500 shrink-0" size={26} />
              <div>
                <h3 className="font-semibold text-sm">
                  Free Delivery on orders above ₹499
                </h3>
                <p className="text-gray-400 text-xs mt-1">
                  Add more products to unlock free delivery.
                </p>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-[#121a15] border border-[#243329] rounded-2xl p-6 sticky top-24">

              <h2 className="text-xl font-bold mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 text-sm">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span className="text-white font-medium">
                    ₹{subtotal}
                  </span>
                </div>

                <div className="flex justify-between text-gray-400">
                  <span>Delivery Fee</span>
                  <span className={deliveryFee === 0 ? "text-green-500" : "text-white"}>
                    {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                  </span>
                </div>

                <div className="flex justify-between text-gray-400">
                  <span>Discount</span>
                  <span>₹0</span>
                </div>
              </div>

              <div className="border-t border-[#29372d] my-6" />

              <div className="flex justify-between items-center mb-7">
                <span className="font-semibold text-lg">
                  Total Amount
                </span>
                <span className="text-2xl font-bold text-green-500">
                  ₹{total}
                </span>
              </div>

              {/* Coupon */}
              <div className="flex gap-2 mb-6">
                <div className="flex-1 flex items-center gap-2 bg-[#202b23] rounded-lg px-3">
                  <Tag size={17} className="text-orange-500" />
                  <input
                    type="text"
                    placeholder="Coupon code"
                    className="w-full bg-transparent py-3 outline-none text-sm min-w-0"
                  />
                </div>

                <button className="text-orange-500 font-semibold text-sm hover:text-orange-400">
                  Apply
                </button>
              </div>

              {/* Checkout */}
              <button
                onClick={() => navigate("/checkout")}
                className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition"
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
