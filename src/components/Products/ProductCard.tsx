import { Product } from "@/sanity.types";
import { urlFor } from "@/src/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { Flame, Heart, StarIcon } from "lucide-react";

const ProductCard = ({ product }: { product: Product }) => {
  const image = urlFor(product.images[0]).url();
  const productCategory = product.categories[0].title;

  return (
    <div>
      <div className="relative group border border-darkBlue/30 p-4 rounded-md bg-gray-100 h-full">
        <Image
          src={image}
          alt={`${product.name}`}
          width={600}
          height={500}
          loading="lazy"
          className="hover:scale-105 hoverEffect"
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
        <p className="text-gray-500">{productCategory}</p>
        <h3 className="font-semibold text-darkColor">{product.name}</h3>
        <div className="flex items-center gap-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <StarIcon
              key={index}
              size={14}
              className={
                Math.round(product.averageRating || 0) > index
                  ? "text-shop-light-green"
                  : "text-shopLighterBg"
              }
              fill={
                Math.round(product.averageRating || 0) > index
                  ? "#93D991"
                  : "#ababab"
              }
            />
          ))}
          <p className="text-gray-400 text-sm">
            {product.totalReviews === 0
              ? "No Reviews"
              : `${product.totalReviews} Review`}
          </p>
        </div>
        <p>
          In Stock{" "}
          <span className="font-semibold text-shop-dark-green/75">
            {product.stock}
          </span>
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
