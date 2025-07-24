import { useNewPlayerStore } from "@/context/NewPlayerCtx";
import HeightInputView from "./HeightInputView";

function HeightInputController() {
  const { height, setHeight, isValidHeight } = useNewPlayerStore(
    (state) => state
  );
  return (
    <HeightInputView
      height={height}
      setHeight={setHeight}
      isValidHeight={isValidHeight}
    />
  );
}

export default HeightInputController;
