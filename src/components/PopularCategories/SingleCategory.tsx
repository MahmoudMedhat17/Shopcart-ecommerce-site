import Image from "next/image";
import { urlFor } from "@/src/sanity/lib/image";
import { SubText, SubTitle } from "@/src/components/Text";
import { Category } from "@/sanity.types";

const SingleCategory = ({ popularCate }: { popularCate: Category[] }) => {
  console.log(popularCate.map((cate) => cate));

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-content-center place-items-center gap-8 bg-shopLighterBg border p-12 rounded-lg shadow-2xl">
      {popularCate.map((category) => {
        const image = (category.image && urlFor(category.image).url()) || "";

        return (
          <div
            key={category._id}
            className="bg-white p-10 h-64 w-full rounded-lg flex flex-col justify-center items-center space-y-4"
          >
            <Image
              src={image}
              alt={`${category.title}`}
              width={100}
              height={100}
              loading="lazy"
            />
            <SubTitle>{category.title}</SubTitle>
            <SubText>
              <div className="w-2 h-2 rounded-full bg-shop-dark-green" />
              <span className="text-shop-dark-green font-semibold text-sm">
                Explore
              </span>{" "}
              this category
            </SubText>
          </div>
        );
      })}
    </div>
  );
};

export default SingleCategory;
