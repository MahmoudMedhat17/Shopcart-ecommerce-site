import Link from "next/link";
import { categoryTypes } from "@/src/constants/data";
import { Button } from "@/src/components/ui/button";

// Here we get the props coming from the ProductsGrid component of the state selectedCategory.
interface CategorySelectionprops {
  selectedCategory: string;
  onCategorySelect: (cat: string) => void;
}

const CategorySelection = ({
  selectedCategory,
  onCategorySelect,
}: CategorySelectionprops) => {
  console.log(selectedCategory);
  console.log(categoryTypes.map((item) => item.title));

  //   Here we make the onCategorySelect in a function so we can call it inside a onClick and make the code look more readable.
  const handleCategoriesSelection = (category: string) => {
    onCategorySelect(category);
  };

  return (
    <div className="flex justify-between items-center px-4">
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
      <div>
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
