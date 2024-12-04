"use client";

import { addCategory } from "@/actions/category";
import FormSubmitButton from "@/components/form-submit-button";
import TextInput from "@/components/inputs/text-input";
import { Form } from "@/components/ui/form";
import { addCategorySchema } from "@/lib/schemas/category-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function AddCategoryForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof addCategorySchema>>({
    resolver: zodResolver(addCategorySchema),
    defaultValues: {
      name: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof addCategorySchema>) {
    const response = await addCategory(values);
    console.log(response);
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <TextInput
            label="Category Name"
            name="name"
            autoFocus
            control={form.control}
          />
          <div className="flex justify-center my-4">
            <FormSubmitButton
              title="Add Category"
              loading={form.formState.isSubmitting}
              className="w-fit"
            />
          </div>
        </form>
      </Form>
    </div>
  );
}
