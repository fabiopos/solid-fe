"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FirstNameInputViewProps {
  firstName: string;
  setFirstName: (name: string) => void;
}
function FirstNameInputView({
  firstName,
  setFirstName,
}: FirstNameInputViewProps) {
  return (
    <div>
      <Label className="dark:text-slate-800 font-bold">First Name</Label>
      <Input
        placeholder="James David"
        className="bg-background border-slate-300"
        maxLength={18}
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
    </div>
  );
}

export default FirstNameInputView;
