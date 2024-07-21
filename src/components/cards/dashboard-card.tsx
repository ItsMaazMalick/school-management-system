import { cn } from "@/lib/utils";
import { Card, CardContent } from "../ui/card";

export function DashboardCard({
  title,
  value,
  icon,
  color,
  shadow,
  className,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  shadow: string;
  className?: string;
}) {
  return (
    <Card className={`rounded-2xl shadow-lg ${shadow}`}>
      <CardContent
        className={cn(
          "flex items-center justify-between pt-6 rounded-2xl bg-gradient-to-r  text-white",
          className
        )}
      >
        <div className="flex flex-col gap-4">
          <p className="font-bold text-xl">{value}</p>
          <p>{title}</p>
        </div>
        <p
          className={`h-full aspect-square p-3 bg-white ${color} rounded-full`}
        >
          {icon}
        </p>
      </CardContent>
    </Card>
  );
}
