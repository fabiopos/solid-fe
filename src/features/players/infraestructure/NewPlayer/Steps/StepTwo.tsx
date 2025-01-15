import NameShirtInput from "../Inputs/NameShirt";
import NumberOnShirtInput from "../Inputs/NumberOnShirtInput";
import HeightInput from "../Inputs/HeightInput";
import WeightInput from "../Inputs/WeightInput";
import HealthProviderInput from "../Inputs/HealthProviderInput";
import RiskInsuranceInput from "../Inputs/RiskInsuranceInput";
import FavPositionSelect from "../Inputs/FavPositionSelect";
import ShizeShirt from "../Inputs/SizeShirtInput";

function StepTwo() {
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <NameShirtInput />
        <NumberOnShirtInput />
        <ShizeShirt />
        <FavPositionSelect />
        <HeightInput />
        <WeightInput />
        <HealthProviderInput />
        <RiskInsuranceInput />
      </div>
      <br />
      <br />
    </div>
  );
}

export default StepTwo;
