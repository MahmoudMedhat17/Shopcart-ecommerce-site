import Shop from "@/src/components/shop/Shop";
import {
  getCategories,
  getBrands,
  getAllProducts,
} from "@/src/sanity/queries/query";

const page = async () => {
  const categories = await getCategories();
  const brands = await getBrands();
  const allProducts = await getAllProducts();

  return (
    <div>
      <Shop
        categories={categories}
        brands={brands ?? []}
        allProducts={allProducts}
      />
    </div>
  );
};

export default page;
