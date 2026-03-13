import { sanityFetch } from "../lib/live";
import { client } from "@/src/sanity/lib/client";
import { Product } from "@/sanity.types";

// This is a function to getCategories in the project depending on a specific number of categories or all the categories by cateQuantity argument.
const getCategories = async (cateQuantity?: number) => {
  try {
    // If cateQuantity is available like getCateories(5) that means get 5 categories only and not all
    const query = cateQuantity
      ? // Then filter the categories by title ascendingly and quantity from 0 to the number specified of quantities and then create "productCount" field that gets the products related to each category.

        //   If there's no specified cateQuantity then get all the categories available.
        `
    *[_type == "Category"] | order(title asc) [0...5]{
        ...,
        "productCount":count(*[_type == "product" && references(^._id)])
    }
    `
      : `
    *[_type == "Category"] | order(title asc){
    ...,
        "productCount":count(*[_type == "product" && references(^._id)])
    }`;
    // Here we fetch the query with sanityFetch and pass the query and the params if cateQuantity then get the data with this specified quantity if not then get all the categories data.
    const cateData = await sanityFetch({
      query,
      params: cateQuantity ? { cateQuantity } : {},
    });

    return cateData;
  } catch (error) {
    console.log("Something went wrong!", error);
  }
};

const getBrands = async () => {
  try {
    // Here we fetch the brand data with ascending order according to the title of the brand and the id, string, slug, image of each brand.
    const brandsQuery = `*[_type == "brand"] | order(title asc){
    _id,
    string,
    slug,
  image{
     _type,
    asset,
  }
}`;
    const brandsData = await client.fetch(brandsQuery);
    return brandsData;
  } catch (error) {
    console.log("Something went wrong!", error);
  }
};

const getBlogs = async () => {
  try {
    // Here we fetch the blogs data and isLatest is equal true with ascending order according to the title of the blog and everything related to the blog data plus creating a field of blogcategories that return an that contains the title of each blog only.
    const blogsQuery = `*[_type == "blog" && isLatest == true] | order(title asc){
  ...,
  blogcategories[]->{
    title
  }
}`;

    const blogsData = await sanityFetch({ query: blogsQuery });
    return blogsData ?? [];
  } catch (error) {
    console.log("Error happened while getting the Blogs data!:", error);
  }
};

const getHotDeals = async () => {
  try {
    // Here we fetch the products data with the hot deal status with ascending order according to the name of the each product and the whole product data with ... and creating a field of categories that return an array that contains the titles of the product only.
    const hotdealsQuery = `
    *[_type == 'product' && status == "hot"] | order(name asc){
  ...,
  "categories":categories[]->{
    title
  }
}`;

    const hotdealsData = await sanityFetch({ query: hotdealsQuery });
    return hotdealsData ?? [];
  } catch (error) {
    console.log("Error getting hot deals data:", error);
  }
};

export { getCategories, getBrands, getBlogs, getHotDeals };
