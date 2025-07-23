import { useNewPlayerStore } from "@/context/NewPlayerCtx";
import CountryInputView from "./CountryInput";

function CountryInputController() {
  const { setCountry } = useNewPlayerStore((state) => state);
  return <CountryInputView setCountry={setCountry} />;
}

export default CountryInputController;
