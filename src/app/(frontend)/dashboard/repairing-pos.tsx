"use client";

import { useCartStore } from "@/store";
import { PosBrands, RepairBrand } from "./pos-brands";
import { Cross, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { addBrand } from "@/actions/brand";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createOrder } from "@/actions/order";
import FormSubmitButton from "@/components/form-submit-button";
import { useRouter } from "next/navigation";
import { createOrderSchema } from "@/app/checkout/checkout";
import TextInput from "@/components/inputs/text-input";

export function RepairingPos({ brands }: { brands: RepairBrand[] }) {
  const [clientTotalPrice, setClientTotalPrice] = useState<number>(0); // State to store total price

  const {
    items,
    addItem,
    incrementItem,
    decrementItem,
    removeItem,
    clearCart,
    getTotalPrice,
    updateItemPrice,
  } = useCartStore();

  // Calculate the total price on client-side
  useEffect(() => {
    setClientTotalPrice(getTotalPrice());
  }, [items]); // Recalculate whenever items change

  const handlePriceChange = (id: number, newPrice: string) => {
    const parsedPrice = parseFloat(newPrice);
    if (!isNaN(parsedPrice) && parsedPrice > 0) {
      updateItemPrice(id, parsedPrice);
    }
  };

  const form = useForm<z.infer<typeof createOrderSchema>>({
    resolver: zodResolver(createOrderSchema),
    defaultValues: {
      name: "",
      device: "",
      imei: "",
      address: "",
      email: "",
      contactNumber: "",
      trxId: "",
    },
  });

  async function onSubmit(values: z.infer<typeof createOrderSchema>) {
    if (items.length < 1) {
      return alert("Please add items to the cart");
    }
    const res = await createOrder({ ...values, cartItems: items });
    if (res?.success) {
      clearCart();
      form.reset();
    }
  }

  return (
    <div className="bg-gray-100">
      <h1 className="p-4 text-center font-bold text-primary-500">
        Add Repairing Service
      </h1>

      <div className="p-4">
        <p>Add Customer Detail Here</p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <TextInput
                label="Name"
                name="name"
                control={form.control}
                hideLabel={true}
              />
              <TextInput
                label="Device"
                name="device"
                control={form.control}
                hideLabel={true}
              />
              <TextInput
                label="IMEI / SERIAL NO #"
                name="imei"
                control={form.control}
                hideLabel={true}
              />
              <TextInput
                label="Address"
                name="address"
                control={form.control}
                hideLabel={true}
              />
              <TextInput
                label="Email"
                name="email"
                type="email"
                control={form.control}
                hideLabel={true}
              />
              <TextInput
                label="Contact Number"
                name="contactNumber"
                control={form.control}
                hideLabel={true}
              />
              <TextInput
                label="TRX ID (Optional)"
                name="trxId"
                control={form.control}
                hideLabel={true}
              />
            </div>

            <div className="flex justify-center my-4">
              <FormSubmitButton
                title="Place Order"
                disabled={form.formState.isSubmitting || items.length < 1}
                loading={form.formState.isSubmitting}
                className="w-fit"
              />
            </div>
          </form>
        </Form>
      </div>

      <div className=" w-full h-[calc(100dvh-128px)] flex flex-col lg:flex-row p-4 gap-4">
        <div className="flex-1 max-h-[calc(100dvh-130px)] overflow-y-auto">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Name</th>
                  <th className="text-left p-2">Qty</th>
                  <th className="text-left p-2">Price</th>
                  <th className="text-left p-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {items
                  ?.filter((item) => item.type !== "mobile")
                  .map((product: any) => (
                    <tr key={product.id} className="border-b">
                      <td className="p-2 flex items-center gap-4">
                        <p
                          onClick={() => removeItem(product.id)}
                          className="p-1 bg-primary-500 rounded-full cursor-pointer text-white"
                        >
                          <X size={16} />
                        </p>
                        <p>{product.name}</p>
                      </td>
                      <td className="p-2">{product.quantity}</td>
                      <td className="p-2">${product.price}</td>
                      <td className="p-2">
                        {product.quantity * product.price}
                      </td>
                      <td>
                        <Input
                          onChange={(e) =>
                            handlePriceChange(product.id, e.target.value)
                          }
                          value={product.price}
                          placeholder="Price"
                          className="w-[80px]"
                          type="number"
                        />
                      </td>
                    </tr>
                  ))}
                <tr className="border-t font-bold">
                  <td className="">Total</td>
                  <td></td>
                  <td></td>
                  <td className="p-2 ">${clientTotalPrice.toFixed(2)}</td>
                  {/* <td>
                    <Button asChild>
                      <Link href={"/checkout"}>Checkout</Link>
                    </Button>
                  </td> */}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex-1 max-h-[calc(100dvh-130px)] overflow-y-auto">
          <PosBrands brands={brands} />
        </div>
      </div>
    </div>
  );
}
