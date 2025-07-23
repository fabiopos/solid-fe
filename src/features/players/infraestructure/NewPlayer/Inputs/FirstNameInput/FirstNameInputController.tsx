import FirstNameInputView from "./FirstNameInputView";
import { useNewPlayerStore } from "@/context/NewPlayerCtx";

function FirstNameInputController() {
  const { firstName, setFirstName } = useNewPlayerStore((state) => state);
  return (
    <FirstNameInputView firstName={firstName} setFirstName={setFirstName} />
  );
}

export default FirstNameInputController;
