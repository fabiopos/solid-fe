import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNewPlayerStore } from "@/context/NewPlayerCtx";
import { DocumentType } from "@/shared/enums/playerEnums";

function DocumentTypeInput() {
  const { documentType, setDocumentType } = useNewPlayerStore((state) => state);
  return (
    <div>
      <Label className="dark:text-slate-800 font-bold mb-2">
        Document Type
      </Label>
      <Select onValueChange={setDocumentType} value={documentType}>
        <SelectTrigger className="bg-white border border-slate-300 px-4">
          <SelectValue placeholder="Select a document type" />
        </SelectTrigger>
        <SelectContent className="bg-white border border-slate-300 text-slate-800">
          <SelectGroup>
            <SelectItem value={DocumentType.CC}>
              Cedula de Ciudadania
            </SelectItem>
            <SelectItem value={DocumentType.PP}>Pasaporte</SelectItem>
            <SelectItem value={DocumentType.CE}>
              Cedula de Extrajeria
            </SelectItem>
            <SelectItem value={DocumentType.TI}>
              Tarjeta de Identidad
            </SelectItem>
            <SelectItem value={DocumentType.OTHER}>Otro</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default DocumentTypeInput;
