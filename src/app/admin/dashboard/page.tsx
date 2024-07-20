import { getSession } from "@/actions.ts/session";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
  // const session = await getSession("ADMIN");
  // if (!session?.success) {
  //   redirect("/login");
  // }
  return <div>AdminDashboard</div>;
}
