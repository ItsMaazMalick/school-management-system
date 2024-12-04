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
import { Package, ShoppingCart } from "lucide-react";
import Link from "next/link";

export function MobileSidebar({ children }: { children: React.ReactNode }) {
  return (
    <Sheet>
      <SheetTrigger asChild className="md:hidden">
        {children}
      </SheetTrigger>
      <SheetContent className="bg-gradient-to-b from-primary-700 to-primary-500 text-secondary-200">
        <SheetHeader>
          <SheetTitle className="text-2xl font-semibold mb-6">
            MobileShop
          </SheetTitle>
        </SheetHeader>

        <ul>
          <li className="mb-4">
            <Link href="/dashboard" passHref>
              <SheetClose>
                <span className="w-full flex justify-start text-white p-4">
                  <Package className="mr-2 h-4 w-4" />
                  Dashboard
                </span>
              </SheetClose>
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/dashboard/products" passHref>
              <SheetClose>
                <span className="w-full flex justify-start text-white p-4">
                  <Package className="mr-2 h-4 w-4" />
                  Products
                </span>
              </SheetClose>
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/dashboard/repairing-services" passHref>
              <SheetClose>
                <span className="w-full flex justify-start text-white p-4">
                  <Package className="mr-2 h-4 w-4" />
                  Repairing Services
                </span>
              </SheetClose>
            </Link>
          </li>
          <li className="mb-4">
            <span className="w-full flex justify-start text-white p-4">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Orders
            </span>
          </li>
          <li className="mb-4">
            <Link href="/dashboard/add-category" passHref>
              <SheetClose>
                <span className="w-full flex justify-start text-white p-4">
                  <Package className="mr-2 h-4 w-4" />
                  Add Category
                </span>
              </SheetClose>
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/dashboard/add-product" passHref>
              <SheetClose>
                <span className="w-full flex justify-start text-white p-4">
                  <Package className="mr-2 h-4 w-4" />
                  Add Product
                </span>
              </SheetClose>
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/dashboard/add-repairing" passHref>
              <SheetClose>
                <span className="w-full flex justify-start text-white p-4">
                  <Package className="mr-2 h-4 w-4" />
                  Add Repairing
                </span>
              </SheetClose>
            </Link>
          </li>
        </ul>
      </SheetContent>
    </Sheet>
  );
}
