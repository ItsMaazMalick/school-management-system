import { Fragment } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function DisabledInput({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="my-2">
      <Label>{label}</Label>
      <Input readOnly placeholder={value} />
    </div>
  );
}
