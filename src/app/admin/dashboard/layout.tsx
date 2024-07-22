import { getSession } from "@/actions/session";
import { Header } from "@/components/header/Header";
import { Sidebar } from "@/components/sidebar/Sidebar";

import { redirect } from "next/navigation";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession("ADMIN");
  if (!session?.success) {
    redirect("/login");
  }
  return (
    <>
      <Header data={session.data} />
      <div className="flex gap-4">
        <Sidebar
          className="hidden lg:block lg:w-[250px] bg-primary h-[calc(100dvh-60px)] sticky top-[60px]"
          role={session.data.role}
        />
        <div className="w-full p-2 lg:pr-5">{children}</div>
      </div>
    </>
  );
}
