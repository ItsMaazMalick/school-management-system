import { getAllRepairingProducts } from "@/actions/repairing";
import { AddRepairingForm } from "../../../../components/add-repairing-form";
import { AddRepairingProductForm } from "../../../../components/add-repairing-product-form";

export const dynamic = "force-dynamic";

export default async function AddRepairingPage() {
  const products = await getAllRepairingProducts();
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Add New Repairing Product</h1>
      <AddRepairingProductForm />

      <h1 className="text-3xl font-bold mb-8">Add New Repairing Service</h1>
      <AddRepairingForm products={products} />
    </div>
  );
}
