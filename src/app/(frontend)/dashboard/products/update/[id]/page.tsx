import { getAllCategories } from "@/actions/category";
import { getProductById } from "@/actions/product";
import { AddProductForm } from "@/components/add-product-form";

export default async function UpdateProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const categories = await getAllCategories();
  const product = await getProductById(id);

  if (!categories || !product) {
    return null;
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Update Product</h1>
      <AddProductForm categories={categories} product={product} />
    </div>
  );
}
