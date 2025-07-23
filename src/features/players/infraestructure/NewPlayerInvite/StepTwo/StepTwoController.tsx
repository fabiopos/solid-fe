import { useSolidStore } from "@/providers/store.provider";
import FavPositionSelectView from "../../NewPlayer/Inputs/FavPositionSelect/FavPositionSelectView";
import StepTwoView from "../../NewPlayer/Steps/StepTwo/StepTwoView";
import { selectNewPlayerInvite } from "@/stores/selectors";
import HeightInputView from "../../NewPlayer/Inputs/HeightInput/HeightInputView";
import NameShirtInputView from "../../NewPlayer/Inputs/NameOnShirtInput/NameShirtView";
import NumberOnShirtInputView from "../../NewPlayer/Inputs/NumberOnShirtInput/NumberOnShirtInputView";
import HealthProviderInputView from "../../NewPlayer/Inputs/HealthProviderInput/HealthProviderInputView";
import RiskInsuranceInputView from "../../NewPlayer/Inputs/RiskInsuranceInput/RiskInsuranceInputView";
import ShirtSizeView from "../../NewPlayer/Inputs/ShirtSizeInput/ShirtSizeInputView";
import WeightInputView from "../../NewPlayer/Inputs/WeightInput/WeightInputView";

function StepTwoController() {
  const setNewPlayer = useSolidStore((state) => state.setNewPlayer);
  const newPlayer = useSolidStore(selectNewPlayerInvite);

  const favPositionSelect = (
    <FavPositionSelectView
      favPosition={newPlayer?.favPositionId ?? ""}
      setFavFieldPosition={(favPositionId) => setNewPlayer({ favPositionId })}
    />
  );

  const heightProviderInput = (
    <HeightInputView
      height={newPlayer?.height ?? ""}
      setHeight={(height) => setNewPlayer({ height })}
      isValidHeight={true}
    />
  );

  const nameShirtInput = (
    <NameShirtInputView
      nameOnShirt={newPlayer?.nameOnShirt ?? ""}
      setNameOnShirt={(nameOnShirt) => setNewPlayer({ nameOnShirt })}
    />
  );

  const numberOnShirtInput = (
    <NumberOnShirtInputView
      numberOnShirt={newPlayer?.shirtNumber}
      numbersAllowed={[1, 2, 3, 4, 5, 6]}
      numbersTaken={[1, 2, 3]}
      setNumberOnShirt={(shirtNumber) => setNewPlayer({ shirtNumber })}
    />
  );

  const healthProviderInput = (
    <HealthProviderInputView
      healthProvider={newPlayer?.healthProvider ?? ""}
      setHealthProvider={(healthProvider) => setNewPlayer({ healthProvider })}
    />
  );

  const riskInsuranceInput = (
    <RiskInsuranceInputView
      riskInsurance={newPlayer?.riskInsurance ?? ""}
      setRiskInsurance={(riskInsurance) => setNewPlayer({ riskInsurance })}
    />
  );

  const shirtSizeInput = (
    <ShirtSizeView
      setShirtSize={(shirtSize) => setNewPlayer({ shirtSize })}
      shirtSize={newPlayer?.shirtSize ?? ""}
    />
  );

  const weightInput = (
    <WeightInputView
      isValidWeight={true}
      setWeight={(weight) => setNewPlayer({ weight })}
      weight={newPlayer?.weight ?? ""}
    />
  );
  return (
    <StepTwoView
      favPositionSelect={favPositionSelect}
      healthProviderInput={healthProviderInput}
      heightInput={heightProviderInput}
      nameShirtInput={nameShirtInput}
      numberOnShirtInput={numberOnShirtInput}
      riskInsuranceInput={riskInsuranceInput}
      sizeShirtInput={shirtSizeInput}
      weightInput={weightInput}
    />
  );
}

export default StepTwoController;
