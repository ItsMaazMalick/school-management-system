import { getAllProductWithCategoryName } from "@/actions/product";
import { getALLServices } from "@/actions/service";
import { Suspense } from "react";
import Dashboard from "../../../components/Dashboard";
import {
  getAllOrders,
  getPaidOrdersLength,
  getPendingOrdersLength,
  totalOrdersLength,
} from "@/actions/order";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const products = await getAllProductWithCategoryName();
  const services = await getALLServices();
  const orders = await getAllOrders();
  const ordersLength = await totalOrdersLength();
  const pendingOrders = await getPendingOrdersLength();
  const paidOrders = await getPaidOrdersLength();

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Dashboard
        products={products}
        services={services}
        orders={orders}
        totalOrdersLength={ordersLength}
        pendingOrders={pendingOrders}
        paidOrders={paidOrders}
      />
    </Suspense>
  );
}
