
import React, { useState } from "react";
import api from "../../api/api.js";

export default function ProductCard({ product }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  if (!product) return null;

  const addToCart = async (productId) => {
    try {
      setLoading(true);
      setMessage("");

      const { data } = await api.post("/cart/add", {
        productId,
        quantity: 1
      });

      if (data.success) {
        setMessage("Product added to cart successfully!");
      } else {
        setMessage(data.message || "Unable to add product.");
      }

    } catch (error) {
      console.error(
        "Error adding to cart:",
        error.response?.data || error.message
      );

      setMessage(
        error.response?.data?.message ||
        "Unable to add product to cart."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto mt-4 w-full max-w-[320px] overflow-hidden rounded-2xl border border-white/10 bg-[#262d36] p-4 transition hover:border-[#5fd08a]/50">

      {/* Medicine Name */}
      <h3 className="text-base font-semibold leading-relaxed text-[#f3f5f7] sm:text-lg">
        {product.name}
      </h3>

      {/* Manufacturer */}
      <p className="mt-2 text-sm text-[#9ba5b0]">
        {product.manufacturerName}
      </p>

      {/* Price */}
      <div className="mt-4 border-t border-white/10 pt-3">
        <span className="text-xl font-bold text-[#5fd08a]">
          ₹{Number(product["price(₹)"]).toFixed(2)}
        </span>
      </div>

      {/* Status Message */}
      {message && (
        <p className="mt-3 text-sm text-center text-[#5fd08a]">
          {message}
        </p>
      )}

      {/* Add To Cart */}
      <button
        onClick={() => addToCart(product._id)}
        disabled={loading}
        className="mt-4 w-full rounded-xl bg-[#5fd08a] py-2.5 text-sm font-semibold text-[#1b2128] transition hover:bg-[#4cbd78] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Adding..." : "Add to Cart"}
      </button>

      {/* Buy Now */}
      <button
        className="mt-2 w-full rounded-xl border border-[#5fd08a] py-2.5 text-sm font-semibold text-[#5fd08a] transition hover:bg-[#4cbd78]/10"
      >
        Buy Now
      </button>

    </div>
  );
}
