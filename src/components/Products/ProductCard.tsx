import { Product } from "@/sanity.types";
import { urlFor } from "@/src/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { Title } from "@/src/components/Text";
import { Flame, Heart, StarIcon, ShoppingBag, Minus, Plus } from "lucide-react";

const ProductCard = ({ product }: { product: Product }) => {
  const image = urlFor(product.images[0]).url();
  const productCategory = product.categories[0].title;
  const originalPrice = product.price;
  const discount = product.discount;
  const productDiscount = (product.price * discount) / 100;
  const finalPrice = product.price - productDiscount;

  return (
    <div>
      <div className="relative group border border-darkBlue/30 p-4 rounded-md bg-gray-100 h-full">
        <Image
          src={image}
          alt={`${product.name}`}
          width={600}
          height={500}
          loading="lazy"
          className="hover:scale-105 hoverEffect w-full h-56 object-contain overflow-hidden"
        />
        {/* Here if the status === "sale" then show the sale icon */}
        {product.status === "sale" && (
          <p className="absolute top-2 left-2 px-3 border border-darkColor rounded-full hoverEffect group-hover:border-shop-light-green text-sm z-10">
            Sale!
          </p>
        )}
        {/* If the status === "hot" then show the hot icon */}
        {product.status === "hot" && (
          <Link href="/deal">
            <Flame
              className="absolute top-2 left-2 p-1 border border-orange-500/50 text-orange-500 fill-orange-500 rounded-full hoverEffect group-hover:border-orange-500 z-10"
              size={30}
            />
          </Link>
        )}
        {/* Heart icon for adding the product to the cart */}
        <button className="absolute top-2 right-2 bg-shopLighterBg hover:bg-shop-dark-green/90 p-2 rounded-full text-darkColor hover:text-gray-100 hoverEffect">
          <Heart size={18} />
        </button>
      </div>
      <div className="p-2 space-y-2">
        {/* This to display the category of each product */}
        <p className="text-gray-500 uppercase line-clamp-1">
          {productCategory}
        </p>
        {/* To display the name of each product */}
        <Title className="font-semibold text-darkColor line-clamp-1 text-base">
          {product.name}
        </Title>
        {/* This is a review rating style */}
        <div className="flex items-center gap-2">
          {/*Here creating an array that holds 5 indexes and display the star icon according the indexes of the array to form a star rating system. */}
          {Array.from({ length: 5 }).map((_, index) => (
            <StarIcon
              key={index}
              size={14}
              className={
                Math.round(product.averageRating || 0) > index
                  ? "text-shop-lighter-green"
                  : "text-shopLighterText"
              }
              fill={
                Math.round(product.averageRating || 0) > index
                  ? "#93D991"
                  : "#ababab"
              }
            />
          ))}
          {/* Here we show the number of reviews if there's reviews for the product or not. */}
          <p className="text-gray-400 text-sm tracking-wide">
            {product.totalReviews === 0
              ? "No Reviews"
              : `${product.totalReviews} Review`}
          </p>
        </div>
        {/* To show the stock number of each product */}
        <p>
          In Stock{" "}
          <span className="font-semibold text-shop-dark-green/75">
            {product.stock}
          </span>
        </p>

        {/* To display the final price after the discount of each product and the original price before the discount */}
        <p className="flex items-center gap-2">
          <span className="text-shop-dark-green font-semibold text-lg">
            ${finalPrice}
          </span>
          <span className="line-through text-gray-500 text-lg">
            ${originalPrice}
          </span>
          <span className="text-sm bg-red-200 text-red-500 px-1 rounded-md">
            {discount}%
          </span>
        </p>
        <button className="flex items-center gap-2 mt-4 bg-shop-dark-green/80 hover:bg-shop-dark-green hoverEffect text-gray-100 px-5 py-2 rounded-full text-lg">
          <ShoppingBag size={18} />
          Add to Cart
        </button>

        {/* Quantity */}
        {/* <div className="flex items-center justify-between border-b border-gray-200">
          <p className="text-sm text-gray-500">Quantity</p>
          <p className="flex items-center gap-4">
            <span className="hover:bg-gray-300 p-1 rounded-md hoverEffect cursor-pointer">
              <Minus size={18} />
            </span>
            <span className="text-lg">1</span>
            <span className="hover:bg-gray-300 p-1 rounded-md hoverEffect cursor-pointer">
              <Plus size={18} />
            </span>
          </p>
        </div> */}
        {/* Subtotal */}
        {/* <div className="flex items-center justify-between">
          <p className="text-sm font-semibold">Subtotal</p>
          <p>Price</p>
        </div> */}
      </div>
    </div>
  );
};

export default ProductCard;
