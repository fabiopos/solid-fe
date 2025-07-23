import CATButtonsView from "../../NewPlayer/Actions/CATButtonsView";
import { useSolidStore } from "@/providers/store.provider";
import { selectCanContinuePlayerInvite } from "@/stores/selectors";
import { useCallback } from "react";

function CATButtonsController() {
  const { setNextStep, setPrevStep, step, createNewPlayerStatus } =
    useSolidStore((state) => state);
  const canContinue = useSolidStore(selectCanContinuePlayerInvite);

  // TODO: create action to create player
  const handleCreatePlayer = useCallback(() => {}, []);
  return (
    <CATButtonsView
      canContinue={canContinue}
      createPlayerStatus={createNewPlayerStatus}
      handleCreatePlayer={handleCreatePlayer}
      nextStep={setNextStep}
      prevStep={setPrevStep}
      step={step}
    />
  );
}

export default CATButtonsController;
