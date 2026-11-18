import React from "react";
import Products from './ProductCard.jsx';

function Medicine() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-4 px-4 sm:px-6">
      <Products />
      <Products />
      <Products />
      <Products />
    </div>
  );
}

export default Medicine;
