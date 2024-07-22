"use client";
import { updateSchool } from "@/actions/school";
import { PasswordInputField } from "@/components/InputFields/password-input-field";
import SelectField from "@/components/InputFields/select-field";
import { TextInputField } from "@/components/InputFields/text-input-field";
import LoadingButton from "@/components/buttons/loading-button";
import { FormError } from "@/components/form-error";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import UploadButtonComponent from "@/lib/UploadButtonComponent";
import { loginSchema, LoginSchema } from "@/lib/schemas/login-schema";
import {
  addSchoolSchema,
  AddSchoolSchema,
  updateSchoolUserSchema,
  UpdateSchoolUserSchema,
} from "@/lib/schemas/school-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { updateSchoolAdmin } from "./action";

export function UpdateSchoolUserForm({ school }: { school: any }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const form = useForm<UpdateSchoolUserSchema>({
    resolver: zodResolver(updateSchoolUserSchema),
    defaultValues: {
      username: school.username || "",
      password: "",
    },
  });

  function onSubmit(values: UpdateSchoolUserSchema) {
    setError(undefined);
    startTransition(async () => {
      const result = await updateSchoolAdmin(values);
      if (result?.error) {
        setError(result.error);
      }
    });
    form.reset();
  }
  return (
    <>
      {error && <FormError message={error} className="my-4" />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <div className="w-full grid gris-cols-1 md:grid-cols-2  gap-4">
            <TextInputField
              label="Username"
              name="username"
              control={form.control}
              required
            />
            <PasswordInputField
              label="New Password"
              name="password"
              control={form.control}
            />
          </div>
          <div className="flex justify-center">
            <LoadingButton
              loading={isPending}
              title="Update User"
              className="mt-6 w-fit px-8"
            />
          </div>
        </form>
      </Form>
    </>
  );
}
