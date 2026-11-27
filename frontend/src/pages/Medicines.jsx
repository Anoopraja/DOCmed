
import React, { useState, useEffect } from "react";
import api from "../../api/api.js";
import Products from "./ProductCard.jsx";

import {
  Search,
  SlidersHorizontal,
  Pill,
  Activity,
  X,
} from "lucide-react";

const categories = [
  "All Medicines",
  "Pain Relief",
  "Vitamins",
  "Healthcare",
  "Personal Care",
  "Allergy",
];

function Medicine() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Medicines");

  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch Medicines
  useEffect(() => {
    const getAllMedicines = async () => {
      try {
        setLoading(true);

        const response = await api.get("/product/allproducts");

        setMedicines(response.data.data || []);
      } catch (error) {
        console.error("Error fetching medicines:", error);
        setError("Unable to fetch medicines.");
      } finally {
        setLoading(false);
      }
    };

    getAllMedicines();
  }, []);


  // Search and Category Filter
  const filteredMedicines = medicines.filter((medicine) => {
    const matchesSearch =
      medicine.name?.toLowerCase().includes(search.toLowerCase()) ||
      medicine.manufacturerName?.toLowerCase().includes(search.toLowerCase()) ||
      medicine.shortComposition1?.toLowerCase().includes(search.toLowerCase()) ||
      medicine.shortComposition2?.toLowerCase().includes(search.toLowerCase());

    // Your current database has medicine type, not category.
    const matchesCategory =
      activeCategory === "All Medicines" ||
      (activeCategory === "Healthcare" && true);

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#090d0b] px-4 py-10 text-white sm:px-8 lg:px-16">

      <div className="mx-auto max-w-7xl">

        {/* Search */}
        <div className="mb-8 flex flex-col gap-3 sm:flex-row">

          <div className="flex flex-1 items-center gap-3 rounded-xl border border-[#29372d] bg-[#151d18] px-4 py-3 transition focus-within:border-green-500">
            <Search className="text-green-500" size={21} />

            <input
              type="text"
              placeholder="Search medicines, manufacturers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-white outline-none placeholder:text-gray-500"
            />

            {search && (
              <button onClick={() => setSearch("")}>
                <X size={18} className="text-gray-400 hover:text-white" />
              </button>
            )}
          </div>

          <button className="flex items-center justify-center gap-2 rounded-xl border border-[#29372d] bg-[#151d18] px-6 py-3 text-gray-300 transition hover:border-orange-500">
            <SlidersHorizontal size={18} />
            Filters
          </button>

        </div>

        {/* Categories */}
        {/* <div className="mb-10">

          <div className="mb-4 flex items-center gap-2">
            <Pill size={19} className="text-orange-500" />
            <h2 className="text-lg font-semibold">Categories</h2>
          </div>

          <div className="scrollbar-hide flex gap-3 overflow-x-auto pb-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition ${
                  activeCategory === category
                    ? "bg-green-500 text-black"
                    : "border border-[#29372d] bg-[#151d18] text-gray-400 hover:border-green-500 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

        </div> */}

        {/* Products Header */}
        {/* <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold sm:text-2xl">
              Available Medicines
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Showing {filteredMedicines.length} medicines
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Activity size={17} className="text-green-500" />
            Healthcare Store
          </div>

        </div> */}

        {/* Loading */}
        {loading && (
          <p className="py-20 text-center text-gray-400">
            Loading medicines...
          </p>
        )}

        {/* Error */}
        {!loading && error && (
          <p className="py-20 text-center text-red-400">
            {error}
          </p>
        )}

        {/* Product Grid */}
        {!loading && !error && (
          filteredMedicines.length > 0 ? (

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredMedicines.map((medicine) => (
                <Products
                  key={medicine._id}
                  product={medicine}
                />
              ))}
            </div>

          ) : (

            <div className="rounded-2xl border border-[#29372d] bg-[#121a15] py-20 text-center">

              <Search size={40} className="mx-auto mb-4 text-gray-600" />

              <h3 className="text-xl font-semibold">
                No medicines found
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Try another medicine name.
              </p>

              <button
                onClick={() => {
                  setSearch("");
                  setActiveCategory("All Medicines");
                }}
                className="mt-5 rounded-lg bg-orange-500 px-5 py-2.5 font-semibold text-black transition hover:bg-orange-600"
              >
                Clear Search
              </button>

            </div>

          )
        )}

      </div>
    </div>
  );
}

export default Medicine;
