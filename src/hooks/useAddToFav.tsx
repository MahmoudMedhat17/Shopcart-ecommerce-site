import zustandStore from "../store/zustandStore";
import { Product } from "@/sanity.types";
import toast from "react-hot-toast";

const useAddToFav = (product: Product) => {
  // Here we called favorites array and toggleFavorite function from store.
  const { favorites, toggleFavorite } = zustandStore();
  // Here we check if the product exists in the favorites array. then some returns true else false.
  const productExists = favorites.some((item) => item._id === product._id);

  //Here this handleAddToFav function handles the toggle functionality coming from the store and also shows a msg to the user that if the product doesn't exist inside the favorites array then show the user that the product is added to favorites if it exists then show the user that the product is removed from favorites.
  const handleAddToFav = () => {
    toggleFavorite(product);
    toast.success(
      `${product.name?.substring(0, 12)} ${!productExists ? "added to" : "removed from"} Wishlist!`,
    );
  };

  return {
    handleAddToFav,
    productExists,
  };
};

export default useAddToFav;
