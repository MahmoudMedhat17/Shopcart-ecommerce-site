import CategoryProducts from "@/src/components/categories/CategoryProducts";
import { getCategories } from "@/src/sanity/queries/query";
import Container from "@/src/components/Container";
import { Title } from "@/src/components/Text";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  // Here we get the params of the current params with Next js params.
  // And assign it to variable slug. So slug now contains the params of the page we are on rn.
  const { slug } = await params;
  // Here we get the getCategories function that calls all the categories from sanity.
  const categoryProductsData = await getCategories();

  return (
    <div className="py-10">
      <Container>
        <Title>
          Products by Category:{" "}
          <span className="text-shop-light-green capitalize tracking-wider">
            {slug}
          </span>
        </Title>
        {/* Here we pass the slug and the categories data to categoryProductsData component as props so we can use them inside the component. */}
        <CategoryProducts
          slug={slug}
          categoryProductsData={categoryProductsData}
        />
      </Container>
    </div>
  );
};

export default page;
