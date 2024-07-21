import { getSession } from "@/actions/session";
import { redirect } from "next/navigation";

import Cards from "./Cards";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { EarningsChart } from "./EarningsChart";
import { IncomeExpenseChart } from "./income-expense-chart";

const chartData = [
  { month: "January", expense: 186, income: 80 },
  { month: "February", expense: 305, income: 200 },
  { month: "March", expense: 237, income: 120 },
  { month: "April", expense: 73, income: 190 },
  { month: "May", expense: 209, income: 130 },
  { month: "June", expense: 214, income: 140 },
];

export default async function AdminDashboard() {
  const session = await getSession("ADMIN");
  if (!session?.success) {
    redirect("/login");
  }
  return (
    <div className="mt-4 flex flex-col gap-8">
      <Suspense
        fallback={
          <Loader2 className="mt-8 mx-auto animate-spin text-primary" />
        }
      >
        <Cards />
      </Suspense>
      {/* EXPENSES */}
      <div className="flex flex-col lg:flex-row gap-4">
        <IncomeExpenseChart chartData={chartData} />

        <div className="w-full lg:w-[40%] rounded-md p-4 ring-1 h-[400px] overflow-hidden">
          <p className="text-xl text-primary-foreground bg-primary font-semibold p-2 rounded-md">
            Notifications
          </p>
          <div className="h-[90%] custom-scroll">
            <div className="flex flex-col gap-2 my-2">
              <p className="py-1 px-2 rounded-full bg-primary text-primary-foreground w-fit">
                16 Jan, 2024
              </p>
              <p className="font-semibold">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum,
                dignissimos?
              </p>
              <p className="w-full h-[1px] bg-primary" />
            </div>
            <div className="flex flex-col gap-2 my-2">
              <p className="py-1 px-2 rounded-full bg-primary text-primary-foreground w-fit">
                16 Jan, 2024
              </p>
              <p className="font-semibold">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum,
                dignissimos?
              </p>
              <p className="w-full h-[1px] bg-primary" />
            </div>
            <div className="flex flex-col gap-2 my-2">
              <p className="py-1 px-2 rounded-full bg-primary text-primary-foreground w-fit">
                16 Jan, 2024
              </p>
              <p className="font-semibold">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum,
                dignissimos?
              </p>
              <p className="w-full h-[1px] bg-primary" />
            </div>
            <div className="flex flex-col gap-2 my-2">
              <p className="py-1 px-2 rounded-full bg-primary text-primary-foreground w-fit">
                16 Jan, 2024
              </p>
              <p className="font-semibold">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum,
                dignissimos?
              </p>
              <p className="w-full h-[1px] bg-primary" />
            </div>
            <div className="flex flex-col gap-2 my-2">
              <p className="py-1 px-2 rounded-full bg-primary text-primary-foreground w-fit">
                16 Jan, 2024
              </p>
              <p className="font-semibold">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum,
                dignissimos?
              </p>
              <p className="w-full h-[1px] bg-primary" />
            </div>
            <div className="flex flex-col gap-2 my-2">
              <p className="py-1 px-2 rounded-full bg-primary text-primary-foreground w-fit">
                16 Jan, 2024
              </p>
              <p className="font-semibold">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum,
                dignissimos?
              </p>
              <p className="w-full h-[1px] bg-primary" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
