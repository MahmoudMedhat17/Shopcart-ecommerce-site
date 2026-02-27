import { Product } from "@/sanity.types";

interface PriceViewprops {
  product: Product;
}

const PriceView = ({ product }: PriceViewprops) => {
  const originalPrice = product.price;
  const discount = product.discount;
  const productDiscount = (product.price * discount) / 100;
  const finalPrice = product.price - productDiscount;

  return (
    <p className="flex items-center gap-2">
      <span className="text-shop-dark-green font-semibold text-lg">
        ${finalPrice.toFixed()}
      </span>
      <span className="line-through text-shopLightText text-lg">
        ${originalPrice}
      </span>
      <span className="text-sm bg-red-200 text-red-500 px-1 rounded-md">
        {discount}%
      </span>
    </p>
  );
};

export default PriceView;
