"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Sidebar } from "../sidebar/Sidebar";
import Image from "next/image";
import { useState } from "react";
import { logout } from "@/actions/logout";

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
  const handleLogout = async () => {
    await logout();
  };
  return (
    <div className="bg-primary h-[60px] sticky top-0 z-50 flex items-center justify-between px-2 lg:px-8 shadow-md shadow-white text-primary-foreground">
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
      <Button
        onClick={handleLogout}
        variant={"outline"}
        className="text-primary"
      >
        Logout
      </Button>
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
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="text-primary p-2">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-primary custom-scroll w-full p-1">
        <SheetHeader>
          <SheetTitle className="text-primary-foreground mt-6">
            {data.name}
          </SheetTitle>
        </SheetHeader>
        <Sidebar role={data.role} onClose={handleClose} />
      </SheetContent>
    </Sheet>
  );
}
