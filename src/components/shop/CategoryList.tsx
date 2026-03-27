import { Category } from "@/sanity.types";
import { Title } from "@/src/components/Text";
import { Dispatch, SetStateAction } from "react";
import { Label } from "@/src/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/src/components/ui/radio-group";

interface CategoryListProps {
  categories: Category[];
  selectedCategory: string | null;
  setSelectedCategory: Dispatch<SetStateAction<string | null>>;
}

const CategoryList = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}: CategoryListProps) => {

  return (
    <div className="p-6">
      <div className="flex items-center justify-between pb-4">
        <Title className="text-base text-darkColor">Categories</Title>
        <p className="w-6 h-6 bg-shopLighterBg text-shop-dark-green rounded-full text-sm flex items-center justify-center">
          {categories.length}
        </p>
      </div>

      <RadioGroup
        value={selectedCategory || ""}
        onValueChange={(e) => setSelectedCategory(e)}
      >
        {categories.map((category) => (
          <div key={category._id} className="group cursor-pointer">
            <div className="flex items-center gap-3 group-hover:bg-shopLighterBg group-hover:text-shop-dark-green hoverEffect p-1">
              <RadioGroupItem
                value={`${category.slug?.current}`}
                id={`${category.slug?.current}`}
              />
              <Label
                htmlFor={`${category.slug?.current}`}
                className={`${category.slug?.current === selectedCategory ? "text-shop-dark-green font-semibold" : "font-normal"}`}
              >
                {category.title}
              </Label>
            </div>
          </div>
        ))}
      </RadioGroup>
      {selectedCategory && (
        <button
          className="text-sm text-left underline text-darkColor hover:text-shop-dark-green hoverEffect mt-4"
          onClick={() => setSelectedCategory(null)}
        >
          Clear Category Filteration
        </button>
      )}
    </div>
  );
};

export default CategoryList;
