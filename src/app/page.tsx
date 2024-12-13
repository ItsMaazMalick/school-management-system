import { getAllProductWithCategoryName } from "@/actions/product";

import { UserNavbar } from "./user-navbar";
import { Suspense } from "react";

import dynamic from "next/dynamic";
import { getALLServices } from "@/actions/service";

const MobilePhonesAndServicesPage = dynamic(
  () => import("./mobile-and-repair"),
  {
    ssr: false, // Disables SSR for this component
  }
);

export default async function Home() {
  const products = await getAllProductWithCategoryName();
  const services = await getALLServices();

  if (!products || !services) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-secondary-700 to-secondary-300">
      <UserNavbar className="sticky top-0 z-50" />
      <Suspense>
        <MobilePhonesAndServicesPage products={products} services={services} />
      </Suspense>
    </div>
  );
}
