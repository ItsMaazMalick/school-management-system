import { getSession } from "@/actions.ts/session";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-[100dvw] h-[100dvh] p-2 md:p-4 lg:py-10 lg:px-20">
      {children}
    </div>
  );
}
