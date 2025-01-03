"use client";
import React, { useState } from "react";
import Link from "next/link";
import { LayoutDashboard, ShoppingCart, Package, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <aside
      className={`bg-gradient-to-b from-primary-700 to-primary-500 text-white w-[256px] h-[100dvh] p-4 ${
        isOpen ? "block" : "hidden"
      } md:block`}
    >
      <nav>
        <div className="mb-6">
          <Image
            src="/images/logo.png"
            alt="Empire Repair Shop"
            width={1000}
            height={1000}
            className="w-16 mx-auto"
          />
          {/* <h2 className="text-2xl font-semibold ">Empire</h2> */}
        </div>
        <ul>
          <li className="mb-4">
            <Link href="/dashboard">
              <Button
                variant="ghost"
                className="w-full justify-start text-white"
              >
                <Package className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/pos">
              <Button
                variant="ghost"
                className="w-full justify-start text-white"
              >
                <Package className="mr-2 h-4 w-4" />
                POS
              </Button>
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/dashboard/products">
              <Button
                variant="ghost"
                className="w-full justify-start text-white"
              >
                <Package className="mr-2 h-4 w-4" />
                Products
              </Button>
            </Link>
          </li>
          {/* <li className="mb-4">
            <Link href="/dashboard/repairing-services">
              <Button
                variant="ghost"
                className="w-full justify-start text-white"
              >
                <Package className="mr-2 h-4 w-4" />
                Repairing Services
              </Button>
            </Link>
          </li> */}
          <li className="mb-4">
            <Link href="/dashboard/orders">
              <Button
                variant="ghost"
                className="w-full justify-start text-white"
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Orders
              </Button>
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/dashboard/add-category">
              <Button
                variant="ghost"
                className="w-full justify-start text-white"
              >
                <Package className="mr-2 h-4 w-4" />
                Add Brand
              </Button>
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/dashboard/add-product">
              <Button
                variant="ghost"
                className="w-full justify-start text-white"
              >
                <Package className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/dashboard/add-repairing">
              <Button
                variant="ghost"
                className="w-full justify-start text-white"
              >
                <Package className="mr-2 h-4 w-4" />
                Add Inventory
              </Button>
            </Link>
          </li>
          {/* <li className="mb-4">
            <Link href="/dashboard/add-glass">
              <Button
                variant="ghost"
                className="w-full justify-start text-white"
              >
                <Package className="mr-2 h-4 w-4" />
                Add Glass
              </Button>
            </Link>
          </li> */}
          {/* <li className="mb-4">
            <Link href="/dashboard/add-screen">
              <Button
                variant="ghost"
                className="w-full justify-start text-white"
              >
                <Package className="mr-2 h-4 w-4" />
                Add Screen
              </Button>
            </Link>
          </li> */}
        </ul>
      </nav>
    </aside>
  );
}
