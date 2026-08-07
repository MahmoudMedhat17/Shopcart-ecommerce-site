"use client";

import { HOTDEALS_QUERYResult, Product } from "@/sanity.types";
import ProductCard from "../Products/ProductCard";

const HotdealsProducts = ({
  hotdealsProductsData,
}: {
  hotdealsProductsData: HOTDEALS_QUERYResult;
}) => {
  return (
    <div className="grid max-[500px]:grid-cols-1 min-[501px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 mt-10">
      {hotdealsProductsData.map((product) => (
        <div key={product._id}>
          <ProductCard product={product as unknown as Product} />
        </div>
      ))}
    </div>
  );
};

export default HotdealsProducts;
