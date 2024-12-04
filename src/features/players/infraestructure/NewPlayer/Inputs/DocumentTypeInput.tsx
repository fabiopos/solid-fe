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

function DocumentTypeInput() {
  const { documentType, setDocumentType } = useNewPlayerStore((state) => state);
  return (
    <div>
      <Label className="dark:text-slate-800 font-bold mb-2">Document Type</Label>
      <Select onValueChange={setDocumentType}>
        <SelectTrigger className="bg-white border border-slate-300 px-4">
          <SelectValue placeholder="Select a document type" />
        </SelectTrigger>
        <SelectContent className="bg-white border border-slate-300 text-slate-800">
          <SelectGroup>
            <SelectItem value="CC">Cedula de Ciudadania</SelectItem>
            <SelectItem value="PT">Pasaporte</SelectItem>
            <SelectItem value="NIT">NIT</SelectItem>
            <SelectItem value="CE">Cedula de Extranjeria</SelectItem>            
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default DocumentTypeInput;