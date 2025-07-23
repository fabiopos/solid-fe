import { useNewPlayerStore } from "@/context/NewPlayerCtx";
import React from "react";
import WeightInputView from "./WeightInputView";

function WeightInputController() {
  const { weight, setWeight, isValidWeight } = useNewPlayerStore(
    (state) => state
  );
  return (
    <WeightInputView
      isValidWeight={isValidWeight}
      setWeight={setWeight}
      weight={weight}
    />
  );
}

export default WeightInputController;
