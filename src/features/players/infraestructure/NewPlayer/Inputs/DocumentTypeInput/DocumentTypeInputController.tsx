import { useNewPlayerStore } from "@/context/NewPlayerCtx";
import DocumentTypeInputView from "./DocumentTypeInputView";

function DocumentTypeInputController() {
  const { documentType, setDocumentType } = useNewPlayerStore((state) => state);
  return (
    <DocumentTypeInputView
      documentType={documentType}
      setDocumentType={setDocumentType}
    />
  );
}

export default DocumentTypeInputController;
