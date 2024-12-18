import { getAllOrders, getPaidOrders } from "@/actions/order";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";
import Link from "next/link";
export default async function AllOrders() {
  const orders = await getPaidOrders();

  return (
    <div className="p-4">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Paid Orders</CardTitle>
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
  );
}
