import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/src/sanity/lib/image";
import { SubTitle } from "@/src/components/Text";
import { Category } from "@/sanity.types";
import { MoveRight } from "lucide-react";

const SingleCategory = ({ categoryData }: { categoryData: Category[] }) => {
  // Here we get the category data coming from the SingleCategory component.

  return (
    <div className="grid max-[500px]:grid-cols-1 min-[501px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-content-center place-items-center gap-4 sm:gap-6 bg-shopLighterBg border rounded-lg shadow-2xl p-7">
      {categoryData?.map((category) => {
        // Here we check if the image exists or not to avoid getting an error from typescript.
        const image = (category.image && urlFor(category.image).url()) || "";

        return (
          <Link
            href={`/client/category/${category.slug?.current}`}
            key={category._id}
            className="group w-full"
          >
            <div className="bg-white p-4 h-80 w-full  rounded-lg flex flex-col justify-center items-center space-y-4 shadow-lg group-hover:shadow-3xl group-hover:border group-hover:border-shop-dark-green hoverEffect transform origin-top group-hover:scale-105">
              <div className="bg-gray-100 rounded-lg">
                <Image
                  src={image}
                  alt={`${category.title}`}
                  width={80}
                  height={80}
                  loading="lazy"
                  className="p-3 group-hover:scale-105 hoverEffect"
                />
              </div>
              <SubTitle className="text-lg text-darkColor group-hover:text-shop-dark-green hoverEffect">
                {category.title}
              </SubTitle>
              <div className="text-gray-600 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-shop-light-green" />
                <span className="text-shop-dark-green font-semibold text-sm">
                  Explore
                </span>{" "}
                this category
              </div>
              <div className="bg-gray-300 w-full h-2 rounded-full">
                <div className="w-1/2 bg-linear-to-r from-shop-light-green to-shop-dark-green h-2 rounded-full" />
              </div>
              <button className="flex items-center gap-2 group-hover:gap-4 text-shop-dark-green group-hover:bg-linear-to-r from-shop-light-green to-shop-dark-green group-hover:text-white hoverEffect bg-shop-light-bg rounded-full px-3 py-1.5 font-light">
                Shop Now
                <MoveRight size={12} />
              </button>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default SingleCategory;
