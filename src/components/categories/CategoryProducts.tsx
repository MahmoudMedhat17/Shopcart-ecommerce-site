"use client";
import { useEffect, useState } from "react";
import { Category, Product } from "@/sanity.types";
import { useRouter } from "next/navigation";
import { client } from "@/src/sanity/lib/client";

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
    <div className="flex flex-col md:flex-row items-start py-10">
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
      {/* Need to display the products according to the filteration of the category here. */}
      <div className="pt-10 md:pt-0 flex-1">Products</div>
    </div>
  );
};

export default CategoryProducts;
