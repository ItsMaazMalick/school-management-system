import { cn } from "@/lib/utils";

export function FormError({
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
          "w-full bg-destructive/50 text-destructive font-semibold text-xs p-1 rounded-md flex items-center gap-2",
          className
        )}
      >
        <span className="py-[1px] px-2 rounded-full bg-destructive text-destructive-foreground">
          Error
        </span>
        <span>{message}</span>
      </div>
    </>
  );
}
