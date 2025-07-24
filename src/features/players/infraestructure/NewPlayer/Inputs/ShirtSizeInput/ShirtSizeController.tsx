import { useNewPlayerStore } from "@/context/NewPlayerCtx";
import ShirtSizeView from "./ShirtSizeInputView";

function ShirtSizeController() {
  const { shirtSize, setShirtSize } = useNewPlayerStore((state) => state);
  return <ShirtSizeView setShirtSize={setShirtSize} shirtSize={shirtSize} />;
}

export default ShirtSizeController;
