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
import { useCartStore } from "@/store";
import { ChevronDown, Filter, Plus, Search, Smartphone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Assuming you're passing a prop `products` that contains the product data from the backend
export function Products({ products, link }: any) {
  console.log(products);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const { addItem } = useCartStore();

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

  const filteredProducts = products.filter(
    (product: any) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedBrands.length === 0 ||
        selectedBrands.includes(product.category.name))
  );

  const brands: string[] = Array.from(
    new Set(products.map((p: any) => p.category.name))
  );

  const handleAddToCart = (phone: any) => {
    addItem({
      id: phone.id,
      name: phone.name,
      price: phone.price,
      type: "mobile",
    });
    console.log("added");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Mobile Phones</h1>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full md:w-auto">
              <Filter className="mr-2 h-4 w-4" />
              Filter by Brand
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Select Brands</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {brands.map((brand, index) => (
              <DropdownMenuCheckboxItem
                key={index}
                checked={selectedBrands.includes(brand)}
                onCheckedChange={(checked) => {
                  setSelectedBrands(
                    checked
                      ? [...selectedBrands, brand]
                      : selectedBrands.filter((b) => b !== brand)
                  );
                }}
              >
                {brand}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product: any) => (
          <Card key={product.id} className="flex flex-col">
            <CardHeader className="p-1">
              <Image
                src={product.image}
                alt={product.name}
                width={1000}
                height={1000}
                className="w-full h-48 object-contain rounded-t-lg"
              />
            </CardHeader>
            <CardContent className="flex-grow p-4">
              <CardTitle>{product.name}</CardTitle>
              <p className="text-sm text-gray-500">{product.category.name}</p>
              <div className="flex justify-between items-center">
                <p className="text-lg font-bold mt-2">${product.price}</p>
                {/* <Link
                  className="flex justify-end text-destructive"
                  href={`/dashboard/products/${product.slug}/repairing`}
                >
                  Show Services
                </Link> */}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between p-4 pt-0">
              <Button asChild>
                <Link
                  href={
                    link
                      ? `/product/${product.slug}`
                      : `/dashboard/products/${product.slug}`
                  }
                >
                  View Detail
                </Link>
              </Button>
              <Button
                variant="default"
                className="w-full"
                onClick={() => handleAddToCart(product)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
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
