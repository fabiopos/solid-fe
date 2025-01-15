"use client";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useNewPlayerStore } from "@/context/NewPlayerCtx";

function HeightInput() {
  const { height, setHeight, isValidHeight } = useNewPlayerStore((state) => state);
  return (
    <div>
      <Label className="dark:text-slate-800 font-bold">Height (cm)</Label>
      <Slider
        defaultValue={[33]}
        min={100}
        max={220}
        step={1}
        onValueChange={(value) => setHeight(value[0].toString())}
        value={[Number(height)]}
      />
      <small>{height}cm</small>
       {!isValidHeight && !!height && (
        <small className="text-red-500">The height you entered is invalid.</small>
      )}
    </div>
  );
}

export default HeightInput;