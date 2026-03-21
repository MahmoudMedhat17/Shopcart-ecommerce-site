import { Product } from "@/sanity.types";

interface PriceViewprops {
  product: Product;
  parentStyling: string;
  finalPriceStyling: string;
  originalPriceStyling: string;
  discountStyling: string;
}

const PriceView = ({
  product,
  parentStyling,
  finalPriceStyling,
  originalPriceStyling,
  discountStyling,
}: PriceViewprops) => {
  const originalPrice = product?.price ?? 0;
  const discount = product?.discount ?? 0;
  const productDiscount = (originalPrice * discount) / 100;
  const finalPrice = originalPrice - productDiscount;

  return (
    <p className={`${parentStyling}`}>
      <span className={`${finalPriceStyling}`}>${finalPrice.toFixed()}</span>
      <span className={`${originalPriceStyling}`}>${originalPrice}</span>
      <span className={`${discountStyling}`}>{discount}%</span>
    </p>
  );
};

export default PriceView;
