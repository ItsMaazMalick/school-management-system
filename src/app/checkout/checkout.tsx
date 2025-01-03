"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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
import { useCartStore } from "@/store";
import { useRouter } from "next/navigation";

export const createOrderSchema = z.object({
  name: z.string().min(1, "Name is required"),
  device: z.string().min(1, "Device is required"),
  imei: z.string().min(1, "IMEI is required"),
  address: z.string().min(1, "Address is required"),
  email: z
    .string()
    .email({
      message: "Please enter a valid email address.",
    })
    .optional(),
  contactNumber: z.string().min(1, "Phone number is required"),
  trxId: z.string().optional(),
});

export function CheckoutForm() {
  const { items, clearCart } = useCartStore();
  const router = useRouter();

  // useEffect(() => {
  //   if (items.length <= 0) {
  //     router.replace("/"); // Correct way to handle redirection
  //   }
  // }, [router, items]);

  const form = useForm<z.infer<typeof createOrderSchema>>({
    resolver: zodResolver(createOrderSchema),
    defaultValues: {
      email: "",
      contactNumber: "",
      trxId: "",
    },
  });

  async function onSubmit(values: z.infer<typeof createOrderSchema>) {
    const res = await createOrder({ ...values, cartItems: items });
    if (res?.success) {
      clearCart();
    }
    router.replace(`/order-summary/${res?.order?.id}`);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Checkout</CardTitle>
          <CardDescription>
            Please fill in your details to complete your order.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      We&apos;ll send your order confirmation to this email.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contactNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Number</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="+1234567890" {...field} />
                    </FormControl>
                    <FormDescription>
                      We&apos;ll use this number to contact you about your order
                      if necessary.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="trxId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>TRX ID (optional)</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="123456789" {...field} />
                    </FormControl>
                    <FormDescription>
                      If paid online than Enter TRX ID
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-center my-4">
                <FormSubmitButton
                  title="Place Order"
                  loading={form.formState.isSubmitting}
                  className="w-fit"
                />
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
