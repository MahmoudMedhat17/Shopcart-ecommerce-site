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

  const query = `*[_type == "Category"] | order(title asc) {
  _id,
    title,
    image,
    slug
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
      <div className="flex flex-col justify-center items-center py-12 space-y-6">
        <div className="flex items-center  gap-2 sm:gap-4">
          <div className="w-16 h-1 bg-linear-to-r from-shop-light-green to-shop-dark-green rounded-full" />
          <Title className="text-darkColor text-3xl lg:text-4xl font-bold text-center">
            Popular Categories
          </Title>
          <div className="w-16 h-1 bg-linear-to-r from-shop-light-green to-shop-dark-green rounded-full" />
        </div>
        <SubText className="text-gray-600 text-xl max-w-2xl mx-auto text-center">
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
