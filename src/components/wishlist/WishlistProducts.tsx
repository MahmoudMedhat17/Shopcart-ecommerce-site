"use client";

import zustandStore from "@/src/store/zustandStore";
import EmptyWishlist from "@/src/components/wishlist/EmptyWishlist";
import ProductsInWishlist from "@/src/components/wishlist/ProductsInWishlist";
import { Button } from "@/src/components/ui/button";
import toast from "react-hot-toast";
import { useState } from "react";

const WishlistProducts = () => {
  const { favorites, resetWishlist } = zustandStore();
  // Here we set visibleCount to hold 5 products.
  const [visibleCount, setVisibleCount] = useState(5);
  // Here we set allFavoriteProducts variable to hold favorite products inside the wishlist page from 0 to the visibleCount variable limit "5".
  const allFavoriteProducts = favorites.slice(0, visibleCount);

  // Has more if the visibleCount "5" is less than the favorite produtcs inisde the favorite array. => Means that there's more than "visibleCount" variable holds. in this exmaple is more than 5 products.
  const hasMore = visibleCount < favorites.length;
  // Has less if the visibleCount is bigger than 5 produtcs so if there's like 20 products that means it's bigger than 5 then the has less should dislpay none the products by clicking on it.
  const hasLess = visibleCount > 5;

  // This function handles the loadMore button functionality.
  const loadMore = () => {
    // By changing the visibleCount state by 5 more so loads more 5 products.
    setVisibleCount((prev) => prev + 5);
  };

  // This function handles the loadLess button functionality.
  const loadLess = () => {
    // By changing the visibleCount state by 5 less so loads less 5 products.
    // So if there's 20 products by clicking on loadLess it deletes or display none to 5 products by click.
    setVisibleCount((prev) => Math.max(prev - 5, 5));
  };

  const clearWishList = () => {
    toast(
      (sure) => (
        <div className="flex items-center gap-3">
          <span>Clear entire wishlist?</span>
          <button
            onClick={() => {
              resetWishlist();
              toast.dismiss(sure.id);
              toast.success("Wishlist is cleared");
            }}
            className="bg-red-500 text-white px-2 py-1 rounded text-sm"
          >
            Yes
          </button>
          <button
            onClick={() => toast.dismiss(sure.id)}
            className="border px-2 py-1 rounded text-sm"
          >
            No
          </button>
        </div>
      ),
      { duration: 5000, position: "top-center" },
    );
  };

  return (
    <div>
      {allFavoriteProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {allFavoriteProducts.map((product) => (
            <div key={product._id}>
              <ProductsInWishlist product={product} />
            </div>
          ))}
        </div>
      ) : (
        <EmptyWishlist />
      )}
      {(hasMore || hasLess) && (
        <div className="flex justify-center gap-4 my-6">
          {hasLess && (
            <Button
              variant="outline"
              onClick={loadLess}
              className="border border-gray-400 hover:bg-gray-100 hoverEffect"
            >
              Load Less Products
            </Button>
          )}
          {hasMore && (
            <Button
              variant="outline"
              onClick={loadMore}
              className="border border-gray-400 hover:text-white hover:bg-shop-dark-green hoverEffect"
            >
              Load More Products
            </Button>
          )}
        </div>
      )}
      {allFavoriteProducts.length > 0 && (
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
