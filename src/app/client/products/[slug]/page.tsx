import { Product } from "@/sanity.types";
import {
  getSingleProduct,
  getRandomProducts,
} from "@/src/sanity/queries/query";
import Unavailable from "@/src/components/Unavailable";
import Container from "@/src/components/Container";
import PriceView from "@/src/components/price/PriceView";
import Addtocart from "@/src/components/Addtocart";
import ProductInfo from "@/src/components/Products/ProductInfo";
import ProductDesc from "@/src/components/Products/ProductDesc";
import RandomProducts from "@/src/components/Products/RandomProducts";
import { singleProductService } from "@/src/constants/data";
import Image from "next/image";
import { urlFor } from "@/src/sanity/lib/image";
import { Heart, StarIcon, PiggyBank } from "lucide-react";

const SingleProduct = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  // Here we get the params of the current page with next js params.
  const { slug } = await params;
  // Here we assign the singleProduct variable with data of the single product.
  const singleProduct: Product = await getSingleProduct(slug);

  const randomizedProducts = (await getRandomProducts()) as Product[];

  const image = singleProduct?.images?.[0]
    ? urlFor(singleProduct.images[0]).url()
    : "";

  const singleProductInStock = singleProduct.stock ?? 0;
  // Here a check if the product is unavailable == "No slug param at all" then show to the user the Unavailable component that contains a message to the user.
  if (!singleProduct) {
    return <Unavailable />;
  }

  return (
    <div className="py-10">
      <Container>
        <div className="flex flex-col md:flex-row items-start gap-8">
          <div className="p-10 border rounded-md w-full md:w-1/2">
            <Image
              src={image}
              alt={`${singleProduct.name}`}
              width={500}
              height={500}
              className="mx-auto hover:scale-105 hoverEffect"
            />
          </div>
          <div className="w-full md:w-1/2">
            {/* This div for the main product info. */}
            <div className="border-b border-shopLighterText/50 space-y-6">
              <span className="bg-shopLighterBg text-shop-dark-green font-semibold px-4 py-1 text-center rounded-md capitalize">
                {singleProduct.variant}
              </span>
              <p className="text-shop-dark-green text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold pt-6">
                {singleProduct.name}
              </p>
              <p className="text-shopLighterText text-sm sm:text-base lg:text-lg">
                {singleProduct.description}
              </p>
              {singleProduct ? (
                <div className="flex items-center pb-6">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <StarIcon
                      key={index}
                      size={14}
                      className={
                        Math.round(singleProduct.averageRating || 0) > index
                          ? "text-shop-lighter-green"
                          : "text-shopLighterText"
                      }
                      fill={
                        Math.round(singleProduct.averageRating || 0) > index
                          ? "#93D991"
                          : "#ababab"
                      }
                    />
                  ))}
                  <p className="pl-4 text-shopLighterText text-sm sm:text-base">
                    {singleProduct.totalReviews === 0
                      ? "No Reviews"
                      : `${singleProduct.totalReviews} Review`}
                  </p>
                </div>
              ) : (
                <p className="text-shopLighterText text-base">No reviews yet</p>
              )}
            </div>

            {/* This div for product pricing and availability in the stock */}
            <div className="p-4 space-y-5 border-b border-shopLighterText/50">
              <PriceView
                parentStyling="flex items-center gap-4"
                product={singleProduct}
                finalPriceStyling="text-shop-dark-green font-semibold text-lg md:text-2xl"
                originalPriceStyling="line-through text-shopLightText text-lg md:text-2xl"
                discountStyling="text-sm bg-red-200 text-red-500 px-1 rounded-md text-lg"
              />
              {singleProductInStock > 0 ? (
                <p className="bg-shop-lighter-green/30 text-shop-light-green font-semibold w-fit px-4 py-1 rounded-lg">
                  In stock
                </p>
              ) : (
                <p className="bg-shopLighterBg text-shopRedColor font-semibold w-fit px-4 py-1 rounded-lg">
                  Unavailable
                </p>
              )}
              <p className="bg-shop-light-pink text-shop-orange flex items-center gap-2 p-2 rounded-md">
                <PiggyBank /> Save {singleProduct.discount}% on this item!
              </p>
            </div>
            {/* Add to cart button, Like button section */}
            <div className="flex items-center gap-4 w-full pt-4">
              <Addtocart
                className="rounded-md mt-2 flex-1 py-1.5"
                product={singleProduct}
              />
              <div className="group shrink-0">
                <div className="p-1.5 border border-shop-light-green rounded-md w-fit mt-2 cursor-pointer group-hover:text-shop-dark-green group-hover:border-shop-dark-green hoverEffect">
                  <Heart className="text-shop-light-green group-hover:text-shop-dark-green hoverEffect" />
                </div>
              </div>
            </div>

            {/* Accordion with Product Info */}
            <ProductInfo productInfo={singleProduct} />
          </div>
        </div>
        {/* Product Desc */}
        <ProductDesc productDescription={singleProduct} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {singleProductService.map((product) => (
            <div
              key={product.title}
              className="border border-b-shopLighterText flex flex-col justify-center items-center p-4 rounded-lg shadow-md"
            >
              {product.icon}
              <p className="text-shop-dark-green font-semibold text-lg pt-3">
                {product.title}
              </p>
              <p className="text-shopLightText">{product.desc}</p>
            </div>
          ))}
        </div>
        <RandomProducts randomProducts={randomizedProducts} />
      </Container>
    </div>
  );
};

export default SingleProduct;
