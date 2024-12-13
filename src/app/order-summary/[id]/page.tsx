import { getOrderById } from "@/actions/order";
import { UserNavbar } from "@/app/user-navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { redirect } from "next/navigation";
import { QrCodePage } from "./qr-code";

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
            <div className="flex justify-center items-center">
              <QrCodePage
                value={`${process.env.BASE_URL}/order-summary/${order.id}`}
              />
            </div>
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
            <div className="flex items-center justify-between">
              <p className="font-semibold">Email</p>
              <p>{order?.email}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-semibold">Contact</p>
              <p>{order?.contactNumber}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-semibold">TRX ID</p>
              <p>{order?.trxId}</p>
            </div>
            <div className="flex items-center justify-between mb-2">
              <p className="font-semibold">Status</p>
              <p
                className={`${
                  order.orderStatus === "pending"
                    ? "bg-orange-300"
                    : "bg-green-300"
                } px-2 rounded-full`}
              >
                {order?.orderStatus}
              </p>
            </div>
            <table className="min-w-full border-collapse border border-gray-200 text-sm">
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
                      {item?.services?.productName} - {item?.services?.type}
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
