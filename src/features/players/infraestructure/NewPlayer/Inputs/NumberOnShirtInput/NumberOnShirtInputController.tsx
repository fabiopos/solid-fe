"use client";
import { useNewPlayerStore } from "@/context/NewPlayerCtx";
import NumberOnShirtInputView from "./NumberOnShirtInputView";
import { useMemo } from "react";

interface NumberOnShirtInputControllerProps {
  numbersTaken: number[];
}

function NumberOnShirtInputController({
  numbersTaken,
}: NumberOnShirtInputControllerProps) {
  const { numberOnShirt, setNumberOnShirt } = useNewPlayerStore(
    (state) => state
  );

  const numbersAllowed = useMemo(() => {
    const numbers = [];
    for (let index = 1; index < 100; index++) {
      numbers.push(index);
    }
    return numbers;
  }, []);

  return (
    <NumberOnShirtInputView
      numberOnShirt={numberOnShirt}
      numbersAllowed={numbersAllowed}
      numbersTaken={numbersTaken}
      setNumberOnShirt={setNumberOnShirt}
    />
  );
}

export default NumberOnShirtInputController;
