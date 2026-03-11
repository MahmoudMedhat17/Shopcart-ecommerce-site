"use client";

import { useEffect, useState } from "react";
import { Product } from "@/sanity.types";
import { client } from "@/src/sanity/lib/client";
import { categoryTypes } from "@/src/constants/data";

const useProducts = () => {
  // State to handle the loading state of the data.
  const [loading, setLoading] = useState(false);
  //   State to hold the products data coming from sanity in an array form.
  const [products, setProducts] = useState<Product[]>([]);
  //   Here we pass the categoryType to the state so we set the state with the array of ["Gadget", "Appliances", "Refrigeratos", "Others"];
  const [selectedCategory, setSelectedCategory] = useState(
    categoryTypes[0]?.title || "",
  );
  // Here we get the query we wrote in sanity studio => It means we want all the docs of type product and it's variant is = to the array of variants ["gadget", "appliances", "refrigerators", "others"] and the order with name is descending also we want to get all the data with rest operator and we want to get from the categories only the title of the category.
  const query = `*[_type == "product" && variant == $variant] 
| order(name desc)
{

  ..., "categories": categories[]-> {
    _id,
    title,
    categories
  }
}`;

  // Here is the params that will be passed when fetching data from sanity along with the query and we used the selectedCategory that contains the title values from categoryTypes and changed it to toLowerCase() so the data fetching work since the variant defined in sanity studio with lowerCase.
  const params = { variant: selectedCategory.toLowerCase() };

  useEffect(() => {
    const fetchSanityData = async () => {
      try {
        // Here we set the loading state to true so it appears when the data is called.
        setLoading(true);
        // Here we fetch the data stored in sanity studio via client coming from sanity. and we pass the query we defined and the params of the $variant related to the query.
        const res = await client.fetch(query, params);
        // console.log(`${params.variant} data:`, res);
        // Here we set the state of the products with the data.
        setProducts(res);
      } catch (error) {
        console.log("Error during fetching products data:", error);
      } finally {
        // Here after loading the data we set the state of loading to false again since the data is loaded already.
        setLoading(false);
      }
    };

    // Heree we call the function to work.
    fetchSanityData();
    // Dependency of the useEffect depends on the selectedCategory state so this effect triggers whenever the category is changed by the user and so is the data.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  return { loading, products, selectedCategory, setSelectedCategory };
};

export default useProducts;
