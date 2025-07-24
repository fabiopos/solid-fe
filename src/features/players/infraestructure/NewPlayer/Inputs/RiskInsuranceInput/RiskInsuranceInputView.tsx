"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface RiskInsuranceInputViewProps {
  riskInsurance: string;
  setRiskInsurance: (value: string) => void;
}

function RiskInsuranceInputView({
  riskInsurance,
  setRiskInsurance,
}: RiskInsuranceInputViewProps) {
  return (
    <div>
      <Label className="dark:text-slate-800 font-bold">
        Risk Insurance Provider
      </Label>
      <Input
        placeholder="Sura"
        className="bg-background border-slate-300"
        maxLength={20}
        value={riskInsurance}
        onChange={(e) => setRiskInsurance(e.target.value)}
      />
    </div>
  );
}

export default RiskInsuranceInputView;
