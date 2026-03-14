import Dealstimer from "@/src/components/hotdeals/Dealstimer";
import { Product } from "@/sanity.types";
import { Title, SubTitle } from "@/src/components/Text";
import { Flame, ShoppingBag, TrendingDown, Users } from "lucide-react";

const Dealsbanner = ({ hotdealsData }: { hotdealsData: Product[] }) => {
  // Here we get the total length of the hot deal products = 16
  const hotdealsDataProducts = hotdealsData.length;

  // Here i applied reduce to the hotdealsData to get the sum of the totalDiscounts of the products in hot deal status. for ex [10, 10] = 20 Discount.
  const totalDiscounts = hotdealsData.reduce<number>(
    (acc, product) => acc + (product?.discount ?? 0),
    0,
  );

  // Here we want the avg discount of the hot deals by dividing the sum of the totalDiscounts to the sum of the products that have these discounts. for ex [10,10,10] = 30 -> total number of the products & [10,10] = 20 -> total number of the discounts.
  const avgDiscount =
    hotdealsDataProducts > 0 ? totalDiscounts / hotdealsDataProducts : 0;

  return (
    <div className="w-full bg-linear-to-r from-red-500 via-shop-orange to-shop-orange/80 p-6 md:p-12 rounded-lg">
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <p className="flex items-center gap-2 bg-white/40 w-fit p-2 rounded-full text-white font-semibold uppercase text-sm sm:text-base">
              <Flame className="text-yellow-400 fill-shop-orange" />
              Hot Deals
            </p>
            <p className="p-2 bg-shopLightText/50 w-fit rounded-md text-white uppercase font-semibold text-sm sm:text-base">
              Up to 20% OFF
            </p>
          </div>
          <div className="pt-10">
            <Title className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-2 sm:mb-4 font-bold text-white">
              Weekly Hot Deals
            </Title>
            <SubTitle className="text-sm sm:text-base md:text-lg text-white/80 max-w-2xl">
              Don&apos;t miss out on these incredible limited-time offers! Save
              big on your favorite products with discounts up to 20% off.
              Limited stock available
            </SubTitle>
          </div>
          <div className="text-white grid grid-cols-2 xs:grid-cols-3 gap-4 w-fit pt-4">
            <div className="bg-gray-100/10 p-4 rounded-md space-y-2">
              <div className="flex flex-col sm:flex-row items-start gap-2">
                <ShoppingBag size={18} />
                <p className="text-sm sm:text-base">Products</p>
              </div>
              <p className="font-semibold text-base sm:text-2xl">
                {hotdealsDataProducts}
              </p>
            </div>
            <div className="bg-gray-100/10 p-4 rounded-md space-y-2">
              <div className="flex flex-col sm:flex-row items-start gap-2">
                <TrendingDown size={18} />
                <p className="text-sm sm:text-base">Avg. Discount</p>
              </div>
              <p className="font-semibold text-base sm:text-2xl">
                {avgDiscount.toFixed()}%
              </p>
            </div>
            <div className="bg-gray-100/10 p-4 rounded-md space-y-2">
              <div className="flex flex-col sm:flex-row items-start gap-2">
                <Users size={18} />
                <p className="text-sm sm:text-base">Happy Customers</p>
              </div>
              <p className="font-semibold text-base sm:text-2xl">2.5K+</p>
            </div>
          </div>
        </div>
        <Dealstimer />
      </div>
    </div>
  );
};

export default Dealsbanner;
