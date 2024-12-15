"use client";

import { useState, useEffect, useTransition } from "react";
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
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { updateOrderStatus } from "@/actions/order";
import FormSubmitButton from "@/components/form-submit-button";

// Define types based on your schema

export function OrderPage({ order }: any) {
  const [orderStatus, setOrderStatus] = useState(order.orderStatus);
  const [isPending, startTransition] = useTransition();

  const updateStatus = (e: any) => {
    e.preventDefault();
    startTransition(async () => {
      await updateOrderStatus(order.id, orderStatus);
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Order Details</h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Order Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">Order ID:</p>
              <p>{order.id}</p>
            </div>
            {order.trxId && (
              <div>
                <p className="font-semibold">TRX ID:</p>
                <p>{order.trxId}</p>
              </div>
            )}
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
            <form onSubmit={updateStatus}>
              <p className="font-semibold">Update Status:</p>
              <select
                name=""
                id=""
                className="p-2 mr-2 ring-1 ring-black rounded-md"
                onChange={(e) => setOrderStatus(e.target.value)}
              >
                <option value={order.orderStatus}>
                  {order.orderStatus === "pending" ? "Pending" : "Paid"}
                </option>
                {order.orderStatus !== "pending" && (
                  <option value="pending">Pending</option>
                )}
                {order.orderStatus !== "paid" && (
                  <option value="paid">Paid</option>
                )}
              </select>
              <FormSubmitButton
                title="Update"
                loading={isPending}
                className="w-fit"
              />
            </form>
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
              {order.orderServicesItem?.map((item: any) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <Tool className="mr-2 h-4 w-4" />
                      {item.repairServices.repairProduct.name} -{" "}
                      {item.repairServices.name}
                    </div>
                  </TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell className="text-right">
                    ${item.repairServices.price}
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
