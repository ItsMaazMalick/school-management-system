import { getOrderById } from "@/actions/order";
import { OrderPage } from "./order-page";

export const dynamic = "force-dynamic";

export default async function OrderDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const id = (await params)?.id;

  const order = await getOrderById(id);

  return (
    <div>
      <OrderPage order={order} />
    </div>
  );
}
