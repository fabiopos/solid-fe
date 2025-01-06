import React, { useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "./select";
import { cn } from "@/lib/utils";

interface ShirtNumberInputProps {
  setNumberOnShirt: (shirtNumber: string) => void;
  numberOnShirt: string;
  playersNumbers: number[];
  className?: string;
}
function ShirtNumberInput({
  numberOnShirt,
  setNumberOnShirt,
  playersNumbers,
  className,
}: ShirtNumberInputProps) {
  const numbersAllowed = useMemo(() => {
    let numbers = [];
    for (let index = 1; index < 100; index++) {
      numbers.push(index);
    }
    return numbers;
  }, []);

  return (
    <Select onValueChange={setNumberOnShirt} value={numberOnShirt}>
      <SelectTrigger className={cn("w-full px-2 bg-background", className)}>
        <SelectValue placeholder="Select a shirt number" />
      </SelectTrigger>
      <SelectContent>
        {numbersAllowed.map((n) => (
          <SelectItem
            key={`shirt-number-${n}`}
            value={n.toString()}
            disabled={playersNumbers.includes(n)}
          >
            {n}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default ShirtNumberInput;
