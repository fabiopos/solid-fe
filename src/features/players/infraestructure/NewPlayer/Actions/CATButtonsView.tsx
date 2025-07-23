"use client";
import { Button } from "@/components/ui/button";
import { RequestStatus } from "@/types/types.common";
import { Loader } from "lucide-react";

interface CATButtonsViewProps {
  step: number;
  nextStep: () => void;
  prevStep: () => void;
  canContinue: boolean;
  createPlayerStatus: RequestStatus;
  handleCreatePlayer: () => void;
}
function CATButtonsView({
  canContinue,
  createPlayerStatus,
  handleCreatePlayer,
  nextStep,
  prevStep,
  step,
}: CATButtonsViewProps) {
  return (
    <>
      <Button variant="outline" onClick={prevStep} disabled={step === 1}>
        Back
      </Button>

      {step !== 3 && (
        <Button onClick={nextStep} disabled={!canContinue}>
          Continue
        </Button>
      )}

      {step === 3 && (
        <Button
          onClick={handleCreatePlayer}
          disabled={!canContinue || createPlayerStatus === "IN_PROGRESS"}
        >
          {createPlayerStatus === "IN_PROGRESS" && (
            <Loader className="animate-spin" size={18} />
          )}
          Add this player to my team
        </Button>
      )}
    </>
  );
}

export default CATButtonsView;
