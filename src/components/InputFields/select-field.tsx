import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { RequiredTag } from "./required-tag";

type TextInputProps = {
  label: string;
  name: string;
  placeholder: string;
  control: any;
  data: {
    id: string;
    label?: string;
    name?: string;
  }[];
  required?: boolean;
};

export default function SelectField({
  label,
  control,
  name,
  placeholder,
  data,
  required,
}: TextInputProps) {
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
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="max-h-[300px]">
              {data.map((item, index) => (
                <SelectItem key={index} value={item.id}>
                  {item.name || item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
