"use client";

import { useState } from "react";
import CategorySelection from "@/src/components/Products/CategorySelection";
import { categoryTypes } from "@/src/constants/data";

const ProductsGrid = () => {
  // State to handle the loading state of the data.
  const [loading, setLoading] = useState(false);
  //   State to hold the products data coming from sanity in an array form.
  const [products, setProducts] = useState([]);
  //   Here we pass the categoryType to the state so we set the state with the array of ["Gadget", "Appliances", "Refrigeratos", "Others"];
  const [selectedCategory, setSelectedCategory] = useState(
    categoryTypes[0]?.title || "",
  );

  return (
    <div>
      <CategorySelection
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />
    </div>
  );
};

export default ProductsGrid;
