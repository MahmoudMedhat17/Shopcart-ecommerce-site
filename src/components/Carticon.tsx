"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import zustandStore from "@/src/store/zustandStore";

const Carticon = () => {
  const { getGroupedItems } = zustandStore();
  const cartCount = getGroupedItems();
  return (
    <Link href="/cart" className="group relative">
      <ShoppingBag className="w-5 h-5 text-shop-dark-green hover:text-shop-light-green hoverEffect" />
      <span className="absolute -top-1 -right-2 text-white bg-shop-dark-green h-3.5 w-3.5 rounded-full flex justify-center items-center text-sm">
        {cartCount.length}
      </span>
    </Link>
  );
};

export default Carticon;
