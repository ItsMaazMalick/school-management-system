import { getAllProductWithCategoryName } from "@/actions/product";
import {
  getALLRepairingBrandsWithProduct,
  getALLServices,
} from "@/actions/service";
import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

import {
  getAllOrders,
  getLast10Orders,
  getPaidOrdersLength,
  getPendingOrdersLength,
  totalOrdersLength,
} from "@/actions/order";
import Link from "next/link";
import { RepairingPos } from "./repairing-pos";
// import dynamic from "next/dynamic";

// const Dashboard = dynamic(() => import("../../../components/Dashboard"), {
//   ssr: false, // Disables SSR for this component
// });

export default async function DashboardPage() {
  const products = await getAllProductWithCategoryName();
  const services = await getALLServices();
  const orders = await getLast10Orders();
  const ordersLength = await totalOrdersLength();
  const pendingOrders = await getPendingOrdersLength();
  const paidOrders = await getPaidOrdersLength();

  return (
    <>
      {/* TOP CARDS */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-4 gap-4">
        <Link href="/dashboard/orders">
          <Card className="bg-gradient-to-br from-primary-700 to-primary-400 text-primary-foreground shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Orders
              </CardTitle>
              <BarChart3 className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{ordersLength || 0}</div>
              {/* <p className="text-xs text-secondary-100">+20.1% from last month</p> */}
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/paid-orders">
          <Card className="bg-gradient-to-br from-primary-700 to-primary-400 text-primary-foreground shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Paid Orders</CardTitle>
              <BarChart3 className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{paidOrders || 0}</div>
              {/* <p className="text-xs text-secondary-100">+20.1% from last month</p> */}
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/pending-orders">
          <Card className="bg-gradient-to-br from-primary-700 to-primary-400 text-primary-foreground shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Orders
              </CardTitle>
              <BarChart3 className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingOrders || 0}</div>
              {/* <p className="text-xs text-secondary-100">+20.1% from last month</p> */}
            </CardContent>
          </Card>
        </Link>
        <Card className="bg-gradient-to-br from-primary-700 to-primary-400 text-primary-foreground shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium"></CardTitle>
            <BarChart3 className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold"></div>
            {/* <p className="text-xs text-secondary-100">+20.1% from last month</p> */}
          </CardContent>
        </Card>
      </div>
      {/* RECENT ORDERS */}
      <div className="p-4">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Order ID</th>
                    <th className="text-left p-2">Customer Email</th>
                    <th className="text-left p-2">Customer Contact</th>
                    <th className="text-left p-2">Amount</th>
                    <th className="text-left p-2">Order Date</th>
                    <th className="text-left p-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders?.map((order: any) => (
                    <tr key={order.id} className="border-b cursor-pointer">
                      <td className="p-2">
                        <Link href={`/dashboard/orders/${order.id}`}>
                          {order.id}
                        </Link>
                      </td>
                      <td className="p-2">{order.email}</td>
                      <td className="p-2">{order.contactNumber}</td>
                      <td className="p-2">${order.price}</td>
                      <td className="p-2">
                        {new Date(order.createdAt).toLocaleString()}
                      </td>
                      <td className="p-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            order.orderStatus === "paid"
                              ? "bg-green-100 text-green-800"
                              : order.orderStatus === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {order.orderStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* PRODUCTS */}
      <div className="p-4">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Product Name</th>
                    <th className="text-left p-2">In Stock</th>
                    <th className="text-left p-2">Price</th>
                    <th className="text-left p-2">Storage</th>
                    <th className="text-left p-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {products?.map((product: any) => (
                    <tr key={product.id} className="border-b">
                      <td className="p-2">{product.name}</td>
                      <td className="p-2">100</td>
                      <td className="p-2">${product.price}</td>
                      <td className="p-2">{product.storage}</td>
                      <td className="p-2">
                        {/* <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            order.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : order.status === "Processing"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {order.status}
                        </span> */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* SERVICES */}
      {/*  */}
      {/* POPULAR PRODUCTS */}
      {/* <div className="p-4">
        <Card>
          <CardHeader>
            <CardTitle>Popular Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product: any) => (
                <div key={product.name} className="flex items-center space-x-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 rounded-md"
                  />
                  <div>
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {product.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div> */}
    </>
    // <Dashboard
    //   products={products}
    //   services={services}
    //   orders={orders}
    //   totalOrdersLength={ordersLength}
    //   pendingOrders={pendingOrders}
    //   paidOrders={paidOrders}
    // />
  );
}
