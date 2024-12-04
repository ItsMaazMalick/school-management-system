"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Phone, PenToolIcon as Tool } from "lucide-react";

// Define types based on your schema
type OrderStatus = "pending" | "paid";

interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  product: {
    name: string;
    price: number;
  };
}

interface OrderServicesItem {
  id: string;
  serviceId: string;
  quantity: number;
  service: {
    name: string;
    price: number;
  };
}

interface Order {
  id: string;
  contactNumber: string;
  email: string | null;
  orderStatus: OrderStatus;
  price: number;
  createdAt: string;
  updatedAt: string;
  orderProducts: OrderItem[];
  OrderServicesItem: OrderServicesItem[];
}

export function OrderPage({ order }: any) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Order Details</h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Order Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">Order ID:</p>
              <p>{order.id}</p>
            </div>
            <div>
              <p className="font-semibold">Status:</p>
              <Badge
                variant={
                  order.orderStatus === "paid" ? "default" : "destructive"
                }
              >
                {order.orderStatus.charAt(0).toUpperCase() +
                  order.orderStatus.slice(1)}
              </Badge>
            </div>
            <div>
              <p className="font-semibold">Contact Number:</p>
              <p>{order.contactNumber}</p>
            </div>
            <div>
              <p className="font-semibold">Email:</p>
              <p>{order.email || "N/A"}</p>
            </div>
            <div>
              <p className="font-semibold">Created At:</p>
              <p>{format(new Date(order.createdAt), "PPpp")}</p>
            </div>
            <div>
              <p className="font-semibold">Updated At:</p>
              <p>{format(new Date(order.updatedAt), "PPpp")}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Order Items</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead className="text-right">Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.orderProducts?.map((item: any) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <Phone className="mr-2 h-4 w-4" />
                      {item?.products?.name || item?.name}
                    </div>
                  </TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell className="text-right">
                    ${item?.products?.price?.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Order Services</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead className="text-right">Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.OrderServicesItem?.map((item: any) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <Tool className="mr-2 h-4 w-4" />
                      {item.services.name}
                    </div>
                  </TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell className="text-right">
                    ${item.services.price.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <span className="font-semibold">Total Price:</span>
            <span className="text-2xl font-bold">
              ${order.price.toFixed(2)}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
