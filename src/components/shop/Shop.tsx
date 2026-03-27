"use client";

import { BRANDS_QUERY_RESULT, Category, Product } from "@/sanity.types";
import { SubTitle, Title } from "@/src/components/Text";
import Container from "@/src/components/Container";
import CategoryList from "@/src/components/shop/CategoryList";
import BrandsList from "@/src/components/shop/BrandsList";
import PricesList from "@/src/components/shop/PricesList";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { client } from "@/src/sanity/lib/client";
import { FILTEREDPRODUCTS_QUERY } from "@/src/sanity/queries";
import LoadingComponent from "@/src/components/LoadingComponent";
import NoProducts from "@/src/components/Products/NoProducts";
import ProductCard from "@/src/components/Products/ProductCard";

interface ShopProps {
  categories: Category[];
  brands: BRANDS_QUERY_RESULT;
  allProducts: Product[];
}

const Shop = ({ categories, brands, allProducts }: ShopProps) => {
  const searchParams = useSearchParams();
  const brandParams = searchParams.get("brand");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState(allProducts);
  const [selectedCategory, setSelectedCategory] = useState<string | null>("");
  const [selectedBrand, setSelectedBrand] = useState<string | null>(
    brandParams,
  );
  const [selectedPrice, setSelectedPrice] = useState<string | null>("");

  //  Need to create the filteration function.

  const fetchFilteredProducts = async () => {
    // Here we set the loading state to true to fire the loading state when data is fetching -> LoadingComponent.
    setLoading(true);
    try {
      // Here we set a price range that we need to loop through for price filteration so we set min price to 0 and the max price to 10k and we loop through between those numbers.
      let minPrice = 0;
      let maxPrice = 10000;

      // This condition means if the user chose to filter by prices "Prices state -> selectedPrice" then do what inside the condition block.
      if (selectedPrice) {
        // Here means that assign to indexes of min and max with the selectedPrice state and split between them with "-" -> $100 - $200 and then loop between the numbers splitted with "-" so when the user choose prices between 100 and 200 for example he gets the products between those numbers like $150 for example.
        const [min, max] = selectedPrice.split("-").map(Number);

        minPrice = min;
        maxPrice = max;
      }

      // Here we assign filteredProducts variable with fetched data with FILTEREDPRODUCTS_QUERY query and passing the states defined in the query as an arguments to client.fetch.
      const filteredProducts = await client.fetch(FILTEREDPRODUCTS_QUERY, {
        selectedCategory,
        selectedBrand,
        minPrice,
        maxPrice,
      });
      // Set the state of the products with the new filteredProducts Data so we can use products to loop through the data and display it.
      console.log(filteredProducts);

      setProducts(filteredProducts);
    } catch (error) {
      console.log("Failed fetching filtered products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFilteredProducts();
  }, [selectedCategory, selectedBrand, selectedPrice]);

  return (
    <div>
      <Container className="mt-5">
        <div className="sticky top-0 z-10 mb-5 flex items-center flex-col md:flex-row justify-between px-6 py-4 bg-white shadow-lg rounded-lg border border-shopLighterBg">
          <div className="space-y-3">
            <Title className="text-darkColor text-2xl tracking-wide">
              Shop Products
            </Title>
            <SubTitle className="text-base text-shopLightText font-medium">
              Discover amazing products tailored to your needs
            </SubTitle>
          </div>
          <button className="border border-shopRedColor text-shopRedColor bg-shopRedColor/10 hover:bg-shopRedColor/30 hoverEffect rounded-md px-4 py-1.5">
            Clear All Filters
          </button>
        </div>
        <div className="flex flex-col md:flex-row gap-5">
          <div className="md:sticky md:top-20 md:self-start md:min-h-[calc(100vh - 160px)] md:min-w-72 shadow-lg rounded-lg border border-shopLighterBg">
            <div className="bg-shopLighterBg">
              <Title className="text-lg text-darkColor py-3 px-4">
                Filters
              </Title>
            </div>
            {/* Category */}
            <CategoryList
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
            {/* Brands */}
            <BrandsList
              brands={brands}
              selectedBrand={selectedBrand}
              setSelectedBrand={setSelectedBrand}
            />
            {/* Prices */}
            <PricesList
              selectedPrice={selectedPrice}
              setSelectedPrice={setSelectedPrice}
            />
          </div>
          <div className="shadow-lg rounded-lg border border-shopLighterBg flex-1">
            {loading ? (
              <LoadingComponent />
            ) : products.length > 0 ? (
              <div className="grid max-[500px]:grid-cols-1 min-[501px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 mt-10">
                {products.map((product) => (
                  <div key={product._id}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <NoProducts />
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Shop;
