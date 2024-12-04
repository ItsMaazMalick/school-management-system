import { getAllProductWithCategoryName } from "@/actions/product";
import { RepairingServices } from "../../../../components/repairing-services";
import { getAllRepairingProducts } from "@/actions/repairing";

export const dynamic = "force-dynamic";

export default async function RepairingServicesPage() {
  const products = await getAllRepairingProducts();
  return <RepairingServices products={products} />;
}
