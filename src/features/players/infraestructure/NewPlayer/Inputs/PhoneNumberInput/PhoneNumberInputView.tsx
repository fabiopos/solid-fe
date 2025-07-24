import { Label } from "@/components/ui/label";
import { PhoneInput } from "@/components/ui/phone-input";

interface PhoneNumberInputViewProps {
  phone: string;
  setPhone: (phone: string) => void;
}
function PhoneNumberInputView({ phone, setPhone }: PhoneNumberInputViewProps) {
  return (
    <div>
      <Label className="dark:text-slate-800 font-bold">Phone Number</Label>
      <PhoneInput value={phone} onChange={setPhone} />
    </div>
  );
}

export default PhoneNumberInputView;
