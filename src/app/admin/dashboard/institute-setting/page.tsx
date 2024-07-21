import { getSchoolUsingSession } from "@/actions/school";
import { redirect } from "next/navigation";
import { UpdateSchoolForm } from "./UpdateSchoolForm";

export default async function InstituteSetting() {
  const school = await getSchoolUsingSession();
  if (!school) {
    return redirect("/login");
  }
  return (
    <div>
      <UpdateSchoolForm school={school} />
    </div>
  );
}
