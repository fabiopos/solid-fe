"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LastNameInputViewProps {
  lastName: string;
  setLastName: (name: string) => void;
}

function LastNameInputView({ lastName, setLastName }: LastNameInputViewProps) {
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

export default LastNameInputView;
