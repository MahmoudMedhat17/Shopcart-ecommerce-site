import { defineQuery } from "next-sanity";

const BRANDS_QUERY = defineQuery(`*[_type == "brand"] | order(title asc){
    _id,
    string,
    slug,
  image{
     _type,
    asset,
  }
}`);

const BLOGS_QUERY =
  defineQuery(`*[_type == "blog" && isLatest == true] | order(title asc){
  ...,
  blogcategories[]->{
    title
  }
}`);

const HOTDEALS_QUERY = defineQuery(`
    *[_type == 'product' && status == "hot"] | order(name asc){
  ...,
  categories[]->
}`);

const SINGLEPRODUCT_QUERY =
  defineQuery(`*[_type == "product" && slug.current == $slug][0]{
    ...,
    brand->{
    ...,
    }
    }`);

const RANDOMDATA_QUERY = defineQuery(`*[_type == "product"]{
        ...,
        "categories":categories[]->{
        _id,
        title,
        }
        }`);

const ALLPRODUCTS_QUERY = defineQuery(`*[_type == "product"]`);

// Here this filter query means that get all the products data if the user didn't choose any filteration (category, brand and price) -> (!defined) means that
// And if there's a selectedCategory then get the slug of the category inside sanity database that equals to the state of the selectedCategory if exists ex: User selects smartPhones => the selectedCategory state then check if it's available inside sanity database by the slug of the categories.

// And if there's a selectedBrand then get the brand that the user selected stored inside the selectedBrand state using useSearchParams from Next JS then compare it to the slugs that exists inside the brand document, if it exists then show it.

// And if there's a price bigger than the lowest range of price we set as $minPrice and a price smaller than the larget range of price we set as $maxPrice then filter by prices.
const FILTEREDPRODUCTS_QUERY = `*[_type == "product" && (!defined($selectedCategory) || $selectedCategory == "" || $selectedCategory in categories[]-> slug.current)
  && (!defined($selectedBrand) || $selectedBrand == "" || brand-> slug.current == $selectedBrand)
  && (!defined($minPrice) || $minPrice == "" || price >= $minPrice)
  && (!defined($maxPrice) || $maxPrice == "" || price <= $maxPrice)
] | order(name asc){
...,
"categories":categories[]->{
title
} 
}`;

const USERADDRESS_QUERY = defineQuery(
  `*[_type == "address"] | order(_createdAt asc)`,
);

const USERORDERS_QUERY = defineQuery(`
  *[_type == "order" && clerkUserId == $userId] | order(orderDate desc) {
    ..., 
    products[]{
      ...,
      product->{
        ...
      }
    }
  }
`);

const DELETEUSERORDERS_QUERY = defineQuery(`
  *[_type == "order" && orderNumber == $orderNumber]
`);

const GETALLBLOGS_QUERY = defineQuery(`
  *[_type == "blog"] | order(publishedAt desc){
  ...,
  blogcategories[]->{
    title
  }
  }
  `);

const GETSINGLEBLOG_QUERY = defineQuery(`
  *[_type == "blog" && slug.current == $slug]{
  ...,
  author->{
  name,image},
  blogcategories[]->{
  title,
  "slug":slug.current
  }
  }
  `);

const GETBLOGCATEGORIES_QUERY = defineQuery(`*[_type == "blog"]{
    blogcategories[]->{
    ...
    }
  }`);

const GETOTHERBLOGS_QUERY = defineQuery(`
  *[_type == "blog" && defined(slug) && slug.current != $slug] | order(publishedAt desc)[0...$quantity]{
    ...,
    author->{
      name,
      image
    },
    blogcategories[]->{
      title,
      "slug": slug.current
    }
  }
`);

export {
  BRANDS_QUERY,
  BLOGS_QUERY,
  HOTDEALS_QUERY,
  SINGLEPRODUCT_QUERY,
  RANDOMDATA_QUERY,
  ALLPRODUCTS_QUERY,
  FILTEREDPRODUCTS_QUERY,
  USERADDRESS_QUERY,
  USERORDERS_QUERY,
  DELETEUSERORDERS_QUERY,
  GETALLBLOGS_QUERY,
  GETSINGLEBLOG_QUERY,
  GETBLOGCATEGORIES_QUERY,
  GETOTHERBLOGS_QUERY,
};
