import { useNewPlayerStore } from "@/context/NewPlayerCtx";
import LastNameInputView from "./LastNameInput";

function LastNameInputController() {
  const { lastName, setLastName } = useNewPlayerStore((state) => state);
  return <LastNameInputView lastName={lastName} setLastName={setLastName} />;
}

export default LastNameInputController;
