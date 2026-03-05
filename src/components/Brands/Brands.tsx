import Link from "next/link";
import SingleBrand from "@/src/components/Brands/SingleBrand";
import { Title, SubText } from "@/src/components/Text";
import { MoveRight } from "lucide-react";
import { Brand } from "@/sanity.types";

const Brands = ({ brandsData }: { brandsData: Brand[] }) => {
  return (
    <div className="py-12 flex flex-col items-center justify-center space-y-6">
      <div className="flex items-center  gap-2 sm:gap-4">
        <div className="w-16 h-1 bg-linear-to-r from-shop-orange to-shopLighterBg rounded-full" />
        <Title className="text-darkColor text-3xl lg:text-4xl font-bold text-center">
          Shop By Brands
        </Title>
        <div className="w-16 h-1 bg-linear-to-r from-shopLighterBg to-shop-orange rounded-full" />
      </div>
      <SubText className="text-gray-600 text-xl max-w-2xl mx-auto text-center">
        Discover products from your favorite trusted brands
      </SubText>
      <Link href={"/client/category"}>
        <button className="flex items-center gap-2 border border-shop-orange text-shop-dark-green/80 hover:bg-shop-orange hover:text-white hoverEffect bg-shop-light-bg rounded-full px-6 py-3 font-semibold">
          Explore All Brands
          <MoveRight size={18} />
        </button>
      </Link>
      <SingleBrand brandsData={brandsData} />
    </div>
  );
};

export default Brands;
