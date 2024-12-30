"use client";

import { addProduct, updateProduct } from "@/actions/product";
import { uploadImage } from "@/actions/upload-image";
import FormSubmitButton from "@/components/form-submit-button";
import SelectInput from "@/components/inputs/select-input";
import { TextAreaInput } from "@/components/inputs/text-area-input";
import TextInput from "@/components/inputs/text-input";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { brands } from "@/constants/data";
import { addProductSchema } from "@/lib/schemas/product-schema";
import { UploadButton } from "@/lib/uploadthing";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function AddProductForm({ categories, product }: any) {
  const [image, setImage] = useState<string | undefined>();
  const [products, setProducts] = useState<any>([]);
  // 1. Define your form.
  const form = useForm<z.infer<typeof addProductSchema>>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      category: product?.categoryId || "",
      name: product?.name || "",
      imei: product?.imei || "",
      carrierStatus: product?.carrierStatus || "",
      boughtPrice: product?.boughtPrice || 0,
      price: product?.price || 0,
      description: product?.description || "",
      storage: product?.storage || "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof addProductSchema>) {
    if (product) {
      const response = await updateProduct(values, product, image);
    } else {
      if (!image) {
        throw new Error("Image is required...");
      }
      const response = await addProduct(values, image);
    }
  }

  const handleCategoryChange = async (categoryId: string) => {
    const category = categories.find(
      (cat: { id: string }) => cat.id === categoryId
    );
    const filteredProducts = brands.filter(
      (brand) => brand.brand.toLowerCase() === category.name.toLowerCase()
    );
    console.log(filteredProducts);

    setProducts(filteredProducts[0]?.models);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            <SelectInput
              label={product ? product.category?.name : "Select Brand"}
              name="category"
              control={form.control}
              items={categories}
              onValueChange={handleCategoryChange}
            />
            <SelectInput
              label={product ? product?.name : "Select Product"}
              name="name"
              control={form.control}
              items={products}
            />
            {/* <TextInput
              label="Product Name"
              name="name"
              autoFocus
              control={form.control}
            /> */}
            <TextInput
              label="IMEI"
              name="imei"
              autoFocus
              control={form.control}
            />
            <TextInput
              label="Carrier Status"
              name="carrierStatus"
              autoFocus
              control={form.control}
            />
            <TextInput
              label="Bought Price"
              name="boughtPrice"
              type="number"
              control={form.control}
            />
            <TextInput
              label="Selling Price"
              name="price"
              type="number"
              control={form.control}
            />

            <TextInput
              label="Storage Capacity"
              name="storage"
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
                  // alert("Upload Completed");
                }}
                onUploadError={(error: Error) => {
                  // Do something with the error.
                  console.log(error.message);
                  // alert(`ERROR! ${error.message}`);
                }}
              />
              {image ? (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -z-10 w-full brightness-75">
                  <Image
                    src={image}
                    alt="Image"
                    width={1000}
                    height={1000}
                    className="w-full h-[150px] object-cover rounded-md"
                  />
                </div>
              ) : (
                product?.image && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -z-10 w-full brightness-75">
                    <Image
                      src={product.image}
                      alt="Image"
                      width={1000}
                      height={1000}
                      className="w-full h-[150px] object-cover rounded-md"
                    />
                  </div>
                )
              )}
            </div>
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
              title={product ? "Update Product" : "Add Product"}
              loading={form.formState.isSubmitting}
              className="w-fit"
            />
          </div>
        </form>
      </Form>
    </div>
  );
}
