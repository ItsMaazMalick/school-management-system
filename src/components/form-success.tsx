import { cn } from "@/lib/utils";

export function FormSuccess({
  message,
  className,
}: {
  message: string;
  className?: string;
}) {
  return (
    <>
      <div
        className={cn(
          "w-full bg-emerald-500/50 text-emerald-500 font-semibold text-sm p-2 rounded-md flex items-center gap-2",
          className
        )}
      >
        <span className="py-1 px-2 rounded-full bg-success text-success-foreground">
          Success
        </span>
        <span>{message}</span>
      </div>
    </>
  );
}
