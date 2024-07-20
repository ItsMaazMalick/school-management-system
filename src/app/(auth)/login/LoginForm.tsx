"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { loginSchema, LoginSchema } from "@/lib/schemas/login-schema";
import SelectField from "@/components/InputFields/select-field";
import { TextInputField } from "@/components/InputFields/text-input-field";
import { PasswordInputField } from "@/components/InputFields/password-input-field";
import LoadingButton from "@/components/buttons/loading-button";
import { FormError } from "@/components/form-error";
import { useState, useTransition } from "react";
import { login } from "./action";

export function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      role: "",
      username: "",
      password: "",
    },
  });

  function onSubmit(values: LoginSchema) {
    setError(undefined);
    startTransition(async () => {
      const result = await login(values);
      if (result?.error) {
        setError(result.error);
      }
    });
    form.reset();
    setTimeout(() => {
      setError(undefined);
    }, 3000);
  }

  return (
    <>
      {error && <FormError message={error} />}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4"
        >
          <SelectField
            label="Select Role"
            name="role"
            placeholder="Select Role"
            control={form.control}
            data={[
              { id: "SUPERADMIN", name: "Super Admin" },
              { id: "ADMIN", name: "Admin" },
              { id: "TEACHER", name: "Teacher" },
              { id: "STUDENT", name: "Student" },
            ]}
            required
          />
          <TextInputField
            label="Username"
            name="username"
            placeholder="Username"
            control={form.control}
            autoFocus
            required
          />
          <PasswordInputField
            label="Password"
            name="password"
            control={form.control}
            required
          />
          <LoadingButton loading={isPending} title="Login" className="mt-6" />
        </form>
      </Form>
    </>
  );
}
