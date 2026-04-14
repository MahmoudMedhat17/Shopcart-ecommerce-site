"use client";

import { Product } from "@/sanity.types";
import { ShoppingBag } from "lucide-react";
import { cn } from "../lib/utils";
import zustandStore from "@/src/store/zustandStore";
import toast from "react-hot-toast";
import { SubText } from "@/src/components/Text";
import { Plus, Minus } from "lucide-react";

interface AddtocartProps {
  product: Product;
  className?: string;
}

const Addtocart = ({ product, className }: AddtocartProps) => {
  const {
    addProduct,
    addQuantity,
    getItemCount,
    removeQuantity,
    deleteProduct,
    getPrice,
  } = zustandStore();
  const stockBtn = product.stock === 0 ? "Out of stock" : "Add to cart";
  // Here we set productStock variable to product stock equal to 0 only.
  const productStock = product.stock === 0;
  // Here we set itemCount variable with the product.id which means get the product count "With it's id" by it's quantity.
  const itemCount = getItemCount(product._id);
  // Here we check if the itemCount is bigger than the product stock or equal to it. because we want the user to not be able to add the same product anymore when it maxes it's stock.
  const isMaxed = itemCount >= (product.stock ?? 0);

  const handleAddProduct = () => {
    addProduct(product);
    toast.success(`${product.name?.substring(0, 12)} is added to cart!`);
  };

  const handleRemoveProduct = () => {
    // Here we want to remove the quantity of the current product
    removeQuantity(product._id);
    // And show a toast msg to the user that quantity of the product is decreased.
    toast.success(`${product.name?.substring(0, 12)} is quantity decreased!`);
    // Here we make a check that if the product quantity is less than or equal to 1 then delete the product from the cart.
    if (itemCount <= 1) {
      deleteProduct(product._id);
      // And show a toast msg to the user that the product is removed from the cart.
      toast.success(
        `${product.name?.substring(0, 12)} is removed from the cart!`,
      );
    }
  };

  const handleAddQuantity = () => {
    if (productStock || isMaxed) {
      toast.error(`${product.name?.substring(0, 12)} is out of stock!`);
    } else {
      // Here we add the quantity of the current product
      addQuantity(product._id);
      // And show a toast msg to the user that quantity of the product is increased.
      toast.success(`${product.name?.substring(0, 12)} is quantity increased!`);
    }
  };

  return (
    <>
      {itemCount > 0 ? (
        <div className="flex flex-col flex-1">
          {/* Need to work on adding here when quantity and subtotal when the user clicks Add to cart button. */}
          <div className="flex items-center justify-between">
            <SubText className="text-sm">Quantity</SubText>
            <div className="flex items-center gap-4">
              {/* - */}
              <Minus
                size={14}
                className="cursor-pointer"
                onClick={handleRemoveProduct}
              />
              {/* item count */}
              <span className="font-semibold">{itemCount}</span>
              {/* + */}
              <Plus
                size={14}
                className="cursor-pointer"
                onClick={handleAddQuantity}
              />
            </div>
          </div>
          <div className="flex justify-between items-center border-t pt-1">
            <SubText className="text-darkColor font-semibold text-sm">
              Subtotal
            </SubText>
            <SubText className="text-darkColor font-semibold text-sm">
              ${getPrice(product._id)}
            </SubText>
          </div>
        </div>
      ) : (
        <button
          onClick={handleAddProduct}
          className={cn(
            "flex items-center justify-center gap-2 mt-4 bg-shop-dark-green/80 hover:bg-shop-dark-green hoverEffect text-gray-100 px-3 sm:px-5 py-1 sm:py-2 rounded-full text-lg",
            className,
          )}
        >
          <ShoppingBag size={18} />
          {stockBtn}
        </button>
      )}
    </>
  );
};

export default Addtocart;
