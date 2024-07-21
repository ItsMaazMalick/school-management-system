import { DashboardCard } from "@/components/cards/dashboard-card";
import {
  DollarSignIcon,
  GraduationCapIcon,
  School2,
  User2,
} from "lucide-react";

export default async function Cards() {
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  return (
    <div className="grid grid-cols1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <DashboardCard
        title="Students"
        value={1000}
        icon={<User2 size={40} />}
        color="text-[#FB9958]"
        shadow="shadow-[#FB9958]"
        className="from-[#FB9958] to-[#FDC5A0]"
      />
      <DashboardCard
        title="Teachers"
        value={1000}
        icon={<GraduationCapIcon size={40} />}
        color="text-[#7C75DD]"
        shadow="shadow-[#7C75DD]"
        className="from-[#7C75DD] to-[#9c98ED]"
      />
      <DashboardCard
        title="Classes"
        value={1000}
        icon={<School2 size={40} />}
        color="text-[#03B0D2]"
        shadow="shadow-[#03B0D2]"
        className="from-[#03B0D2] to-[#03B0D2]"
      />
      <DashboardCard
        title="Revenue"
        value={1000}
        icon={<DollarSignIcon size={40} />}
        color="text-[#eb3349]"
        shadow="shadow-[#eb3349]"
        className="from-[#eb3349] to-[#f45c43]"
      />
    </div>
  );
}
