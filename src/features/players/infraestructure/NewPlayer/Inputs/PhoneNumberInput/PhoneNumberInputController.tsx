import { useNewPlayerStore } from "@/context/NewPlayerCtx";
import PhoneNumberInputView from "./PhoneNumberInputView";

function PhoneNumberInputController() {
  const { phone, setPhone } = useNewPlayerStore((state) => state);
  return <PhoneNumberInputView phone={phone} setPhone={setPhone} />;
}

export default PhoneNumberInputController;
