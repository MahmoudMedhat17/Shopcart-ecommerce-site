import Container from "@/src/components/Container";
import Banner from "@/src/components/Banner";
import ProductsGrid from "@/src/components/Products/ProductsGrid";
import PopularCategories from "@/src/components/PopularCategories/PopularCategories";

const Home = () => {
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
