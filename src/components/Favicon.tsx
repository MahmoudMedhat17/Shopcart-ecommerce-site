"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import zustandStore from "../store/zustandStore";

const Favpage = () => {
  const { favorites } = zustandStore();

  return (
    <Link href="/" className="group relative">
      <Heart className="w-5 h-5 text-shop-dark-green hover:text-shop-light-green hoverEffect" />
      <span className="absolute -top-1 -right-2 text-white bg-shop-dark-green h-4 w-4 rounded-full flex justify-center items-center text-xs">
        {favorites.length}
      </span>
    </Link>
  );
};

export default Favpage;
