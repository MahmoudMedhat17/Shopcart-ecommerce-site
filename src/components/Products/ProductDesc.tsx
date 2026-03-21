import { Product } from "@/sanity.types";
import { Title } from "@/src/components/Text";

interface ProductDescProps {
  productDescription: Product;
}

const ProductDesc = ({ productDescription }: ProductDescProps) => {
  return (
    <div className="p-8 border border-shopLighterText/50 shadow-lg rounded-md my-10">
      <Title className="flex items-center gap-2 pb-4">
        <div className="w-1.5 h-8 rounded-lg bg-shop-orange" />
        Description
      </Title>
      <p className="text-lg text-shopLightText">{productDescription.description}</p>
    </div>
  );
};

export default ProductDesc;
