import { getALLGlass } from "@/actions/glass";
import { getAllProductWithCategoryName } from "@/actions/product";
import { getAllRepairingProducts } from "@/actions/repairing";
import { getALLScreens } from "@/actions/screen";
import { UserNavbar } from "./user-navbar";
import { Suspense } from "react";

import dynamic from "next/dynamic";

const MobilePhonesAndServicesPage = dynamic(
  () => import("./mobile-and-repair"),
  {
    ssr: false, // Disables SSR for this component
  }
);

export default async function Home() {
  const products = await getAllProductWithCategoryName();
  const repairingProducts = await getAllRepairingProducts();
  const glass = await getALLGlass();
  const screens = await getALLScreens();

  if (!products || !repairingProducts || !glass || !screens) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-secondary-700 to-secondary-300">
      <UserNavbar className="sticky top-0 z-50" />
      <Suspense>
        <MobilePhonesAndServicesPage
          products={products}
          repairingProducts={repairingProducts}
          glass={glass}
          screens={screens}
        />
      </Suspense>
    </div>
  );
}
