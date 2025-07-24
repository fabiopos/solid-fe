interface StepTwoViewProps {
  nameShirtInput: React.ReactNode;
  numberOnShirtInput: React.ReactNode;
  sizeShirtInput: React.ReactNode;
  favPositionSelect: React.ReactNode;
  heightInput: React.ReactNode;
  weightInput: React.ReactNode;
  healthProviderInput: React.ReactNode;
  riskInsuranceInput: React.ReactNode;
}

function StepTwoView({
  nameShirtInput,
  numberOnShirtInput,
  sizeShirtInput,
  favPositionSelect,
  heightInput,
  weightInput,
  healthProviderInput,
  riskInsuranceInput,
}: StepTwoViewProps) {
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {nameShirtInput}
        {numberOnShirtInput}
        {sizeShirtInput}
        {favPositionSelect}
        {heightInput}
        {weightInput}
        {healthProviderInput}
        {riskInsuranceInput}
      </div>
      <br />
      <br />
    </div>
  );
}

export default StepTwoView;
