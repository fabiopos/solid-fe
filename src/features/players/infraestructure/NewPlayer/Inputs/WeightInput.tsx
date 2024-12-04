"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useNewPlayerStore } from "@/context/NewPlayerCtx";

function WeightInput() {
  const { weight, setWeight, isValidWeight } = useNewPlayerStore(
    (state) => state
  );
  return (
    <div>
      <Label className="dark:text-slate-800 font-bold">Weight (kg)</Label>
      <Slider
        defaultValue={[33]}
        min={10}
        max={200}
        step={1}
        onValueChange={(value) => setWeight(value[0].toString())}
        value={[Number(weight)]}
      />
      <small>{weight}kg</small>
      {/* <Input
        placeholder="63kg"
        className="bg-white border-slate-300"
        maxLength={3}
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      /> */}
      {!isValidWeight && !!weight && (
        <small className="text-red-500">
          The weight you entered is invalid.
        </small>
      )}
    </div>
  );
}

export default WeightInput;
