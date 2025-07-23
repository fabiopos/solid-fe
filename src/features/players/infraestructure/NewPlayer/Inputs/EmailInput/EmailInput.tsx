"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EmailInputProps {
  email: string;
  setEmail: (email: string) => void;
  isValidEmail: boolean;
}
function EmailInputView({ email, isValidEmail, setEmail }: EmailInputProps) {
  return (
    <div>
      <Label className="dark:text-slate-800 font-bold">Email</Label>
      <Input
        placeholder="james@rodriguez.com"
        className="bg-background border-slate-300"
        maxLength={25}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {!isValidEmail && !!email && (
        <small className="text-red-400">* This email is not valid</small>
      )}
    </div>
  );
}

export default EmailInputView;
