"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Dashboard({
  products,
  services,
  orders,
  totalOrdersLength,
  pendingOrders,
  paidOrders,
}: any) {
  const router = useRouter();

  return (
    <>
      {/* TOP CARDS */}
      <div className="w-full grid grid-cols-4 p-4 gap-4">
        <Card className="bg-gradient-to-br from-primary-700 to-primary-400 text-primary-foreground shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <BarChart3 className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrdersLength}</div>
            {/* <p className="text-xs text-secondary-100">+20.1% from last month</p> */}
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-primary-700 to-primary-400 text-primary-foreground shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paid Orders</CardTitle>
            <BarChart3 className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{paidOrders}</div>
            {/* <p className="text-xs text-secondary-100">+20.1% from last month</p> */}
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-primary-700 to-primary-400 text-primary-foreground shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Orders
            </CardTitle>
            <BarChart3 className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingOrders}</div>
            {/* <p className="text-xs text-secondary-100">+20.1% from last month</p> */}
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-primary-700 to-primary-400 text-primary-foreground shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <BarChart3 className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-secondary-100">+20.1% from last month</p>
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
                    <th className="text-left p-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order: any) => (
                    <tr
                      key={order.id}
                      className="border-b cursor-pointer"
                      onClick={() =>
                        router.push(`/dashboard/orders/${order.id}`)
                      }
                    >
                      <td className="p-2">{order.id}</td>
                      <td className="p-2">{order.email}</td>
                      <td className="p-2">{order.contactNumber}</td>
                      <td className="p-2">${order.price}</td>
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
                  {products.map((product: any) => (
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
      <div className="p-4">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Services</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Service Name</th>
                    <th className="text-left p-2">Product Name</th>
                    <th className="text-left p-2">Price</th>
                    <th className="text-left p-2">Description</th>
                    <th className="text-left p-2">Estimated Time</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((service: any) => (
                    <tr key={service.id} className="border-b">
                      <td className="p-2">{service.name}</td>
                      <td className="p-2">{service.Product?.name}</td>
                      <td className="p-2">${service.price}</td>
                      <td className="p-2">{service.description}</td>
                      <td className="p-2">{service.estimatedTime}</td>
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
  );
}
