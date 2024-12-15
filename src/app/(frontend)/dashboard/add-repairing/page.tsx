import { getALLRepairingBrandsWithProduct } from "@/actions/service";
import { AddRepairingForm } from "./add-repairing-form";

export default async function AddRepairingPage() {
  const brands = await getALLRepairingBrandsWithProduct();
  const safeBrands = brands ?? [];

  return <AddRepairingForm brands={safeBrands} />;
}
