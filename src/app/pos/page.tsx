import { getALLRepairingBrandsWithProduct } from "@/actions/service";
import { RepairingPos } from "../(frontend)/dashboard/repairing-pos";
import { Suspense } from "react";

export default function POS() {
  // const brands = await getALLRepairingBrandsWithProduct();
  // const safeBrands = brands ?? [];

  return <RepairingPos />;
}
