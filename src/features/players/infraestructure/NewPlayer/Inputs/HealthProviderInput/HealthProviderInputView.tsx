"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface HealthProviderInputViewProps {
  healthProvider: string;
  setHealthProvider: (value: string) => void;
}

function HealthProviderInputView({
  healthProvider,
  setHealthProvider,
}: HealthProviderInputViewProps) {
  return (
    <div>
      <Label className="dark:text-slate-800 font-bold">Health Provider</Label>
      <Input
        placeholder="Famisanar"
        className="bg-background border-slate-300"
        maxLength={20}
        value={healthProvider}
        onChange={(e) => setHealthProvider(e.target.value)}
      />
    </div>
  );
}

export default HealthProviderInputView;
