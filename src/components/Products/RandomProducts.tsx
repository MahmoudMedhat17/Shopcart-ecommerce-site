import { Product } from "@/sanity.types";
import { SubText, Title } from "@/src/components/Text";
import ProductCard from "@/src/components/Products/ProductCard";
import Link from "next/link";

interface RandomProductsProps {
  randomProducts: Product[];
}

const RandomProducts = ({ randomProducts }: RandomProductsProps) => {
  return (
    <div className="py-10">
      <div className="flex flex-col justify-center items-center">
        <Title className="text-2xl md:text-3xl lg:text-4xl">
          You Might Also Like
        </Title>
        <SubText className="text-xl text-center pt-2">
          Similar products from the same category
        </SubText>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 pt-10 pb-8">
        {randomProducts.map((product) => (
          <div key={product._id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <Link
        href={"/client/shop"}
        className="text-shop-dark-green border bg-white border-shop-dark-green hover:text-white hover:bg-shop-dark-green hoverEffect py-1.5 px-4 rounded-md flex justify-center items-center w-fit mx-auto"
      >
        View More Products
      </Link>
    </div>
  );
};

export default RandomProducts;
