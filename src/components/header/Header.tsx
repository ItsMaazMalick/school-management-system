import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Sidebar } from "../sidebar/Sidebar";
import Image from "next/image";

export function Header({
  data,
}: {
  data: {
    id: string;
    name: string;
    email: string;
    role: string;
    image: string | null;
  };
}) {
  return (
    <div className="bg-primary h-[60px] sticky top-0 z-50 flex items-center justify-between px-8 shadow-md shadow-white text-primary-foreground">
      <div className="block lg:hidden">
        <MobileMenu data={data} />
      </div>
      <div className="flex items-center gap-4">
        <div className="p-[2px] rounded-md bg-primary-foreground">
          <Image
            src={data.image || "/images/school.png"}
            alt={data.name}
            width={1000}
            height={1000}
            className="w-[48px] h-[48px] object-contain"
          />
        </div>
        <p className="hidden lg:block text-xl uppercase font-bold">
          {data.name}
        </p>
      </div>
      <Button>Logout</Button>
    </div>
  );
}

function MobileMenu({
  data,
}: {
  data: {
    id: string;
    name: string;
    email: string;
    role: string;
    image: string | null;
  };
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="text-primary">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-primary custom-scroll">
        <SheetHeader>
          <SheetTitle className="text-primary-foreground">
            {data.name}
          </SheetTitle>
        </SheetHeader>
        <Sidebar role={data.role} />
      </SheetContent>
    </Sheet>
  );
}
