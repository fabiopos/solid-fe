import { Label } from "@/components/ui/label";
import RegionSelect from "@/components/ui/region-select";

interface RegionInputProps {
  country: string;
  setCity: (city: string) => void;
}
function RegionInputView({ country, setCity }: RegionInputProps) {
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

export default RegionInputView;
