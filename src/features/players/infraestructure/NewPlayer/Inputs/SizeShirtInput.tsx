import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNewPlayerStore } from "@/context/NewPlayerCtx";

function ShizeShirt() {
  const { shirtSize, setShirtSize } = useNewPlayerStore((state) => state);
  return (
    <div>
      <Label className="dark:text-slate-800 font-bold flex gap-2 mt-5 mb-1">
        Shirt Size
      </Label>
      <Select onValueChange={setShirtSize} value={shirtSize}>
        <SelectTrigger className="w-full px-2 bg-background">
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
    </div>
  );
}

export default ShizeShirt;
