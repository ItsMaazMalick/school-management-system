"use client";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

type PageProps = {
  title: string;
  loading?: boolean;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
  size?: "default" | "sm" | "lg" | "icon" | null | undefined;
  disabled?: boolean;
  className?: string;
};

export default function LoadingButton({
  title,
  loading,
  variant,
  size,
  disabled,
  className,
}: PageProps) {
  return (
    <Button
      className={cn("w-full", className)}
      variant={variant ? variant : "default"}
      type="submit"
      size={size}
      disabled={loading}
    >
      {loading ? <Loader2 size={18} className="animate-spin" /> : `${title}`}
    </Button>
  );
}
