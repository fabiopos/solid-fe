import React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "./select";
import { DominantFoot } from "@/shared/enums/playerEnums";
interface DominantFootInputProps {
  dominantFoot: DominantFoot;
  setDominantFoot: (value: string) => void;
}
function DominantFootInput({
  dominantFoot,
  setDominantFoot,
}: DominantFootInputProps) {
  return (
    <Select onValueChange={setDominantFoot} value={dominantFoot}>
      <SelectTrigger className="w-full px-2 bg-background/90 dark:border-none">
        <SelectValue placeholder="Select a Dominant Foot" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={DominantFoot.LEFT}>Left</SelectItem>
        <SelectItem value={DominantFoot.RIGHT}>Right</SelectItem>
        <SelectItem value={DominantFoot.BOTH}>Both</SelectItem>
      </SelectContent>
    </Select>
  );
}

export default DominantFootInput;
