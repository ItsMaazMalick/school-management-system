export function RouteTitle({
  route,
  subRoute,
  icon,
}: {
  route: string;
  subRoute: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-gradient-to-r from-[#eb3349] to-[#f45c43] p-2 rounded-md text-primary-foreground my-4 flex items-center gap-2">
      <div className="font-bold text-[#FFF000] flex items-center gap-2">
        {icon}
        <p>{route}</p>
      </div>
      <span>/</span>
      <span className="text-sm">{subRoute}</span>
    </div>
  );
}
