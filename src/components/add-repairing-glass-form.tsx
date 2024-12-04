"use client";

import { addGlass } from "@/actions/glass";
import FormSubmitButton from "@/components/form-submit-button";
import { MultiSelectInput } from "@/components/inputs/multi-select-input";
import TextInput from "@/components/inputs/text-input";
import { Form } from "@/components/ui/form";
import { variations } from "@/constants/data";
import { addGlassSchema } from "@/lib/schemas/repairing-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function AddRepairingForm({ products }: any) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof addGlassSchema>>({
    resolver: zodResolver(addGlassSchema),
    defaultValues: {
      name: "",
      price: 0,
      variations: [],
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof addGlassSchema>) {
    const response = await addGlass(values);
    form.reset();
    console.log(response);
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <div className="grid grid-cols-3 gap-4 p-4">
            <TextInput
              label="Product Name"
              name="name"
              autoFocus
              control={form.control}
            />
            <TextInput
              label="Price"
              name="price"
              type="number"
              control={form.control}
            />
            <MultiSelectInput
              label="Select Colors"
              name="variations"
              control={form.control}
              options={variations}
            />
          </div>
          <div className="flex justify-center">
            <FormSubmitButton
              title="Add Service"
              loading={form.formState.isSubmitting}
              className="w-fit"
            />
          </div>
        </form>
      </Form>
    </div>
  );
}
