import CountrySelect from "@/components/ui/country-select";
import { Label } from "@/components/ui/label";

interface CountryInputViewProps {
  setCountry: (country: string) => void;
}
function CountryInputView({ setCountry }: CountryInputViewProps) {
  return (
    <div>
      <Label className="dark:text-slate-800 font-bold">Origin Country</Label>
      <CountrySelect
        className="bg-background border border-slate-300 px-4"
        onChange={setCountry}
        priorityOptions={["CO", "BR", "AR", "VE", "US"]}
      />
    </div>
  );
}

export default CountryInputView;
