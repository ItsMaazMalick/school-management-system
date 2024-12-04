import { getServicesWithProduct } from "@/actions/service";

import { getRepairingProductBySlug } from "@/actions/repairing";
// import { Repairing } from "@/app/(frontend)/dashboard/products/[slug]/repairing/repairing";
import { UserNavbar } from "@/app/user-navbar";

export default async function RepairingPage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = await (await params).slug;

  const product = await getRepairingProductBySlug(slug);
  return (
    <>
      <UserNavbar className="sticky top-0 z-50" />
      {/* <Repairing product={product} />; */}
    </>
  );
}
