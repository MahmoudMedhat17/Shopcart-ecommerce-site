import Container from "@/src/components/Container";
import Banner from "@/src/components/Banner";
import ProductsGrid from "@/src/components/Products/ProductsGrid";
import PopularCategories from "@/src/components/PopularCategories/PopularCategories";
import getCategories from "@/src/sanity/queries/query";

const Home = async () => {
  const cateData = await getCategories();
  // console.log("Categories data:", cateData);

  // Test
  console.log("PAGE EXECUTED");

  // Need to pass cateData as props and use it to display the data in PopularCategories component.

  return (
    // Container is a wrapper that contains children with custom styles that are applied to the children.
    <Container>
      <Banner />
      <div className="py-12">
        <ProductsGrid />
        <PopularCategories />
      </div>
    </Container>
  );
};

export default Home;
