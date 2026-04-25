import zustandStore from "@/src/store/zustandStore";
import Image from "next/image";
import Link from "next/link";
import { Plus, Minus, Trash2 } from "lucide-react";
import { urlFor } from "@/src/sanity/lib/image";
import toast from "react-hot-toast";

const ProductDetails = () => {
  // Here we get the functions we wanna use in the component from zustand store.
  const {
    cart,
    addQuantity,
    removeQuantity,
    deleteProduct,
    getPrice,
    getItemCount,
  } = zustandStore();

  return (
    <div className="flex flex-col gap-8 border-0">
      {/* Here we map over products stored inside the cart from zustand store. */}
      {cart.map(({ product }) => {
        // Here we want to calculate the product price after it's discount to display it inside the Product Details section.
        const productPrice = product.price ?? 0;
        const productDiscount = product.discount ?? 0;
        const discount = (productPrice * productDiscount) / 100;
        const productPriceWithDiscount = productPrice - discount;

        // Here we create this function to handle the remove quantity button. with two conditions if the product quantity is 1 and the user clicks on decrease again then the product is deleted from the cart and if it's quantity is bigger than 1 then the quantity is decreased by 1.
        const handleRemoveQuantity = () => {
          if (getItemCount(product._id) === 1) {
            deleteProduct(product._id);
            toast.success(
              `${product.name?.substring(0, 12)} is removed from cart!`,
            );
            return;
          } else {
            removeQuantity(product._id);
            toast.success(
              `${product.name?.substring(0, 12)} quantity is removed!`,
            );
          }
        };

        // Here we create this function to handle the add quantity button.
        const handleAddQuantity = () => {
          addQuantity(product._id);
          toast.success(`${product.name?.substring(0, 12)} quantity is added!`);
        };

        // Here we create this function to handle the delete of the product by trash icon from the whole cart.
        const handleDeleteProduct = () => {
          deleteProduct(product._id);
          toast.success(
            `${product.name?.substring(0, 12)} is removed from cart!`,
          );
        };

        return (
          <div className="flex items-start gap-4 p-4 border" key={product._id}>
            {/* img */}
            <Link href={`/client/products/${product.slug?.current}`}>
              <Image
                src={product.images ? urlFor(product.images[0]).url() : ""}
                alt={product.name || "Product"}
                width={100}
                height={100}
                loading="lazy"
                className="w-20 h-20 object-cover sm:w-24 sm:h-24 hover:scale-105 hoverEffect cursor-pointer"
              />
            </Link>
            {/* Product Detail */}
            <div className="flex justify-between items-start gap-4 flex-1">
              {/* Product Description */}
              <div className="space-y-4">
                <p className="font-semibold">{product.name}</p>
                <p>
                  Variant:{" "}
                  <span className="font-semibold capitalize">
                    {product.variant}
                  </span>
                </p>
                <p>
                  Status: {""}
                  {product.status === "hot" && (
                    <span className="font-semibold capitalize text-shopRedColor">
                      {product.status}
                    </span>
                  )}
                  {product.status === "sale" && (
                    <span className="font-semibold capitalize text-shop-light-green">
                      {product.status}
                    </span>
                  )}
                  {product.status === "new" && (
                    <span className="font-semibold capitalize text-blue-500">
                      {product.status}
                    </span>
                  )}
                </p>
                <div className="flex items-center gap-8">
                  <div className="flex items-center gap-4">
                    <span
                      onClick={handleRemoveQuantity}
                      className="cursor-pointer hover:bg-shopLighterBg hoverEffect p-1 rounded-md"
                    >
                      <Minus className="text-darkColor" size={18} />
                    </span>
                    <span>{getItemCount(product._id)}</span>
                    <span
                      onClick={handleAddQuantity}
                      className="cursor-pointer hover:bg-shopLighterBg hoverEffect p-1 rounded-md"
                    >
                      <Plus className="text-darkColor" size={18} />
                    </span>
                  </div>
                  <span className="cursor-pointer hover:bg-shopRedColor/10 hoverEffect p-2 rounded-md">
                    <Trash2
                      onClick={handleDeleteProduct}
                      className="text-shopRedColor cursor-pointer"
                      size={18}
                    />
                  </span>
                </div>
              </div>
              {/* Product Price */}
              <div className="flex flex-col items-start gap-6">
                <>
                  <p className="font-semibold">
                    ${productPriceWithDiscount.toFixed(0)}
                  </p>
                  <p className="text-shopLighterText text-sm">per item</p>
                </>
                <p className="font-semibold text-start">
                  ${getPrice(product._id)}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductDetails;
