import FavPositionSelectController from "../../Inputs/FavPositionSelect/FavPositionSelectController";
import HealthProviderInputController from "../../Inputs/HealthProviderInput/HealthProviderInputController";
import HeightInputController from "../../Inputs/HeightInput/HeightInputController";
import NameShirtController from "../../Inputs/NameOnShirtInput/NameShirtController";
import NumberOnShirtInputController from "../../Inputs/NumberOnShirtInput/NumberOnShirtInputController";
import RiskInsuranceInputController from "../../Inputs/RiskInsuranceInput/RiskInsuranceInputController";
import ShirtSizeController from "../../Inputs/ShirtSizeInput/ShirtSizeController";
import WeightInputController from "../../Inputs/WeightInput/WeightInputController";
import StepTwoView from "./StepTwoView";

function StepTwoController() {
  return (
    <StepTwoView
      numberOnShirtInput={<NumberOnShirtInputController numbersTaken={[]} />}
      nameShirtInput={<NameShirtController />}
      favPositionSelect={<FavPositionSelectController />}
      healthProviderInput={<HealthProviderInputController />}
      heightInput={<HeightInputController />}
      weightInput={<WeightInputController />}
      riskInsuranceInput={<RiskInsuranceInputController />} // Placeholder for the actual component
      sizeShirtInput={<ShirtSizeController />} // Placeholder for the actual component
    />
  );
}

export default StepTwoController;
