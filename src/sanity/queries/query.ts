import { sanityFetch } from "../lib/live";

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

export default getCategories;
