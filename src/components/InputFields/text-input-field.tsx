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
  placeholder: string;
  description?: string;
  required?: boolean;
  autoFocus?: boolean;
};

export function TextInputField({
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
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label}
            {!required && " (Optional)"}
            {required && <RequiredTag />}
          </FormLabel>
          <FormControl>
            <Input
              autoFocus={autoFocus}
              type={type ? type : "text"}
              placeholder={
                required
                  ? placeholder || label
                  : `${placeholder || label} (Optional)`
              }
              {...field}
            />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
