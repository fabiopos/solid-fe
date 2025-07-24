import { useNewPlayerStore } from "@/context/NewPlayerCtx";
import BirthDateInputView from "./BirthDateInputView";

function BirthDateInputController() {
  const { birthDate, setBirthDate } = useNewPlayerStore((state) => state);
  return (
    <BirthDateInputView birthDate={birthDate} setBirthDate={setBirthDate} />
  );
}

export default BirthDateInputController;
