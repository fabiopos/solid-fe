"use client";
import { useNewPlayerStore } from "@/context/NewPlayerCtx";
import NewPlayerView from "./NewPlayerView";
import StepOneController from "./Steps/StepOne/StepOneController";
import StepThreeController from "./Steps/StepThree/StepThreeController";
import StepTwoController from "./Steps/StepTwo/StepTwoController";
import CATButtonsController from "./Actions/CATButtonsController";

function NewPlayerController() {
  const { step } = useNewPlayerStore((state) => state);

  return (
    <NewPlayerView
      step={step}
      stepOne={<StepOneController />}
      stepTwo={<StepTwoController />}
      stepThree={<StepThreeController />}
      catButtons={<CATButtonsController />}
    />
  );
}

export default NewPlayerController;
