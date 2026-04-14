import { sanityFetch } from "../lib/live";
import { client } from "@/src/sanity/lib/client";
import {
  BRANDS_QUERY,
  BLOGS_QUERY,
  HOTDEALS_QUERY,
  SINGLEPRODUCT_QUERY,
  RANDOMDATA_QUERY,
  ALLPRODUCTS_QUERY,
} from "@/src/sanity/queries/index";

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

    return cateData.data ?? [];
  } catch (error) {
    console.log("Something went wrong!", error);
  }
};

const getBrands = async () => {
  try {
    // Here we fetch the brand data with ascending order according to the title of the brand and the id, string, slug, image of each brand.
    const brandsQuery = BRANDS_QUERY;
    const brandsData = await client.fetch(brandsQuery);
    return brandsData;
  } catch (error) {
    console.log("Something went wrong!", error);
  }
};

const getBlogs = async () => {
  try {
    // Here we fetch the blogs data and isLatest is equal true with ascending order according to the title of the blog and everything related to the blog data plus creating a field of blogcategories that return an that contains the title of each blog only.
    const blogsQuery = BLOGS_QUERY;

    const blogsData = await sanityFetch({ query: blogsQuery });
    return blogsData ?? [];
  } catch (error) {
    console.log("Error happened while getting the Blogs data!:", error);
  }
};

const getHotDeals = async () => {
  try {
    // Here we fetch the products data with the hot deal status with ascending order according to the name of the each product and the whole product data with ... and creating a field of categories that return an array that contains the titles of the product only.
    const hotdealsQuery = HOTDEALS_QUERY;

    const hotdealsData = await sanityFetch({ query: hotdealsQuery });
    return hotdealsData ?? [];
  } catch (error) {
    console.log("Error getting hot deals data:", error);
  }
};

const getSingleProduct = async (slug: string) => {
  try {
    // Here we fetch the product but with a condition of if the slug.current of the product is equal to the slug of the product of the page we inside "Coming as an argument to this function".
    const singleProduct = SINGLEPRODUCT_QUERY;
    const singleProductData = await sanityFetch({
      query: singleProduct,
      params: { slug: slug },
    });

    return singleProductData.data || null;
  } catch (error) {
    console.log("Failed fetching the Product data:", error);
    return null;
  }
};

const getRandomProducts = async () => {
  try {
    // Here we get the data of products from the database and assign it to randomDataQuery variable.
    const randomDataQuery = RANDOMDATA_QUERY;
    const data = await sanityFetch({ query: randomDataQuery });
    // Here we randomize the data coming from the database with this sort function and slice it to 0,5 means we want only to get out of the data only 5 products.
    const randomizedData = data.data
      .sort(() => 0.5 - Math.random())
      .slice(0, 5);

    return randomizedData || [];
  } catch (error) {
    console.log("Failed to fetch random products!", error);
  }
};

const getAllProducts = async () => {
  try {
    const allProducts = ALLPRODUCTS_QUERY;
    const allProductsQuery = await sanityFetch({ query: allProducts });
    return allProductsQuery.data ?? [];
  } catch (error) {
    console.log("Failed fetching All products data!:", error);
  }
};

export {
  getCategories,
  getBrands,
  getBlogs,
  getHotDeals,
  getSingleProduct,
  getRandomProducts,
  getAllProducts,
};
