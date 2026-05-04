import Image from "next/image";
import Link from "next/link";
import { Product } from "@/sanity.types";
import { urlFor } from "@/src/sanity/lib/image";
import { Title } from "@/src/components/Text";
import PriceView from "@/src/components/price/PriceView";
import Addtocart from "@/src/components/Addtocart";
import AddToFav from "@/src/components/AddToFav";

const ProductsInWishlist = ({ product }: { product: Product }) => {
  const image = product.images ? urlFor(product.images[0]).url() : "";
  const productCategory = product.categories?.[0]?.title || "No category";
  const productInStock = product.stock ?? 0;

  return (
    <div>
      <div className="relative group border border-darkBlue/30 p-4 rounded-md bg-gray-100 h-full">
        {/* Here the Link takes the user to the product page which the user clicked on. */}
        <Link href={`/client/products/${product.slug?.current}`}>
          <Image
            src={image}
            alt={`${product.name}`}
            width={600}
            height={500}
            loading="lazy"
            className="hover:scale-105 hoverEffect w-full h-40 sm:h-52 md:h-56 object-contain overflow-hidden"
          />
        </Link>
        <AddToFav product={product} />
      </div>
      <div className="p-2 space-y-2">
        {/* This to display the category of each product */}
        <p className="text-gray-500 uppercase line-clamp-1 text-sm sm:text-base">
          {productCategory}
        </p>
        {/* To display the name of each product */}
        <Title className="font-semibold text-darkColor line-clamp-1 text-base sm:text-lg">
          {product.name}
        </Title>
        {/* To show the stock number of each product */}
        <p className="bg-shop-lighter-green/50 text-shop-light-green py-1.5 px-2 w-fit rounded-xl text-sm">
          <span
            className={`${productInStock <= 0 ? "text-red-600" : "text-shop-light-green"}`}
          >
            {productInStock > 0 ? product.stock : "Unavailable"}
          </span>{" "}
          in stock
        </p>

        {/* To display the final price after the discount of each product and the original price before the discount */}
        <PriceView
          product={product}
          parentStyling="flex items-center gap-2"
          finalPriceStyling="text-shop-dark-green font-semibold text-xl"
          originalPriceStyling="hidden"
          discountStyling="hidden"
        />
        <Addtocart product={product} className="w-full" />
      </div>
    </div>
  );
};

export default ProductsInWishlist;
