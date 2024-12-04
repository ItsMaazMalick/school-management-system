import { getAllProductWithCategoryName } from "@/actions/product";
import { getALLServices } from "@/actions/service";
import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

import {
  getAllOrders,
  getPaidOrdersLength,
  getPendingOrdersLength,
  totalOrdersLength,
} from "@/actions/order";
import dynamic from "next/dynamic";

const Dashboard = dynamic(() => import("../../../components/Dashboard"), {
  ssr: false, // Disables SSR for this component
});

export default async function DashboardPage() {
  const products = await getAllProductWithCategoryName();
  const services = await getALLServices();
  const orders = await getAllOrders();
  const ordersLength = await totalOrdersLength();
  const pendingOrders = await getPendingOrdersLength();
  const paidOrders = await getPaidOrdersLength();

  return (
    <Dashboard
      products={products}
      services={services}
      orders={orders}
      totalOrdersLength={ordersLength}
      pendingOrders={pendingOrders}
      paidOrders={paidOrders}
    />
  );
}
