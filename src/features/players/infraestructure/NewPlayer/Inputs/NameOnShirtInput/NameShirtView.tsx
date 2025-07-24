"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface NameShirtInputViewProps {
  nameOnShirt: string;
  setNameOnShirt: (value: string) => void;
}
function NameShirtInputView({
  nameOnShirt,
  setNameOnShirt,
}: NameShirtInputViewProps) {
  return (
    <div>
      <Label className="dark:text-slate-800 font-bold">Name on Shirt</Label>
      <Input
        placeholder="JAMES"
        className="bg-background border-slate-300"
        maxLength={12}
        value={nameOnShirt}
        onChange={(e) => setNameOnShirt(e.target.value)}
      />
    </div>
  );
}

export default NameShirtInputView;
