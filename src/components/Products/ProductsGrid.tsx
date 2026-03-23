"use client";

import useProducts from "@/src/hooks/useProducts";
import CategorySelection from "@/src/components/Products/CategorySelection";
import LoadingComponent from "@/src/components/LoadingComponent";
import NoProducts from "@/src/components/Products/NoProducts";
import ProductCard from "@/src/components/Products/ProductCard";
import { AnimatePresence, motion } from "motion/react";
// import Link from "next/link";

const ProductsGrid = () => {
  const { loading, products, selectedCategory, setSelectedCategory } =
    useProducts();

  return (
    <div>
      <CategorySelection
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      {loading ? (
        <LoadingComponent />
      ) : products.length ? (
        <>
          <div className="grid max-[500px]:grid-cols-1 min-[501px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 mt-10">
            <AnimatePresence>
              {products.map((product) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0.2 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* <Link href={`/client/products/${product.slug?.current}`}> */}
                  <ProductCard product={product} />
                  {/* </Link> */}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </>
      ) : (
        <>
          <NoProducts selectedCategory={selectedCategory} />
        </>
      )}
    </div>
  );
};

export default ProductsGrid;
