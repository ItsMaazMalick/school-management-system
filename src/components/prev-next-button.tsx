"use client";

import { ArrowLeftCircle, ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export function PrevNextButton() {
  const router = useRouter();
  return (
    <div className="text-secondary-200 flex items-center gap-4">
      <div
        onClick={() => {
          router.back();
        }}
        className="p-1 rounded-full bg-white cursor-pointer"
      >
        <ArrowLeftIcon className="size-6" />
      </div>
      <div
        onClick={() => {
          router.forward();
        }}
        className="p-1 rounded-full bg-white cursor-pointer"
      >
        <ArrowRightIcon className="size-6" />
      </div>
    </div>
  );
}
