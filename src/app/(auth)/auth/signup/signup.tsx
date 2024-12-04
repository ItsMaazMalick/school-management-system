"use client";

import { signup } from "@/actions/user";
import FormSubmitButton from "@/components/form-submit-button";
import TextInput from "@/components/inputs/text-input";
import { Form } from "@/components/ui/form";
import { signupSchema } from "@/lib/schemas/signup-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function SignupForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof signupSchema>) {
    const response = await signup(values);
    console.log(response);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <TextInput label="Name" name="name" autoFocus control={form.control} />
        <TextInput
          label="Email"
          placeholder="example@gmail.com"
          name="email"
          control={form.control}
        />
        <TextInput
          label="Password"
          name="password"
          type="password"
          control={form.control}
        />
        <div className="flex justify-center my-4">
          <FormSubmitButton
            title="Signup"
            loading={form.formState.isSubmitting}
            className="w-fit"
          />
        </div>
      </form>
    </Form>
  );
}
