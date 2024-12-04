import React from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";

interface Option {
  value: string;
  label: string;
}

interface MultiSelectInputProps {
  label: string;
  name: string;
  options: Option[];
  control: any;
  required?: boolean;
}
export const MultiSelectInput = ({
  label,
  name,
  options,
  control,
  required,
}: MultiSelectInputProps) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <div>
        <label className="text-xs md:text-base">{label}</label>
        <Select
          {...field}
          isMulti
          options={options}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={(selectedOptions: any) => {
            field.onChange(selectedOptions.map((option: any) => option.value));
          }}
          value={options.filter((option) => field.value.includes(option.value))}
        />
      </div>
    )}
  />
);
