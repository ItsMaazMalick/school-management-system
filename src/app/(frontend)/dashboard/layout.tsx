import { getSession } from "@/actions/session";
import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) {
    return redirect("/auth/login");
  }

  return (
    <div className="flex w-full">
      <div>
        <Sidebar />
      </div>
      <div className="w-full lg:w-[calc(100dvw-256px)] max-h-[100dvh] overflow-y-auto">
        <Navbar user={session.user} />
        {children}
      </div>
    </div>
  );
}
