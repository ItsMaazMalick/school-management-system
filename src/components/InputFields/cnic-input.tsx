import { useState } from "react";
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

type TextInputProps = {
  label: string;
  control: any;
  name: string;
  type?: string;
  placeholder?: string;
  description?: string;
  required?: boolean;
  autoFocus?: boolean;
};

export default function CnicInput({
  label,
  control,
  name,
  type,
  placeholder,
  description,
  required,
  autoFocus,
}: TextInputProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { value, onChange, ...fieldValues } }) => {
        const [formattedValue, setFormattedValue] = useState(value || "");

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          let inputValue = e.target.value.replace(/\D/g, ""); // Remove all non-digit characters
          if (inputValue.length > 5)
            inputValue = inputValue.slice(0, 5) + "-" + inputValue.slice(5);
          if (inputValue.length > 13)
            inputValue = inputValue.slice(0, 13) + "-" + inputValue.slice(13);

          setFormattedValue(inputValue);
          onChange(inputValue); // Update the form state
        };

        return (
          <FormItem>
            <FormLabel className="text-xs md:text-base">
              {label}
              {required && <RequiredTag />}
            </FormLabel>
            <FormControl className="text-xs md:text-base">
              <Input
                autoFocus={autoFocus}
                type={type ? type : "text"}
                placeholder={placeholder ? placeholder : label}
                value={formattedValue}
                onChange={handleChange}
              />
            </FormControl>
            <FormDescription>{description}</FormDescription>
            <FormMessage className="text-xs md:text-base" />
          </FormItem>
        );
      }}
    />
  );
}
