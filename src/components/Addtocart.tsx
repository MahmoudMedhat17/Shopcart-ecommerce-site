"use client";

import { Product } from "@/sanity.types";
import { ShoppingBag } from "lucide-react";
import { cn } from "../lib/utils";

interface AddtocartProps {
  product: Product;
  className?: string;
}

const Addtocart = ({ product, className }: AddtocartProps) => {
  const stockBtn = product.stock === 0 ? "Out of stock" : "Add to cart";

  const handleAddToCart = () => {
    window.alert("Added to cart successfully!");
  };

  return (
    <button
      onClick={handleAddToCart}
      className={cn(
        "flex items-center justify-center gap-2 mt-4 bg-shop-dark-green/80 hover:bg-shop-dark-green hoverEffect text-gray-100 px-3 sm:px-5 py-1 sm:py-2 rounded-full text-lg",
        className,
      )}
    >
      <ShoppingBag size={18} />
      {stockBtn}
    </button>
  );
};

export default Addtocart;
