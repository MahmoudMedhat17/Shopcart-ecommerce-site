import Reasons from "@/src/components/Whyus/Reasons";
import { Title, SubText } from "@/src/components/Text";

const Whyus = () => {
  return (
    <div className="flex flex-col justify-center items-center py-12 space-y-6">
      <div className="flex items-center  gap-2 sm:gap-4">
        <div className="w-16 h-1 bg-linear-to-r from-shop-light-green to-shop-dark-green rounded-full" />
        <Title className="text-darkColor text-3xl lg:text-4xl font-bold text-center">
          Why Shop With Us
        </Title>
        <div className="w-16 h-1 bg-linear-to-r from-shop-light-green to-shop-dark-green rounded-full" />
      </div>
      <SubText className="text-gray-600 text-xl max-w-2xl mx-auto text-center">
        Experience the best online shopping with our commitment to quality,
        security, and exceptional service
      </SubText>

      <Reasons />
    </div>
  );
};

export default Whyus;
