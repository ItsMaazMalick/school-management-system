"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/store";
import { cn } from "@/lib/utils";

// const navItems = [
//   { name: "Products", href: "/products" },
//   { name: "Repairing Services", href: "/services" },
// ];

export function UserNavbar({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const totalItems = useCartStore((state) => state.getTotalItems());
  console.log(totalItems);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "100%" },
  };

  return (
    <nav className={cn(className, "bg-white shadow-md")}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary">
              MobileShop
            </Link>
          </div>

          {/* <div className="hidden md:flex items-center justify-center flex-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary hover:bg-gray-100 transition duration-150 ease-in-out"
              >
                {item.name}
              </Link>
            ))}
          </div> */}

          <div className="flex items-center">
            <Link
              href="/cart"
              className="p-2 text-gray-700 hover:text-primary transition duration-150 ease-in-out relative"
            >
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute top-3 -right-2 text-xs"
                >
                  {totalItems}
                </Badge>
              )}
            </Link>

            <div className="ml-4 md:hidden">
              <Button variant="ghost" onClick={toggleMenu}>
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}

      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg absolute top-16 left-0 right-0 z-50">
        {/* {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-100 transition duration-150 ease-in-out"
              onClick={toggleMenu}
            >
              {item.name}
            </Link>
          ))} */}
        <div className="mt-4 flex justify-between items-center px-3">
          <Link
            href="/cart"
            className="text-gray-700 hover:text-primary transition duration-150 ease-in-out relative"
            onClick={toggleMenu}
          >
            <ShoppingCart className="h-6 w-6" />
            {totalItems > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-2 -right-2 text-xs"
              >
                {totalItems}
              </Badge>
            )}
          </Link>
          <Button variant="ghost" onClick={toggleMenu}>
            <X className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </nav>
  );
}
