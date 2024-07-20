"use client";
import { Eye, EyeOff } from "lucide-react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

import { RequiredTag } from "./required-tag";
import { useState } from "react";
type TextInputProps = {
  label: string;
  control: any;
  name: string;
  description?: string;
  required?: boolean;
  autoFocus?: boolean;
};

export function PasswordInputField({
  label,
  control,
  name,
  description,
  required,
  autoFocus,
}: TextInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label}
            {required && <RequiredTag />}
          </FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                autoFocus={autoFocus}
                type={showPassword ? "text" : "password"}
                placeholder="*****"
                {...field}
              />
              <p
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-[5px] right-1 cursor-pointer w-[35px] h-[35px] rounded-full flex justify-center items-center"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </p>
            </div>
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
