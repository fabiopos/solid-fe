import { useNewPlayerStore } from "@/context/NewPlayerCtx";
import RiskInsuranceInputView from "./RiskInsuranceInputView";

function RiskInsuranceInputController() {
  const { riskInsurance, setRiskInsurance } = useNewPlayerStore(
    (state) => state
  );
  return (
    <RiskInsuranceInputView
      riskInsurance={riskInsurance}
      setRiskInsurance={setRiskInsurance}
    />
  );
}

export default RiskInsuranceInputController;
