import { getOrderById } from "@/actions/order";
import { UserNavbar } from "@/app/user-navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { redirect } from "next/navigation";

export default async function OrderSummary({
  params,
}: {
  params: { id: string };
}) {
  // Fetch the order data using the provided order ID
  const order = await getOrderById(params?.id);
  if (!order) {
    // If order doesn't exist, redirect to home page
    return redirect("/");
  }

  return (
    <div className="bg-gradient-to-r from-secondary-700 to-secondary-300">
      <UserNavbar className="sticky top-0 z-50" />
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
            <CardDescription>
              Below is the summary of your order. Thank you for shopping with
              us!
            </CardDescription>
          </CardHeader>

          <CardContent>
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
            <div className="flex items-center justify-between">
              <p className="font-semibold">Email</p>
              <p>{order?.email}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-semibold">Contact</p>
              <p>{order?.contactNumber}</p>
            </div>
            <div className="flex items-center justify-between mb-2">
              <p className="font-semibold">TRX ID</p>
              <p>{order?.trxId}</p>
            </div>
            <table className="min-w-full border-collapse border border-gray-200">
              <thead>
                <tr>
                  <th className="border-b px-4 py-2 text-left">Product</th>
                  <th className="border-b px-4 py-2 text-left">Quantity</th>
                  <th className="border-b px-4 py-2 text-right">Price</th>
                </tr>
              </thead>
              <tbody>
                {order?.orderProducts?.map((item) => (
                  <tr key={item.id}>
                    <td className="border-b px-4 py-2">
                      {item?.products?.name}
                    </td>
                    <td className="border-b px-4 py-2 text-center">
                      {item.quantity}
                    </td>
                    <td className="border-b px-4 py-2 text-right">
                      ${item?.products?.price}
                    </td>
                  </tr>
                ))}
                {order?.OrderServicesItem?.map((item) => (
                  <tr key={item.id}>
                    <td className="border-b px-4 py-2">
                      {item?.services?.name}
                    </td>
                    <td className="border-b px-4 py-2 text-center">
                      {item.quantity}
                    </td>
                    <td className="border-b px-4 py-2 text-right">
                      ${item?.services?.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-4 text-right">
              <strong className="text-lg">Total: ${order.price}</strong>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
