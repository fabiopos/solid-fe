import { useSolidStore } from "@/providers/store.provider";
import FavPositionSelectView from "../../NewPlayer/Inputs/FavPositionSelect/FavPositionSelectView";
import StepTwoView from "../../NewPlayer/Steps/StepTwo/StepTwoView";
import {
  selectInviteNumbersTaken,
  selectNewPlayerInvite,
} from "@/stores/selectors";
import HeightInputView from "../../NewPlayer/Inputs/HeightInput/HeightInputView";
import NameShirtInputView from "../../NewPlayer/Inputs/NameOnShirtInput/NameShirtView";
import NumberOnShirtInputView from "../../NewPlayer/Inputs/NumberOnShirtInput/NumberOnShirtInputView";
import HealthProviderInputView from "../../NewPlayer/Inputs/HealthProviderInput/HealthProviderInputView";
import RiskInsuranceInputView from "../../NewPlayer/Inputs/RiskInsuranceInput/RiskInsuranceInputView";
import ShirtSizeView from "../../NewPlayer/Inputs/ShirtSizeInput/ShirtSizeInputView";
import WeightInputView from "../../NewPlayer/Inputs/WeightInput/WeightInputView";
import * as R from "rambdax";
import { ShirtSize } from "@/types/types.common";

function StepTwoController() {
  const setNewPlayer = useSolidStore((state) => state.setNewPlayer);
  const newPlayer = useSolidStore(selectNewPlayerInvite);
  const numbersTaken = useSolidStore(selectInviteNumbersTaken);

  const favPositionSelect = (
    <FavPositionSelectView
      favPosition={newPlayer?.favPositionId ?? ""}
      setFavFieldPosition={(favPositionId) => setNewPlayer({ favPositionId })}
    />
  );

  const heightProviderInput = (
    <HeightInputView
      height={newPlayer?.height ? String(newPlayer.height) : ""}
      setHeight={(height) => setNewPlayer({ height: Number(height) })}
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
      numberOnShirt={newPlayer?.shirtNumber?.toString() ?? ""}
      numbersAllowed={R.range(1, 99)}
      numbersTaken={numbersTaken.map((x) => x.shirtNumber!)}
      setNumberOnShirt={(shirtNumber) =>
        setNewPlayer({ shirtNumber: Number(shirtNumber) })
      }
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
      setShirtSize={(shirtSize) =>
        setNewPlayer({ shirtSize: shirtSize as ShirtSize })
      }
      shirtSize={newPlayer?.shirtSize ?? ""}
    />
  );

  const weightInput = (
    <WeightInputView
      isValidWeight={true}
      setWeight={(weight) => setNewPlayer({ weight: Number(weight) })}
      weight={newPlayer?.weight?.toString() ?? ""}
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
