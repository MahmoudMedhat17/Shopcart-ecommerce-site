"use client";
import { useEffect, useState } from "react";
import { Category, Product } from "@/sanity.types";
import { useRouter } from "next/navigation";
import { client } from "@/src/sanity/lib/client";
import LoadingComponent from "@/src/components/LoadingComponent";
import NoProducts from "@/src/components/Products/NoProducts";
import ProductCard from "@/src/components/Products/ProductCard";
import { AnimatePresence, motion } from "motion/react";

interface CategoryProductsProps {
  categoryProductsData: Category[];
  slug: string;
}

const CategoryProducts = ({
  slug,
  categoryProductsData,
}: CategoryProductsProps) => {
  // Here we got the slug and categoryProductsData coming as props and assining the slug to the currentSlug state so the currentSlug state contains the slug of the page we are on rn.
  const [currentSlug, setCurrentSlug] = useState(slug);
  // New state for products
  const [products, setProducts] = useState<Product[]>([]);
  // Loading state to handle it.
  const [loading, setLoading] = useState(false);
  // We use useRouter to be able to navigate to the page of the called param such as for example /client/catgeory/smartphones means that we navigated to smartPhones page category.
  const router = useRouter();

  // Here async function that takes categorySlug as an argument "currentSlug of the params" to fetch the data of the products according to the category slug the user inside.
  const fetchProducts = async (categorySlug: string) => {
    // Here setting the state of loading to true to fire the loading state.
    setLoading(true);
    try {
      // Here is the query that gets the products data with the condition of getting the category data if the slug.current "params" is equal to the categorySlug "currentSlug in the state" for ex: smartphones === smartphones from the params then get the data of that slug. With order ascedning by name and get the whole props of the data and create categories field that returns only the title of each category "Tell me for each product came from what category".
      const query = `*[_type == "product" && references(*[_type == "Category" && slug.current == $categorySlug]._id)] | order(name asc){
  ...,
  "categories":categories[]->{
    title
  }
}`;

      // Here we fetch the data with client.fetch since we are inside a client component and then assign it to "productsData" variable.
      const productsData = await client.fetch(query, { categorySlug });
      // Here Set the state of "setProducts" with the data we fetched above.
      setProducts(productsData);
    } catch (error) {
      console.log("Error while fetching the data!:", error);
    } finally {
      // Here after finishing fetching the data we set the state of loading back to false since the data is loaded.
      setLoading(false);
    }
  };

  // In this useEffect we call the fetchProducts async function and pass to it the currentSlug state the contains the current params the user in as we already set the function to take an argument that matches this argument with the currentSlug to fetch the data of the currentSlug. and the dependency array depends on "router" so that when the user only changes the category the data is refetched with the new category data.
  useEffect(() => {
    fetchProducts(currentSlug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  // Here is a function to handle the navigation of the params when clicked on a specific category to navigate to it's category. with handling loading state too.
  const handleCategoryNavigation = (categorySlug: string | undefined) => {
    try {
      // This condition means that if the user clicked on the same category then don't update the data of the category since it's thing.
      if (categorySlug === currentSlug) return;
      setLoading(true);
      // This means that if there's a currentSlug -> Slug then set the state with that slug and navigate the user to the products of that slug / Category.
      if (categorySlug !== undefined) {
        setCurrentSlug(categorySlug);
        router.push(`/client/category/${categorySlug}`, { scroll: false });
      }
    } catch (error) {
      console.log("Something went wrong!", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-start py-10 gap-10">
      {/* This section for categories part. */}
      <div className="flex flex-col md:max-w-80">
        {categoryProductsData.map((product) => (
          <div
            key={product._id}
            className={`border p-2 cursor-pointer hover:bg-shopRedColor hover:text-white hoverEffect transition-colors ${product.slug?.current === currentSlug && "bg-shopRedColor text-white w-full border-shopRedColor"}`}
            onClick={() => handleCategoryNavigation(product.slug?.current)}
          >
            <button className={`capitalize font-semibold text-start`}>
              {product.title}
            </button>
          </div>
        ))}
      </div>
      {/* This section for displaying the products of each specific category */}
      <div className="pt-10 md:pt-0 flex-1">
        {loading ? (
          <LoadingComponent />
        ) : products.length > 0 ? (
          <div className="grid max-[500px]:grid-cols-1 min-[501px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 mt-10">
            <AnimatePresence>
              {products.map((product) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0.2 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <NoProducts />
        )}
      </div>
    </div>
  );
};

export default CategoryProducts;
