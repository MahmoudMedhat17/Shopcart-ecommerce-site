"use client";

import { Product } from "@/sanity.types";
import { ShoppingBag } from "lucide-react";
import { cn } from "../lib/utils";
import zustandStore from "@/src/store/zustandStore";
import toast from "react-hot-toast";

interface AddtocartProps {
  product: Product;
  className?: string;
}

const Addtocart = ({ product, className }: AddtocartProps) => {
  const stockBtn = product.stock === 0 ? "Out of stock" : "Add to cart";
  // Here we get the functions from the store.
  const { addProduct, getItemCount } = zustandStore();
  // Here we set itemCount with the amount of the product the user wants to add to cart by the id of the product.
  const itemCount = getItemCount(product._id);
  // Here is a variable that the stock of the product is = to 0.
  const outOfStock = product.stock === 0;
  // Here we check if the amount of the same product the user added exceeds or equal to the amount of the same product stock.
  const isMaxReached = itemCount >= (product.stock ?? 0);

  const handleAddToCart = () => {
    // If the product is out of stock already or the user added the maximum amount of the same product we show an error msg to the user that the product is out of stock.
    if (outOfStock || isMaxReached) {
      toast.error(`${product.name} is out of stock!`);
    }
    // Here else then we call the addProduct function from the store and pass to it the Product Object that contains the data of the product and show the user a msg that the product is successfully added.
    else {
      addProduct(product);
      toast.success(`${product.name?.substring(0, 12)} is added successfully!`);
    }
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
