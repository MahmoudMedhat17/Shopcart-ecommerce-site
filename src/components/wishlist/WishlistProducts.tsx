"use client";

import zustandStore from "@/src/store/zustandStore";

const WishlistProducts = () => {
  const favorites = zustandStore((state) => state.favorites);


  
  return <div>WishlistProducts</div>;
};

export default WishlistProducts;
