"use client";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface NumberOnShirtInputViewProps {
  numberOnShirt: string | undefined;
  setNumberOnShirt: (value: string) => void;
  numbersTaken: number[];
  numbersAllowed: number[];
}

function NumberOnShirtInputView({
  numberOnShirt,
  numbersAllowed,
  numbersTaken,
  setNumberOnShirt,
}: NumberOnShirtInputViewProps) {
  return (
    <div>
      <Label className="dark:text-slate-800 font-bold">Number on Shirt</Label>

      <Select onValueChange={setNumberOnShirt} value={numberOnShirt}>
        <SelectTrigger className="w-full px-2 bg-background">
          <SelectValue placeholder="Select a shirt number" />
        </SelectTrigger>
        <SelectContent>
          {numbersAllowed.map((n) => (
            <SelectItem
              key={`shirt-number-${n}`}
              value={n.toString()}
              disabled={numbersTaken.includes(n)}
            >
              {n}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default NumberOnShirtInputView;
