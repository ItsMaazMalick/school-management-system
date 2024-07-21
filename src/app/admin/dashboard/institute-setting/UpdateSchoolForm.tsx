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
import { addSchoolSchema, AddSchoolSchema } from "@/lib/schemas/school-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

export function UpdateSchoolForm({ school }: { school: any }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [image, setImage] = useState("");
  const form = useForm<AddSchoolSchema>({
    resolver: zodResolver(addSchoolSchema),
    defaultValues: {
      name: school.name,
      email: school.email,
      targetLine: school.targetLine,
      contact: school.contact,
      website: school.website || "",
      address: school.address,
      country: school.country,
    },
  });

  function onSubmit(values: AddSchoolSchema) {
    setError(undefined);
    startTransition(async () => {
      const result = await updateSchool(values, school.id, image, school.image);
      if (result?.error) {
        setError(result.error);
      }
    });
    form.reset();
  }
  return (
    <>
      <Image
        src={image || school.image || "/images/school.png"}
        alt=""
        width={1000}
        height={1000}
        className="w-[200px] aspect-square mx-auto mb-4 rounded-full ring-1 shadow-lg shadow-primary object-cover"
      />
      {error && <FormError message={error} className="my-4" />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <div className="w-full grid gris-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <TextInputField
              label="School Name"
              name="name"
              placeholder="School Name"
              control={form.control}
              autoFocus
              required
            />
            <TextInputField
              label="School Email"
              name="email"
              placeholder="School Email"
              control={form.control}
              required
            />
            <TextInputField
              label="Target Line"
              name="targetLine"
              placeholder="Target Line"
              control={form.control}
              required
            />
            <div>
              <Label>Image</Label>
              <div className="text-black bg-primary w-full rounded-md h-10 flex justify-center items-center mt-2">
                <UploadButtonComponent image={image} setImage={setImage} />
              </div>
            </div>
            <TextInputField
              label="Contact"
              name="contact"
              placeholder="Contact"
              control={form.control}
              required
            />
            <TextInputField
              label="Website"
              name="website"
              placeholder="Website"
              control={form.control}
            />
            <TextInputField
              label="Address"
              name="address"
              placeholder="Address"
              control={form.control}
              required
            />
            <TextInputField
              label="Country"
              name="country"
              placeholder="Country"
              control={form.control}
              required
            />
          </div>
          <div className="flex justify-center">
            <LoadingButton
              loading={isPending}
              title="Update School"
              className="mt-6 w-fit px-8"
            />
          </div>
        </form>
      </Form>
    </>
  );
}
