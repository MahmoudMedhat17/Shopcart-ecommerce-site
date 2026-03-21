import { Product } from "@/sanity.types";
import { SubText, Title } from "@/src/components/Text";
import ProductCard from "@/src/components/Products/ProductCard";

interface RandomProductsProps {
  randomProducts: Product[];
}

const RandomProducts = ({ randomProducts }: RandomProductsProps) => {
  return (
    <div className="py-10">
      <div className="flex flex-col justify-center items-center">
        <Title>You Might Also Like</Title>
        <SubText>Similar products from the same category</SubText>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {randomProducts.map((product) => (
          <div key={product._id}>
            {/* Need to see why ProductCard doesn't work. */}
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RandomProducts;
