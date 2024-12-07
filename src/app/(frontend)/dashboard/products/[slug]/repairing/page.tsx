import { getServicesWithProduct } from "@/actions/service";
import { Repairing } from "./repairing";
import { getRepairingProductBySlug } from "@/actions/repairing";

export const dynamic = "force-dynamic";

export default async function RepairingPage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = await (await params).slug;

  const product = await getRepairingProductBySlug(slug);
  return <Repairing product={product} />;
}
