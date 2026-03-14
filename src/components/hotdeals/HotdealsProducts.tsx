"use client";

import { Product } from "@/sanity.types";
import ProductCard from "../Products/ProductCard";
// import { urlFor } from "@/src/sanity/lib/image";
// import Image from "next/image";

const HotdealsProducts = ({
  hotdealsProductsData,
}: {
  hotdealsProductsData: Product[];
}) => {
  return (
    <div className="grid max-[500px]:grid-cols-1 min-[501px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 mt-10">
      {hotdealsProductsData.map((product) => (
        <div key={product._id}>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default HotdealsProducts;
