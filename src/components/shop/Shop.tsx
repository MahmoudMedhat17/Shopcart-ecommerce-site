"use client";

import { BRANDS_QUERYResult, Category } from "@/sanity.types";
import { SubTitle, Title } from "@/src/components/Text";
import Container from "@/src/components/Container";
import CategoryList from "@/src/components/shop/CategoryList";
import BrandsList from "@/src/components/shop/BrandsList";
import PricesList from "@/src/components/shop/PricesList";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { client } from "@/src/sanity/lib/client";
import { FILTEREDPRODUCTS_QUERY } from "@/src/sanity/queries";
import { ALLPRODUCTS_QUERYResult } from "@/sanity.types";
import LoadingProduct from "@/src/components/LoadingProduct";
import NoProducts from "@/src/components/Products/NoProducts";
import ProductCard from "@/src/components/Products/ProductCard";
import ScrollToTop from "@/src/lib/Scrolltotop";

interface ShopProps {
  categories: Category[];
  brands: BRANDS_QUERYResult;
  allProducts: ALLPRODUCTS_QUERYResult | null;
}

const Shop = ({ categories, brands, allProducts }: ShopProps) => {
  const searchParams = useSearchParams();
  const brandParams = searchParams.get("brand");
  // We can make here the params of the category so that when the user clicks on one of the categories it chooses it as a filter in the filteration page such as the brands.
  // const categoryParams = searchParams.get("category");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<ALLPRODUCTS_QUERYResult | null>(
    allProducts,
  );
  // Need to make the selectedCategory when selected by the user it filters the data according to that category from the cards of the categories in the main page.
  const [selectedCategory, setSelectedCategory] = useState<string | null>("");
  const [selectedBrand, setSelectedBrand] = useState<string | null>(
    brandParams,
  );
  const [selectedPrice, setSelectedPrice] = useState<string | null>("");

  const fetchProducts = async () => {
    // Setting the loading state to true to start the loading state when the data is called.
    setLoading(true);

    // Setting a price range for min and max prices to use it in price filteration.
    let minPrice = null;
    let maxPrice = null;

    try {
      // Here if the user chose filteration by price then remove the "-" and make min,max to become [min,max] and then map over them as Numbers so price range becomes [100,200] for example. After that assign min to minPrice so minPrice = 100 and max to maxPrice so maxPrice = 200 -> 100 to 200 range.
      if (selectedPrice) {
        const [min, max] = selectedPrice.split("-").map(Number);
        minPrice = Number(min);
        maxPrice = Number(max);
      }

      // Here we fetch the data by client.fetch since we are in a client component and put the params we used in the query.
      const filteredData = await client.fetch(FILTEREDPRODUCTS_QUERY, {
        selectedCategory,
        selectedBrand,
        minPrice,
        maxPrice,
      });

      // Here we set the products state with the new filteredData products.
      setProducts(filteredData);
    } catch (error) {
      console.log("Failed to fetch filtered data:", error);
    } finally {
      // After finishing calling the data we set the loading state back to normal "false" as the data is already loaded.
      setLoading(false);
    }
  };

  // Function that resets the states of each filteration state to clear all the filters.
  const clearFilteration = () => {
    setSelectedCategory("");
    setSelectedBrand("");
    setSelectedPrice("");
  };

  // Here we set this variable as category, brand and prices state to use it to show or hide the clear filteration button when the user select a filter to filter the products.
  const showFilteration = selectedCategory || selectedBrand || selectedPrice;

  // Here this function checks if there's showFilterButton variable then do the function inside "ScrollToTop" that scroll to top of the page when when user selects a filter.
  if (showFilteration) {
    ScrollToTop();
  }

  // useEffect to call the fetchProducts function and it dependencies depend on filteration states.
  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, selectedBrand, selectedPrice]);

  return (
    <div>
      <Container className="my-5">
        <div className="sticky top-0 z-10 mb-5 flex items-center flex-col justify-between px-6 py-4 bg-white shadow-lg rounded-lg border border-shopLighterBg">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full">
            <div className="space-y-3">
              <Title className="text-darkColor text-2xl tracking-wide">
                Shop Products
              </Title>
              <SubTitle className="text-base text-shopLightText font-medium">
                Discover amazing products tailored to your needs
              </SubTitle>
            </div>
            {/* Here if the user chose any filteration "showFilteration" then display a clear all filters button when clicked it removes all the filter options the user choose. */}
            {showFilteration && (
              <button
                onClick={clearFilteration}
                className="border border-shopRedColor text-shopRedColor bg-shopRedColor/10 hover:bg-shopRedColor/30 hoverEffect rounded-md px-4 py-1.5"
              >
                Clear All Filters
              </button>
            )}
          </div>
          {/* Here if the user chose any filteration "showFilteration" then show it as below */}
          {showFilteration && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-start gap-4 w-full pt-8 md:pt-4">
              <p className="text-darkColor text-sm">Active filters:</p>
              <div className="flex items-center gap-4 flex-wrap">
                {selectedCategory && (
                  <p className="bg-bgCategoryFilterColor text-categoryFilterColor py-1.5 px-3 text-xs rounded-full">
                    Category: {selectedCategory}
                  </p>
                )}
                {selectedBrand && (
                  <p className="bg-bgBrandFilterColor text-brandFilterColor py-1.5 px-3 text-xs rounded-full">
                    Brand: {selectedBrand}
                  </p>
                )}
                {selectedPrice && (
                  <p className="bg-bgPriceFilterColor text-priceFilterColor py-1.5 px-3 text-xs rounded-full">
                    Price: {selectedPrice}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-5">
          <div className="md:sticky md:top-20 md:self-start md:min-h-[calc(100vh - 160px)] overflow-y-auto md:min-w-72 shadow-lg rounded-lg border border-shopLighterBg">
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
          <div className="shadow-lg rounded-lg border border-shopLighterBg flex-1 p-4">
            <div className="flex items-center justify-between border-b">
              <Title className="text-lg text-darkColor">
                {products?.length || 0} Product(s) Found
              </Title>
              <SubTitle className="text-lightColor font-medium">
                Showing all available products
              </SubTitle>
            </div>
            {/* If loading then show LoadingProduct component if not then check if the products data exists then map through products data and show them with ProductCard component. If there's no products data then show NoProducts component. */}
            {loading ? (
              <LoadingProduct />
            ) : products && products.length > 0 ? (
              <div className="grid max-[500px]:grid-cols-1 min-[501px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 mt-10">
                {products.map((productItem) => (
                  <div key={productItem._id}>
                    <ProductCard product={productItem} />
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
