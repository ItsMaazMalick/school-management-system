// components/DeviceConditionRadioGroup.tsx
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface RadioGroupProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const DeviceConditionRadioGroup: React.FC<RadioGroupProps> = ({
  label,
  value,
  onChange,
}) => {
  return (
    <div className="my-1">
      <div className="w-full">
        <div className="flex items-center justify-between">
          <Label>{label}</Label>
          <RadioGroup
            className="flex items-center gap-4"
            value={value} // Bind value to `lastStepValues`
            onValueChange={onChange}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="null" id="r1" />
              <Label htmlFor="r1">Default</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="true" id="r2" />
              <Label htmlFor="r2">True</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="false" id="r3" />
              <Label htmlFor="r3">False</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};

export default DeviceConditionRadioGroup;
