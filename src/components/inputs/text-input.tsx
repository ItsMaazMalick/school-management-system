import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";

type TextInputProps = {
  hideLabel?: boolean;
  label: string;
  control: any;
  name: string;
  type?: string;
  disabled?: boolean;
  placeholder?: string;
  autoFocus?: boolean;
};

export default function TextInput({
  hideLabel,
  label,
  control,
  name,
  type,
  disabled,
  placeholder,
  autoFocus,
}: TextInputProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {!hideLabel && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input
              autoFocus={autoFocus}
              disabled={disabled}
              type={type ? type : "text"}
              placeholder={placeholder ? placeholder : label}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
