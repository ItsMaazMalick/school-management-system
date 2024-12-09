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
import { UploadButton } from "@/lib/uploadthing";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function AddProductForm({ categories }: any) {
  const [image, setImage] = useState<string | undefined>();
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

    // Upload the image first.
    // const res = await uploadImage(image);

    const response = await addProduct(values, image);

    // console.log(res);

    console.log(response);
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
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

            <div className="relative h-[150px]">
              <UploadButton
                className="w-full mt-8 z-50"
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  setImage(res[0]?.url);
                  // Do something with the response
                  console.log("Files: ", res);
                  alert("Upload Completed");
                }}
                onUploadError={(error: Error) => {
                  // Do something with the error.
                  alert(`ERROR! ${error.message}`);
                }}
              />
              {image && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -z-10 w-full brightness-75">
                  <Image
                    src={image}
                    alt="Image"
                    width={1000}
                    height={1000}
                    className="w-full h-[150px] object-cover rounded-md"
                  />
                </div>
              )}
            </div>

            <TextInput label="Storage" name="storage" control={form.control} />
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
