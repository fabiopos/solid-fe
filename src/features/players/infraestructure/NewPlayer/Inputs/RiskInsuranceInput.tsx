"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNewPlayerStore } from "@/context/NewPlayerCtx";

function RiskInsuranceInput() {
  const { riskInsurance, setRiskInsurance } = useNewPlayerStore((state) => state);
  return (
    <div>
      <Label className="dark:text-slate-800 font-bold">Risk Insurance Provider</Label>
      <Input
        placeholder="Sura"
        className="bg-white border-slate-300"
        maxLength={20}
        value={riskInsurance}
        onChange={(e) => setRiskInsurance(e.target.value)}
      />
    </div>
  );
}

export default RiskInsuranceInput;