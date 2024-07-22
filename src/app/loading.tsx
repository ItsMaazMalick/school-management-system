import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export default function Loading({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "h-[calc(100dvh-80px)] flex justify-center items-center",
        className
      )}
    >
      <Loader2 className="mx-auto animate-spin" />
    </div>
  );
}
