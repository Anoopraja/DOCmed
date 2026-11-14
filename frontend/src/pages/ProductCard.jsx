
import { ShoppingCart } from "lucide-react";

export default function ProductCard() {
  return (
    <div className="mx-auto mt-4 w-full max-w-[320px] overflow-hidden rounded-2xl bg-[#262d36] p-3 sm:p-4">

      {/* Product Image */}
      <div className="flex h-36 items-center justify-center rounded-xl bg-[#2f3741] sm:h-44">
        <img
          src="https://placehold.co/180x180?text=Medicine"
          alt="Paracetamol"
          className="h-28 w-28 object-contain sm:h-36 sm:w-36"
        />
      </div>

      {/* Product Details */}
      <div className="mt-3 sm:mt-4">

        <p className="text-xs text-[#9ba5b0]">
          Tablet · 500mg
        </p>

        <h3 className="mt-1 text-base font-semibold text-[#f3f5f7] sm:text-lg">
          Paracetamol
        </h3>

        <p className="mt-1 text-xs leading-relaxed text-[#9ba5b0] sm:text-sm">
          Pain relief and fever reducer
        </p>

        {/* Price */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 sm:mt-4">
          <div>
            <span className="text-lg font-bold text-[#f3f5f7] sm:text-xl">
              ₹25
            </span>

            <span className="ml-2 text-xs text-[#9ba5b0] line-through sm:text-sm">
              ₹35
            </span>
          </div>

          <span className="text-xs font-medium text-[#5fd08a]">
            28% OFF
          </span>
        </div>

        {/* Add to Cart */}
        <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#5fd08a] py-2.5 text-sm font-semibold text-[#1b2128] transition hover:bg-[#4cbd78] sm:mt-4 sm:py-3">
          <ShoppingCart size={17} />
          Add to Cart
        </button>

      </div>
    </div>
  );
}
