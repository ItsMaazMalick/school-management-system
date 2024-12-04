"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trash2, Plus, Minus } from "lucide-react";
import { useCartStore } from "@/store";
import Link from "next/link";
import { UserNavbar } from "../user-navbar";

export default function CartPage() {
  const {
    items,
    incrementItem,
    decrementItem,
    removeItem,
    clearCart,
    getTotalPrice,
  } = useCartStore();

  return (
    <div className="bg-gradient-to-r from-secondary-700 to-secondary-300">
      <UserNavbar className="sticky top-0 z-50" />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Your Cart</h1>

        {items.length === 0 ? (
          <p className="text-center text-white">Your cart is empty.</p>
        ) : (
          <>
            {items.map((item) => (
              <Card key={item.id} className="mb-4">
                <CardHeader>
                  <CardTitle>{item.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-bold">${item.price.toFixed(2)}</p>
                  <p className="text-sm text-gray-500">
                    {item.type === "mobile"
                      ? "Mobile Product"
                      : "Repair Service"}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => decrementItem(item.id)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span>{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => incrementItem(item.id)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}

            <div className="mt-8 flex flex-col items-end">
              <p className="text-xl font-bold mb-4">
                Total: ${getTotalPrice().toFixed(2)}
              </p>
              <div className="flex gap-4">
                <Button variant="destructive" onClick={clearCart}>
                  Clear Cart
                </Button>
                <Button asChild>
                  <Link href={"/checkout"}>Checkout</Link>
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
