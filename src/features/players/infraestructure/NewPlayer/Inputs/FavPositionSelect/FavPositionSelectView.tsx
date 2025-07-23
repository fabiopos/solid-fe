import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Info } from "lucide-react";

interface FavPositionSelectViewProps {
  favPosition: string;
  setFavFieldPosition: (value: string) => void;
}

function FavPositionSelectView({
  favPosition,
  setFavFieldPosition,
}: FavPositionSelectViewProps) {
  return (
    <div>
      <Label className="dark:text-slate-800 font-bold flex gap-2 mt-5 mb-1">
        Fav. Field Position <Info size={16} />{" "}
      </Label>
      <Select onValueChange={setFavFieldPosition} value={favPosition}>
        <SelectTrigger className="w-full px-2 bg-background">
          <SelectValue placeholder="Select a position" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="PO">GK - Goalkeeper</SelectItem>
          <SelectItem value="LTD">RB - Right Side Back</SelectItem>
          <SelectItem value="LTI">LB - Left Side Back</SelectItem>
          <SelectItem value="DFC">CB - Center Back Defender</SelectItem>
          <SelectItem value="LIB">BL - Backliner</SelectItem>
          <SelectItem value="MCD">DM - Defensive Midfielder</SelectItem>
          <SelectItem value="MD">RM - Right Midfielder</SelectItem>
          <SelectItem value="MCC">BM - Box to Box Midfielder</SelectItem>
          <SelectItem value="MCO">OM - Offensive Midfielder</SelectItem>
          <SelectItem value="MI">LM - Left Midfielder</SelectItem>
          <SelectItem value="EXI">LW - Left Wing</SelectItem>
          <SelectItem value="EXD">RW - Right Wing</SelectItem>
          <SelectItem value="SP">MF - Mid Forward</SelectItem>
          <SelectItem value="DEL">FW - Forward</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default FavPositionSelectView;
