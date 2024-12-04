"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNewPlayerStore } from "@/context/NewPlayerCtx";

function FirstNameInput() {
  const { firstName, setFirstName } = useNewPlayerStore((state) => state);
  return (
    <div>
      <Label className="dark:text-slate-800 font-bold">First Name</Label>
      <Input
        placeholder="James David"
        className="bg-white border-slate-300"
        maxLength={18}
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
    </div>
  );
}

export default FirstNameInput;
