"use client";

import zustandStore from "@/src/store/zustandStore";
import EmptyWishlist from "@/src/components/wishlist/EmptyWishlist";
import ProductsInWishlist from "@/src/components/wishlist/ProductsInWishlist";
import { Button } from "@/src/components/ui/button";
import toast from "react-hot-toast";

const WishlistProducts = () => {
  const { favorites, resetWishlist } = zustandStore();

  const clearWishList = () => {
    resetWishlist();
    toast.success("Wishlist is cleared");
  };

  return (
    <div>
      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {favorites.map((product) => (
            <div key={product._id}>
              <ProductsInWishlist product={product} />
            </div>
          ))}
        </div>
      ) : (
        <EmptyWishlist />
      )}
      {favorites.length > 0 && (
        <Button
          variant="destructive"
          onClick={clearWishList}
          className="bg-white border border-shopRedColor text-shopRedColor hover:bg-shopRedColor hover:text-white duration-300 text-center mx-auto w-full md:w-fit block my-10"
        >
          Clear wishlist
        </Button>
      )}
    </div>
  );
};

export default WishlistProducts;
