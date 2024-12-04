"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNewPlayerStore } from "@/context/NewPlayerCtx";

function EmailInput() {
  const { email, setEmail, isValidEmail } = useNewPlayerStore((state) => state);
  return (
    <div>
      <Label className="dark:text-slate-800 font-bold">Email</Label>
      <Input
        placeholder="james@rodriguez.com"
        className="bg-white border-slate-300"
        maxLength={18}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {!isValidEmail && !!email && (
        <small className="text-red-400">* This email is not valid</small>
      )}
    </div>
  );
}

export default EmailInput;
