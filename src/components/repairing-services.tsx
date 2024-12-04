"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ChevronDown, Filter, Search, Smartphone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Assuming you're passing a prop `products` that contains the product data from the backend
export function RepairingServices({ products, link }: any) {
  // Handle case when products are undefined or empty
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <Smartphone className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-semibold text-gray-900">
          No products available
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Please try again later or adjust your search.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Repairing Services</h1>

      {/* Search and Filter */}

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product: any) => (
          <Card key={product.id} className="flex flex-col">
            {/* <CardHeader className="p-1">
              <Image
                src={product.image}
                alt={product.name}
                width={1000}
                height={1000}
                className="w-full h-48 object-contain rounded-t-lg"
              />
            </CardHeader> */}
            <CardContent className="flex-grow p-4">
              <CardTitle>{product.name}</CardTitle>
              {/* <p className="text-sm text-gray-500">{product.category?.name}</p> */}

              {/* <p className="text-lg font-bold mt-2">${product.price}</p> */}
            </CardContent>
            <CardFooter className="flex justify-between p-4 pt-0">
              <Button asChild>
                <Link
                  className="w-full"
                  href={
                    link
                      ? `/product/${product.slug}/repairing`
                      : `/dashboard/products/${product.slug}/repairing`
                  }
                >
                  Services
                </Link>
              </Button>
              <Button asChild className="my-2"></Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <Smartphone className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-semibold text-gray-900">
            No products found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search or filter to find what you&apos;re looking
            for.
          </p>
        </div>
      )}
    </div>
  );
}
