import { getAllCategories } from "@/actions/category";
import { AddProductForm } from "../../../../components/add-product-form";

export const dynamic = "force-dynamic";

export default async function AddProductPage() {
  const categories = await getAllCategories();
  if (!categories) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Add New Product</h1>
      <AddProductForm categories={categories} />
    </div>
  );
}
