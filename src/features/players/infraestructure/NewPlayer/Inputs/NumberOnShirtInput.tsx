"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNewPlayerStore } from "@/context/NewPlayerCtx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePlayers } from "@/features/players/domain/usePlayers";
import { useMemo } from "react";

function NumberOnShirtInput() {
  const { players } = usePlayers();
  const { numberOnShirt, setNumberOnShirt } =
    useNewPlayerStore((state) => state);

  const playersNumbers = useMemo(
    () => players.map((x) => x.shirtNumber).filter((x) => x),
    [players]
  );

  const numbersAllowed = useMemo(() => {
    let numbers = [];
    for (let index = 1; index < 100; index++) {
      numbers.push(index);
    }
    return numbers;
  }, []);

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
              disabled={playersNumbers.includes(n)}
            >
              {n}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default NumberOnShirtInput;
