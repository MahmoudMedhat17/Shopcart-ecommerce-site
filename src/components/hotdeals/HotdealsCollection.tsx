import HotdealsProducts from "@/src/components/hotdeals/HotdealsProducts";
import { SubText, Title } from "@/src/components/Text";
import { getHotDeals } from "@/src/sanity/queries/query";
import { Flame } from "lucide-react";

const HotdealsCollection = async () => {
  const hotdealsProductsData = await getHotDeals();


  return (
    <div className="flex flex-col justify-center items-center py-12 space-y-6">
      <div className="flex items-center  gap-2 sm:gap-4">
        <Flame size={35} className="text-red-500" />
        <Title className="text-darkColor text-3xl lg:text-4xl font-bold text-center">
          Hot Deals Collection
        </Title>
        <Flame size={35} className="text-red-500" />
      </div>
      <SubText className="text-gray-600 text-xl max-w-2xl mx-auto text-center">
        Discover amazing deals on premium products. Limited quantities available
        at these special prices.
      </SubText>
      <HotdealsProducts hotdealsProductsData={hotdealsProductsData?.data} />
    </div>
  );
};

export default HotdealsCollection;
