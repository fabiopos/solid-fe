import { Label } from "@/components/ui/label";
import { PhoneInput } from "@/components/ui/phone-input";
import { useNewPlayerStore } from "@/context/NewPlayerCtx";

function PhoneNumberInput() {
  const { phone, setPhone } = useNewPlayerStore((state) => state);
  return (
    <div>
      <Label className="dark:text-slate-800 font-bold">Phone Number</Label>
      <PhoneInput value={phone} onChange={setPhone} />
    </div>
  );
}

export default PhoneNumberInput;
