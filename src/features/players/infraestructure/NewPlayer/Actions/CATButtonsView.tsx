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
  completeLink?: React.ReactNode;
}
function CATButtonsView({
  canContinue,
  createPlayerStatus,
  handleCreatePlayer,
  nextStep,
  prevStep,
  step,
  completeLink,
}: CATButtonsViewProps) {
  return (
    <>
      {createPlayerStatus !== "DONE" && (
        <Button variant="outline" onClick={prevStep} disabled={step === 1}>
          Back
        </Button>
      )}
      {step !== 3 && (
        <Button onClick={nextStep} disabled={!canContinue}>
          Continue
        </Button>
      )}

      {step === 3 && createPlayerStatus !== "DONE" && (
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
      {createPlayerStatus === "ERROR" && (
        <span className="text-sm text-red-500">Error creating player</span>
      )}

      {createPlayerStatus === "DONE" && (
        <div className="flex flex-col gap-2">
          <span className="text-sm text-green-500">
            Your player has been succesfuly created
          </span>
          {completeLink}
        </div>
      )}
    </>
  );
}

export default CATButtonsView;
