import { getSchoolUsingSession } from "@/actions/school";
import { redirect } from "next/navigation";
import { UpdateSchoolForm } from "./UpdateSchoolForm";
import { RouteTitle } from "@/components/RouteTitle";
import { LayoutDashboard } from "lucide-react";

export default async function InstituteSetting() {
  const school = await getSchoolUsingSession();
  if (!school) {
    return redirect("/login");
  }
  return (
    <div>
      <RouteTitle route="Dashboard" subRoute="Institute Profile" />
      <UpdateSchoolForm school={school} />
    </div>
  );
}
