import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,  
  SelectTrigger,
  SelectValue,
} from "./select";
import { DocumentType } from "@/shared/enums/playerEnums";

interface DocumentTypeInputProps {
  setDocumentType: (docType: string) => void;
  documentType: string | null;
}
function DocumentTypeInput({
  documentType,
  setDocumentType,
}: DocumentTypeInputProps) {
  return (
    <Select onValueChange={setDocumentType} value={documentType ?? ""}>
      <SelectTrigger className="bg-white border border-slate-300 px-4">
        <SelectValue placeholder="Select a document type" />
      </SelectTrigger>
      <SelectContent className="bg-white border border-slate-300 text-slate-800">
        <SelectGroup>
          <SelectItem value={DocumentType.CC}>Cedula de Ciudadania</SelectItem>
          <SelectItem value={DocumentType.PP}>Pasaporte</SelectItem>
          <SelectItem value={DocumentType.CE}>Cedula de Extrajeria</SelectItem>
          <SelectItem value={DocumentType.TI}>Tarjeta de Identidad</SelectItem>
          <SelectItem value={DocumentType.OTHER}>Otro</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default DocumentTypeInput;
