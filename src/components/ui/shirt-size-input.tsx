import React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "./select";
import { ShirtSize } from "@/shared/enums/playerEnums";
interface ShirtSizeInputProps {
  setShirtSize: (value: string) => void;
  shirtSize: ShirtSize;
}
function ShirtSizeInput({ setShirtSize, shirtSize }: ShirtSizeInputProps) {
  return (
    <Select onValueChange={setShirtSize} value={shirtSize}>
      <SelectTrigger className="w-full px-2 bg-background dark:border-none">
        <SelectValue placeholder="Select a Shirt Size" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="XS">XS</SelectItem>
        <SelectItem value="S">S</SelectItem>
        <SelectItem value="M">M</SelectItem>
        <SelectItem value="L">L</SelectItem>
        <SelectItem value="XL">XL</SelectItem>
        <SelectItem value="XXL">XXL</SelectItem>
      </SelectContent>
    </Select>
  );
}

export default ShirtSizeInput;
