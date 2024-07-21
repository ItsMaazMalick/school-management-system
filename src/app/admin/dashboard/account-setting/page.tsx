import { getSchoolUsingSession } from "@/actions/school";
import { UpdateSchoolUserForm } from "./UpdateSchoolUserForm";
import { LayoutDashboard } from "lucide-react";
import { RouteTitle } from "@/components/RouteTitle";

export default async function AccountSetting() {
  const school = await getSchoolUsingSession();

  return (
    <div>
      <RouteTitle
        route="Dashboard"
        subRoute="Account Setting"
        icon={<LayoutDashboard size={20} />}
      />
      <UpdateSchoolUserForm school={school} />
    </div>
  );
}
