import React from "react";
import { Menu, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PrevNextButton } from "./prev-next-button";
import { MobileSidebar } from "./mobile-sidebar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export function Navbar({ user }: any) {
  return (
    <header className="bg-gradient-to-r from-primary-700 to-primary-500 shadow-sm z-10 h-[70px]">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <MobileSidebar>
          <Button variant="outline">
            <Menu className="h-6 w-6" />
          </Button>
        </MobileSidebar>

        {/* BACK AND FORTH BUTTON */}
        <div className="hidden md:block">
          <PrevNextButton />
        </div>
        <div />
        {/* <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1> */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center group bg-white"
            >
              <p>
                <span className="text-black">Logged in:&nbsp;</span>
                <span className="font-bold text-primary uppercase">
                  {user.name}
                </span>
              </p>
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {/* <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem> */}
            <DropdownMenuItem>
              <form
                action={async () => {
                  "use server";
                  (await cookies()).delete("token");
                  return redirect("/auth/login");
                }}
                className="w-full"
              >
                <Button type="submit" variant={"secondary"} className="w-full">
                  Logout
                </Button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
