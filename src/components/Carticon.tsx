"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import zustandStore from "@/src/store/zustandStore";

const Carticon = () => {
  // Here we get the cart array that contains all the products from the store.
  const { cart } = zustandStore();
  return (
    <Link href="/client/cart" className="group relative">
      <ShoppingBag className="w-5 h-5 text-shop-dark-green hover:text-shop-light-green hoverEffect" />
      <span className="absolute -top-1 -right-2 text-white bg-shop-dark-green h-4 w-4 rounded-full flex justify-center items-center text-xs">
        {cart.length > 9 ? "9+" : cart.length}
      </span>
    </Link>
  );
};

export default Carticon;
