import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
type TextInputProps = {
  label: string;
  control: any;
  name: string;
  type?: string;
  placeholder?: string;
  description?: string;
  required?: boolean;
};

export function TextAreaInput({
  label,
  control,
  name,
  type,
  placeholder,
  description,
  required,
}: TextInputProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-xs md:text-base">{label}</FormLabel>
          <FormControl className="text-xs md:text-base">
            <Textarea
              className="min-h-[300px]"
              placeholder={placeholder ? placeholder : label}
              {...field}
            />
          </FormControl>
          <FormDescription className="text-destructive">
            {description}
          </FormDescription>
          <FormMessage className="text-xs md:text-base" />
        </FormItem>
      )}
    />
  );
}
