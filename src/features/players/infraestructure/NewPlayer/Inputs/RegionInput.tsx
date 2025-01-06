import { Label } from "@/components/ui/label";
import RegionSelect from "@/components/ui/region-select";
import { useNewPlayerStore } from "@/context/NewPlayerCtx";

interface RegionInputProps {}
function RegionInput({}: RegionInputProps) {
  const { country, setCity } = useNewPlayerStore((state) => state);
  return (
    <div>
      <Label className="dark:text-slate-800 font-bold">Origin Region</Label>
      <RegionSelect
        className="bg-background border border-slate-300 px-4"
        countryCode={country}
        onChange={setCity}
      />
    </div>
  );
}

export default RegionInput;
