"use client";
import { useSolidStore } from "@/providers/store.provider";
import NewPlayerView from "../NewPlayer/NewPlayerView";
import CATButtonsController from "./CATButtons/CATButtonsController";
import StepOneController from "./StepOne/StepOneController";
import StepTwoController from "./StepTwo/StepTwoController";
import StepThreeController from "./StepThree/StepThreeController";

function NewPlayerInviteController() {
  const { step } = useSolidStore((state) => state);

  return (
    <NewPlayerView
      step={step}
      catButtons={<CATButtonsController />}
      stepOne={<StepOneController />}
      stepTwo={<StepTwoController />}
      stepThree={<StepThreeController />}
    />
  );
}

export default NewPlayerInviteController;
