import { getAllProductWithCategoryName } from "@/actions/product";
import { Products } from "./products";

export default async function ProductsPage() {
  const products = await getAllProductWithCategoryName();

  return <Products products={products} />;
}
