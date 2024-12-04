"use client";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store";
import { ShoppingCart } from "lucide-react";

export function AddToCart({ phone }: any) {
  const { addItem } = useCartStore();

  const handleAddToCart = (item: any, type: "mobile" | "repair") => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      type: type,
    });
  };
  return (
    <Button
      onClick={() => handleAddToCart(phone, "mobile")}
      className="w-full mb-4"
    >
      <ShoppingCart className="mr-2 h-4 w-4" />
      Add to Cart
    </Button>
  );
}
