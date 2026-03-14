import Link from "next/link";
import { SubTitle, Title } from "@/src/components/Text";

const DontmissDeals = () => {
  return (
    <div className="w-full bg-linear-to-r from-shop-dark-green via-shop-dark-green/80 to-shop-light-green p-6 md:p-12 rounded-lg">
      <div className="flex flex-col items-center justify-center">
        <Title className="text-white text-center text-xl sm:text-2xl md:text-3xl">
          Don&apos;t Miss Out on These Amazing Deals!
        </Title>
        <SubTitle className="pt-4 max-w-2xl text-center text-white/80">
          Subscribe to our newsletter to get notified about flash sales,
          exclusive deals, and new arrivals.
        </SubTitle>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6 pt-4">
        <Link href={"/client/shop"}>
          <button className="text-darkColor bg-white hover:bg-shopLighterBg hoverEffect px-6 py-2 rounded-lg text-lg">
            Explore All Products
          </button>
        </Link>
        <button className="text-white border border-white rounded-lg hover:text-darkColor hover:bg-white hoverEffect px-6 py-2 text-lg">
          Subscribe for Deals
        </button>
      </div>
    </div>
  );
};

export default DontmissDeals;
