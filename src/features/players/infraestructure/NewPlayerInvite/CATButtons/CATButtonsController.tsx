import React from "react";
import CATButtonsView from "../../NewPlayer/Actions/CATButtonsView";
import { useSolidStore } from "@/providers/store.provider";
import { selectCanContinuePlayerInvite } from "@/stores/selectors";

function CATButtonsController() {
  const { setNextStep, setPrevStep, step, createNewPlayerStatus } =
    useSolidStore((state) => state);
  const canContinue = useSolidStore(selectCanContinuePlayerInvite);
  return (
    <CATButtonsView
      canContinue={canContinue}
      createPlayerStatus={createNewPlayerStatus}
      handleCreatePlayer={() => {}}
      nextStep={setNextStep}
      prevStep={setPrevStep}
      step={step}
    />
  );
}

export default CATButtonsController;
