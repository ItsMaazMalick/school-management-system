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
  control: any;
  items: {
    id: string;
    label?: string;
    name?: string;
  }[];
  required?: boolean;
  data: any;
  setData: (data: any) => void;
};

export function DynamicSelectInput({
  label,
  control,
  name,
  items,
  required,
  data,
  setData,
}: TextInputProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { value, ...fieldValues } }) => (
        <FormItem>
          <FormLabel className="text-xs md:text-base">
            {label}
            {required && <RequiredTag />}
          </FormLabel>
          <Select
            onValueChange={(selectedValue) => {
              const selectedData = selectedValue;
              setData(selectedData);
              fieldValues.onChange(selectedData);
            }}
          >
            <FormControl className="text-xs md:text-base">
              <SelectTrigger>
                <SelectValue placeholder={`Select ${label}`} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="max-h-[300px]">
              {items.map((item: any, index: number) => (
                <SelectItem key={index} value={item.id}>
                  {item.name || item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage className="text-xs sm:text-base" />
        </FormItem>
      )}
    />
  );
}
