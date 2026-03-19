import { Product } from "@/sanity.types";
import { getSingleProduct } from "@/src/sanity/queries/query";
import Unavailable from "@/src/components/Unavailable";
import Container from "@/src/components/Container";
import Image from "next/image";
import { urlFor } from "@/src/sanity/lib/image";
import { StarIcon } from "lucide-react";

const SingleProduct = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  // Here we get the params of the current page with next js params.
  const { slug } = await params;
  // Here we assign the singleProduct variable with data of the single product.
  const singleProduct: Product = await getSingleProduct(slug);

  const image = singleProduct?.images?.[0]
    ? urlFor(singleProduct.images[0]).url()
    : "";

  // Here a check if the product is unavailable == "No slug param at all" then show to the user the Unavailable component that contains a message to the user.
  if (!singleProduct) {
    return <Unavailable />;
  }

  // console.log(singleProduct);

  return (
    <div className="py-10">
      <Container>
        <div className="flex items-start gap-8">
          <div className="p-10 border rounded-md w-1/2">
            <Image
              src={image}
              alt={`${singleProduct.name}`}
              width={500}
              height={500}
            />
          </div>
          <div className="w-1/2">
            {/* This div for the main product info. */}
            <div className="border-b border-shopLighterText/70 space-y-6">
              <span className="bg-shopLighterBg text-shop-dark-green font-semibold px-4 py-1 text-center rounded-md">
                {singleProduct.variant}
              </span>
              <p className="text-shop-dark-green text-4xl font-semibold pt-6">
                {singleProduct.name}
              </p>
              <p className="text-shopLighterText text-lg">
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
                  <p className="pl-4 text-shopLighterText text-base">
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
            <div></div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SingleProduct;
