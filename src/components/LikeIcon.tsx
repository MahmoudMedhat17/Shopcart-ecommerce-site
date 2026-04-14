"use client";
import { Heart } from "lucide-react";
import { Product } from "@/sanity.types";
import useAddToFav from "@/src/hooks/useAddToFav";

const LikeIcon = ({ singleProduct }: { singleProduct: Product }) => {
  const { handleAddToFav, productExists } = useAddToFav(singleProduct);
  return (
    <div
      onClick={handleAddToFav}
      className="p-1.5 border border-shop-light-green rounded-md w-fit mt-2 cursor-pointer group-hover:text-shop-dark-green group-hover:border-shop-dark-green hoverEffect"
    >
      <Heart
        className={`group-hover:text-shop-dark-green hoverEffect ${productExists && "text-shop-dark-green fill-shop-dark-green"}`}
      />
    </div>
  );
};

export default LikeIcon;
