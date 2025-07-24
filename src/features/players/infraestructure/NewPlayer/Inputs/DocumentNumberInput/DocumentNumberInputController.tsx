import { useNewPlayerStore } from "@/context/NewPlayerCtx";
import DocumentNumberInputView from "./DocumentNumberInput";

function DocumentNumberInputController() {
  const { documentNumber, setDocumentNumber } = useNewPlayerStore(
    (state) => state
  );
  return (
    <DocumentNumberInputView
      documentNumber={documentNumber}
      setDocumentNumber={setDocumentNumber}
    />
  );
}

export default DocumentNumberInputController;
