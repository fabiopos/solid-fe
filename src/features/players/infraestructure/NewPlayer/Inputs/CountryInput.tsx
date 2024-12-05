import CountrySelect from "@/components/ui/country-select";
import { Label } from "@/components/ui/label";
import { useNewPlayerStore } from "@/context/NewPlayerCtx";

function CountryInput() {
  const { setCountry } = useNewPlayerStore((state) => state);
  return (
    <div>
      <Label className="dark:text-slate-800 font-bold">Origin Country</Label>
      <CountrySelect
        className="bg-white border border-slate-300 px-4"
        onChange={setCountry}
        priorityOptions={["CO", "BR", "AR", "VE", "US"]}
        
      />
    </div>
  );
}

export default CountryInput;
