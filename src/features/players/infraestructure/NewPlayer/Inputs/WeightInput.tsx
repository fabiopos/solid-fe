"use client";
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
      {!isValidWeight && !!weight && (
        <small className="text-red-500">
          The weight you entered is invalid.
        </small>
      )}
    </div>
  );
}

export default WeightInput;
