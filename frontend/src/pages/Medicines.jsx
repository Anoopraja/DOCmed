
// import Products from './ProductCard.jsx';


import React, { useState } from "react";
import Products from "./ProductCard.jsx";
import {
  Search,
  SlidersHorizontal,
  Pill,
  Heart,
  Activity,
  Sparkles,
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

const medicines = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    brand: "Dolo",
    category: "Pain Relief",
    price: 30,
  },
  {
    id: 2,
    name: "Vitamin C Tablets",
    brand: "HealthVit",
    category: "Vitamins",
    price: 120,
  },
  {
    id: 3,
    name: "Cetirizine 10mg",
    brand: "Cetzine",
    category: "Allergy",
    price: 45,
  },
  {
    id: 4,
    name: "Multivitamin Tablets",
    brand: "HealthKart",
    category: "Vitamins",
    price: 199,
  },
  {
    id: 5,
    name: "First Aid Kit",
    brand: "Dr. Morepen",
    category: "Healthcare",
    price: 250,
  },
  {
    id: 6,
    name: "Antiseptic Liquid",
    brand: "Dettol",
    category: "Healthcare",
    price: 85,
  },
  {
    id: 7,
    name: "Pain Relief Gel",
    brand: "Volini",
    category: "Pain Relief",
    price: 110,
  },
  {
    id: 8,
    name: "Hand Sanitizer",
    brand: "Dettol",
    category: "Personal Care",
    price: 60,
  },
];

function Medicine() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Medicines");

  const filteredMedicines = medicines.filter((medicine) => {
    const matchesSearch =
      medicine.name.toLowerCase().includes(search.toLowerCase()) ||
      medicine.brand.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      activeCategory === "All Medicines" ||
      medicine.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#090d0b] text-white px-4 sm:px-8 lg:px-16 py-10">

      {/* Header */}
      <div className="max-w-7xl mx-auto">

        {/* <div className="mb-9">
          {/* <p className="text-green-500 text-sm font-semibold mb-2">
            DOCMED / MEDICINES
          </p> */}

          {/* <h1 className="text-3xl sm:text-4xl font-bold"> */}
            {/* Find Your <span className="text-green-500">Medicines</span> */}
          {/* </h1> */}

          {/* <p className="text-gray-400 mt-3 max-w-xl">
            Explore genuine healthcare products and medicines.
            Your health, our priority.
          </p> */}
        {/* </div>  */}

        {/* Search */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">

          <div className="flex-1 flex items-center gap-3 bg-[#151d18] border border-[#29372d] rounded-xl px-4 py-3 focus-within:border-green-500 transition">
            <Search className="text-green-500" size={21} />

            <input
              type="text"
              placeholder="Search medicines, brands..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent outline-none text-white placeholder:text-gray-500"
            />

            {search && (
              <button onClick={() => setSearch("")}>
                <X size={18} className="text-gray-400 hover:text-white" />
              </button>
            )}
          </div>

          <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#151d18] border border-[#29372d] text-gray-300 hover:border-orange-500 transition">
            <SlidersHorizontal size={18} />
            Filters
          </button>
        </div>

        {/* Category Filters */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Pill size={19} className="text-orange-500" />
            <h2 className="font-semibold text-lg">Categories</h2>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-medium transition ${
                  activeCategory === category
                    ? "bg-green-500 text-black"
                    : "bg-[#151d18] border border-[#29372d] text-gray-400 hover:border-green-500 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Banner */}
        {/* <div className="relative overflow-hidden bg-[#17251b] border border-[#293b2e] rounded-2xl p-6 sm:p-8 mb-10">
          <div className="relative z-10 max-w-lg">
            <span className="text-orange-500 text-xs font-bold uppercase tracking-widest">
              Your health matters
            </span>

            <h2 className="text-2xl sm:text-3xl font-bold mt-3">
              Healthcare made <span className="text-green-500">simple.</span>
            </h2>

            <p className="text-gray-400 mt-3 text-sm">
              Find essential medicines and healthcare products
              all in one place.
            </p>
          </div>

          <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-10">
            <Heart size={150} className="text-green-400" />
          </div>

          <Sparkles
            size={25}
            className="absolute right-10 top-8 text-orange-500"
          />
        </div> */}

        {/* Products Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold">
              Available Medicines
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              Showing {filteredMedicines.length} products
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Activity size={17} className="text-green-500" />
            Healthcare Store
          </div>
        </div>

        {/* Product Grid */}
        {filteredMedicines.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredMedicines.map((medicine) => (
              <Products
                key={medicine.id}
                product={medicine}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#121a15] rounded-2xl border border-[#29372d]">
            <Search size={40} className="text-gray-600 mx-auto mb-4" />

            <h3 className="text-xl font-semibold">
              No medicines found
            </h3>

            <p className="text-gray-500 text-sm mt-2">
              Try another medicine name or category.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setActiveCategory("All Medicines");
              }}
              className="mt-5 bg-orange-500 hover:bg-orange-600 text-black px-5 py-2.5 rounded-lg font-semibold transition"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Medicine;

