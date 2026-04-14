"use client";

import { Product } from "@/sanity.types";
import { Heart } from "lucide-react";
import useAddToFav from "../hooks/useAddToFav";

const AddToFav = ({ product }: { product: Product }) => {
  const { handleAddToFav, productExists } = useAddToFav(product);

  return (
    <button
      onClick={handleAddToFav}
      className={`absolute top-2 right-2 hover:bg-shop-dark-green/90 p-2 rounded-full text-darkColor hover:text-gray-100 hoverEffect ${productExists ? "bg-shop-dark-green/80 text-white" : "bg-shopLighterBg text-darkColor"}`}
    >
      <Heart size={18} />
    </button>
  );
};

export default AddToFav;
