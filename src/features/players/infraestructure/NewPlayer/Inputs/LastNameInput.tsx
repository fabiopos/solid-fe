"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNewPlayerStore } from "@/context/NewPlayerCtx";

function LastNameInput() {
  const { lastName, setLastName } = useNewPlayerStore((state) => state);
  return (
    <div>
      <Label className="dark:text-slate-800 font-bold">Last Name</Label>
      <Input
        placeholder="Rodriguez Rubio"
        className="bg-background border-slate-300"
        maxLength={18}
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
    </div>
  );
}

export default LastNameInput;