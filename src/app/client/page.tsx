import Container from "@/src/components/Container";
import Banner from "@/src/components/Banner";
import { getCategories, getBrands } from "@/src/sanity/queries/query";
import ProductsGrid from "@/src/components/Products/ProductsGrid";
import PopularCategories from "@/src/components/PopularCategories/PopularCategories";
import Brands from "@/src/components/Brands/Brands";
import Whyus from "@/src/components/Whyus/Whyus";
import LatestBlogs from "@/src/components/Blogs/LatestBlogs";

const Home = async () => {
  const cateData = await getCategories();
  // console.log("Categories data:", cateData);

  // Test
  // console.log("PAGE EXECUTED");

  const brandsData = await getBrands();

  // console.log(brandsData);

  return (
    // Container is a wrapper that contains children with custom styles that are applied to the children.
    <Container>
      <Banner />
      <div className="py-12">
        <ProductsGrid />
        <PopularCategories categoryData={cateData?.data} />
        <Whyus />
        <Brands brandsData={brandsData} />
        <LatestBlogs />
      </div>
    </Container>
  );
};

export default Home;
