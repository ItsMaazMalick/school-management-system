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

type SelectInputProps = {
  label: string;
  name: string;
  control: any;
  items: {
    name: string;
    id: string;
  }[];
  onValueChange?: (value: string) => void;
};

export default function SelectInput({
  label,
  control,
  name,
  items,
  onValueChange,
}: SelectInputProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select
            onValueChange={(value) => {
              field.onChange(value);
              if (onValueChange) {
                onValueChange(value);
              }
            }}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={`${label}`} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {items?.map(
                (item: { name: string; id: string }, index: number) => (
                  <SelectItem key={index} value={item.id}>
                    {item.name}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
