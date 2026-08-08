"use client";

import { Product } from "@/sanity.types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion";
import {
  PaintBucket,
  CircleQuestionMark,
  Truck,
  Share2,
  CornerDownLeft,
} from "lucide-react";

interface ProductInfoProps {
  productInfo: Product;
}

const ProductInfo = ({ productInfo }: ProductInfoProps) => {
  const productStock = productInfo.stock ?? 0;
  const productInStock = productStock > 0 ? "Available" : "Not available";

  return (
    <div>
      <Accordion
        className="pt-2 sm:pt-4 md:pt-8 border-b border-shopLighterText/50"
        type="single"
        collapsible
        defaultValue="item-1"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className="font-semibold">
            {productInfo.name}
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex justify-between items-center">
              <p>Brand:</p>
              <p className="font-semibold">
                {(productInfo.brand as { string?: string })?.string}
              </p>
            </div>
          </AccordionContent>
          <AccordionContent>
            <div className="flex justify-between items-center">
              <p>Type:</p>
              <p className="font-semibold">{productInfo.variant}</p>
            </div>
          </AccordionContent>
          <AccordionContent className="pb-4">
            <div className="flex justify-between items-center">
              <p>Stock:</p>
              <p className="font-semibold">{productInStock}</p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      {/* More product info */}
      <div className="flex items-center justify-between flex-wrap gap-8 md:gap-0 py-8 border-b border-shopLighterText/50">
        <div className="w-full xs:w-fit flex items-center gap-2 hover:text-shop-light-green hoverEffect cursor-pointer">
          <PaintBucket />
          <p className="text-sm">Compare Color</p>
        </div>
        <div className="w-full xs:w-fit flex items-center gap-2 hover:text-shop-light-green hoverEffect cursor-pointer">
          <CircleQuestionMark />
          <p className="text-sm">Ask a question</p>
        </div>
        <div className="w-full xs:w-fit flex items-center gap-2 hover:text-shop-light-green hoverEffect cursor-pointer">
          <Truck />
          <p className="text-sm">Delivery & Return</p>
        </div>
        <div className="w-full xs:w-fit flex items-center gap-2 hover:text-shop-light-green hoverEffect cursor-pointer">
          <Share2 />
          <p className="text-sm">Share</p>
        </div>
      </div>
      {/* Delivery options */}
      <div className="border border-shopLighterText/50 rounded-md mt-6">
        <div className="border-b border-shopLighterText/50 flex items-center gap-4 p-4">
          {/* icon */}
          <Truck className="text-shop-orange" size={35} />
          <div>
            <p className="font-semibold text-xl">Free Delivery</p>
            <p className="text-shopLightText text-sm sm:text-base lg:text-lg">
              Enter your Postal code for Delivery Availability.{" "}
              <span className="underline hover:text-shop-light-green hoverEffect cursor-pointer">
                Check now
              </span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 p-4">
          {/* icon */}
          <CornerDownLeft className="text-shop-orange" size={35} />
          <div>
            <p className="font-semibold text-xl">Return Delivery</p>
            <p className="text-shopLightText text-sm sm:text-base lg:text-lg">
              Free 30 days Delivery Returns.{" "}
              <span className="underline hover:text-shop-light-green hoverEffect cursor-pointer">
                Details
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
