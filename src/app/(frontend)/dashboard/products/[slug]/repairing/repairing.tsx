"use client";

import React, { useState } from "react";
import {
  Smartphone,
  Battery,
  Zap,
  Camera,
  Wifi,
  Volume2,
  Monitor,
  Plus,
  Minus,
  ShoppingCart,
  Workflow,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import { useCartStore } from "@/store";

export function Repairing({ product }: any) {
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
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Information */}
        <div className="md:w-1/3">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{product.name}</CardTitle>
              <CardDescription>Select the services you need</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center mb-4">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={1000}
                    height={1000}
                    className="w-full h-full"
                  />
                ) : (
                  <Smartphone className="w-32 h-32 text-primary" />
                )}
              </div>
              <p className="text-center text-sm text-muted-foreground mb-4">
                Model: {product.name}
                <br />
                Display: {product.display}
                <br />
                Storage: {product.storage}
              </p>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    Why choose our repair service?
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-4 space-y-2">
                      <li>Certified technicians</li>
                      <li>Genuine Apple parts</li>
                      <li>90-day warranty on repairs</li>
                      <li>Fast turnaround times</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>

        {/* Repair Options */}
        <div className="md:w-2/3">
          <h2 className="text-2xl font-bold mb-4">Available Repair Services</h2>
          <div className="grid gap-4 mb-6">
            {product.RepairServices?.map((service: any) => (
              <Card key={service.id} className={`transition-colors`}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    <Workflow className="w-4 h-4 inline-block mr-2" />
                    {service.name}
                  </CardTitle>
                  <Badge>${service.price}</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    {service.description}
                  </p>
                  <p className="text-xs mt-1">
                    Estimated time: {service.estimatedTime}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => handleAddToCart(service, "repair")}
                    className="w-full"
                  >
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>

        {/* <CardFooter>
          <Button
            className="w-full"
            disabled={product.repairServices.length === 0}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Proceed to Checkout
          </Button>
        </CardFooter> */}
      </Card>
    </div>
  );
}
