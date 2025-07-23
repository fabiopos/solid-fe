import { useNewPlayerStore } from "@/context/NewPlayerCtx";
import NameShirtInputView from "./NameShirtView";

function NameShirtController() {
  const { nameOnShirt, setNameOnShirt } = useNewPlayerStore((state) => state);
  return (
    <NameShirtInputView
      nameOnShirt={nameOnShirt}
      setNameOnShirt={setNameOnShirt}
    />
  );
}

export default NameShirtController;
