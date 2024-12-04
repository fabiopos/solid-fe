"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNewPlayerStore } from "@/context/NewPlayerCtx";

function DocumentNumberInput() {
  const { documentNumber, setDocumentNumber } = useNewPlayerStore((state) => state);
  return (
    <div>
      <Label className="dark:text-slate-800 font-bold">Document Number</Label>
      <Input
        placeholder="100000000"
        className="bg-white border-slate-300"
        maxLength={18}
        value={documentNumber}
        onChange={(e) => setDocumentNumber(e.target.value)}
      />
    </div>
  );
}

export default DocumentNumberInput;