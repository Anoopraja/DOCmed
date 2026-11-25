
export default function ProductCard({ product }) {
  if (!product) return null;

  return (
    <div className="mx-auto mt-4 w-full max-w-[320px] overflow-hidden rounded-2xl border border-white/10 bg-[#262d36] p-4 transition hover:border-[#5fd08a]/50">

      {/* Medicine Name */}
      <h3 className="text-base font-semibold leading-relaxed text-[#f3f5f7] sm:text-lg">
        {product.name}
      </h3>

      {/* Manufacturer Details */}
      <p className="mt-2 text-sm text-[#9ba5b0]">
        {product.manufacturerName}
      </p>

      {/* Price */}
      <div className="mt-4 border-t border-white/10 pt-3">
        <span className="text-xl font-bold text-[#5fd08a]">
          ₹{Number(product["price(₹)"]).toFixed(2)}        
        </span>
      </div>
      <button className="mt-4 w-full rounded-xl bg-[#5fd08a] py-2.5 text-sm font-semibold text-[#1b2128] transition hover:bg-[#4cbd78]">
        Add to Cart
      </button>
      <button className="mt-2 w-full rounded-xl border border-[#5fd08a] py-2.5 text-sm font-semibold text-[#5fd08a] transition hover:bg-[#4cbd78]/10">
        buy Now
      </button>

    </div>
  );
}
