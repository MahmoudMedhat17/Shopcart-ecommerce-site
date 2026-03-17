import Link from "next/link";
import { categoryTypes } from "@/src/constants/data";
import { Button } from "@/src/components/ui/button";

// Here we get the props coming from the ProductsGrid component of the state selectedCategory.
interface CategorySelectionProps {
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
}

const CategorySelection = ({
  selectedCategory,
  setSelectedCategory,
}: CategorySelectionProps) => {

  //   Here we make the onCategorySelect in a function so we can call it inside a onClick and make the code look more readable.
  const handleCategoriesSelection = (category: string) => {
    setSelectedCategory();
  };

  return (
    <div className="flex justify-between items-center px-4 flex-wrap sm:flex-nowrap">
      <div className="flex items-center gap-3">
        {categoryTypes.map((item) => (
          <Link key={item.title} href={""}>
            <Button
              onClick={() => handleCategoriesSelection(item.title)}
              className={`bg-shop-light-green/20 text-shop-dark-green text-md font-semibold rounded-full border border-shop-light-green/20 hover:bg-shop-light-green hover:text-white hoverEffect ${selectedCategory === item.title ? "bg-shop-light-green text-white" : "bg-shop-light-green/20 text-shop-dark-green border-shop-light-green/20"}`}
            >
              {item.title}
            </Button>
          </Link>
        ))}
      </div>
      <div className="mt-4 sm:mt-0">
        <Link href={"/shop"}>
          <Button
            className={`bg-shop-light-green/20 text-shop-dark-green text-md font-semibold rounded-full border border-shop-dark-green hover:bg-shop-light-green hover:text-white hover:border-shop-light-green hoverEffect`}
          >
            See all
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CategorySelection;
