import { useNewPlayerStore } from "@/context/NewPlayerCtx";
import RegionInputView from "./RegionInputView";

function RegionInputController() {
  const { country, setCity } = useNewPlayerStore((state) => state);
  return <RegionInputView country={country} setCity={setCity} />;
}

export default RegionInputController;
