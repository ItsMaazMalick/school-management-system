"use client";

import { addProduct } from "@/actions/product";
import { uploadImage } from "@/actions/upload-image";
import FormSubmitButton from "@/components/form-submit-button";
import SelectInput from "@/components/inputs/select-input";
import { TextAreaInput } from "@/components/inputs/text-area-input";
import TextInput from "@/components/inputs/text-input";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addProductSchema } from "@/lib/schemas/product-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function AddProductForm({ categories }: any) {
  const [image, setImage] = useState<File | null | undefined>();
  // 1. Define your form.
  const form = useForm<z.infer<typeof addProductSchema>>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      name: "",
      price: 0,
      description: "",
      storage: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof addProductSchema>) {
    if (!image) {
      throw new Error("Image is required...");
    }
    const res = await uploadImage(image);
    if (!res.success) {
      return console.log("error");
    }

    const response = await addProduct(values, res.result.secure_url);

    console.log(res);

    console.log(response);
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <div className="grid grid-cols-3 gap-4 p-4">
            <SelectInput
              label="Category"
              name="category"
              control={form.control}
              items={categories}
            />
            <TextInput
              label="Product Name"
              name="name"
              autoFocus
              control={form.control}
            />
            <TextInput
              label="Product Price"
              name="price"
              type="number"
              control={form.control}
            />
            <div>
              <Label>Product Image</Label>
              <Input
                className="mt-[8px]"
                placeholder="Upload File"
                type="file"
                onChange={(e) => setImage(e.target.files?.[0])}
              />
            </div>
            <TextInput label="Display" name="display" control={form.control} />
            <TextInput label="Storage" name="storage" control={form.control} />
            <TextInput label="Chip" name="chip" control={form.control} />
            <TextInput
              label="Front Camera"
              name="frontCamera"
              control={form.control}
            />
            <TextInput
              label="Back Camera"
              name="backCamera"
              control={form.control}
            />
            <TextInput label="Battery" name="battery" control={form.control} />
          </div>
          <div className="p-4">
            <TextAreaInput
              label="Description (Optional)"
              name="description"
              control={form.control}
            />
          </div>
          <div className="flex justify-center">
            <FormSubmitButton
              title="Add Product"
              loading={form.formState.isSubmitting}
              className="w-fit"
            />
          </div>
        </form>
      </Form>
    </div>
  );
}
