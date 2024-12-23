import { getALLRepairingBrandsWithProduct } from "@/actions/service";
import { RepairingPos } from "../(frontend)/dashboard/repairing-pos";

export default async function POS() {
  const brands = await getALLRepairingBrandsWithProduct();
  const safeBrands = brands ?? [];
  return (
    <div>
      <RepairingPos brands={safeBrands} />
    </div>
  );
}
