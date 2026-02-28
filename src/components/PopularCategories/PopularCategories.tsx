"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Title, SubText } from "@/src/components/Text";
import { MoveRight } from "lucide-react";
import SingleCategory from "@/src/components/PopularCategories/SingleCategory";
import { Category } from "@/sanity.types";
import { client } from "@/src/sanity/lib/client";

const PopularCategories = () => {
  const [popularCate, setPopularCate] = useState<Category[]>([]);

  const query = `*[_type == "Category"] {
  _id,
  image,
  title
}`;

  useEffect(() => {
    const fetchSanityCategoryData = async () => {
      const res = await client.fetch(query);
      setPopularCate(res);
    };

    fetchSanityCategoryData();
  }, []);

  return (
    <>
      <div className="flex flex-col justify-center items-center py-12 space-y-4">
        <Title className="text-darkColor text-3xl lg:text-4xl font-bold">
          Popular Categories
        </Title>
        <SubText className="text-shopLighterText text-xl max-w-2xl mx-auto">
          Explore our most popular product categories and find what you need
        </SubText>
        <Link href={"/client/category"}>
          <button className="flex items-center gap-2 border border-shop-light-green text-shop-dark-green/80 hover:bg-shop-light-green hover:text-white hoverEffect bg-shop-light-bg rounded-full px-6 py-3 font-semibold">
            Browser All Categories
            <MoveRight size={18} />
          </button>
        </Link>
      </div>
      <SingleCategory popularCate={popularCate} />
    </>
  );
};

export default PopularCategories;
