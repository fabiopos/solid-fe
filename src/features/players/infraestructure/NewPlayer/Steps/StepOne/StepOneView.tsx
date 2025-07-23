"use client";

interface StepOneViewProps {
  playerAvatarInput: React.ReactNode;
  firstNameInput: React.ReactNode;
  lastNameInput: React.ReactNode;
  documentTypeInput?: React.ReactNode;
  documentNumberInput?: React.ReactNode;
  emailInput?: React.ReactNode;
  birthDateInput?: React.ReactNode;
  countryInput?: React.ReactNode;
  regionInput?: React.ReactNode;
  phoneNumberInput?: React.ReactNode;
}
function StepOneView({
  playerAvatarInput,
  firstNameInput,
  lastNameInput,
  birthDateInput,
  countryInput,
  documentNumberInput,
  documentTypeInput,
  emailInput,
  regionInput,
  phoneNumberInput,
}: StepOneViewProps) {
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {playerAvatarInput}
        <div />
        {firstNameInput}
        {lastNameInput}
        {documentTypeInput}
        {documentNumberInput}
        {emailInput}
        {birthDateInput}
        {countryInput}
        {regionInput}
        {phoneNumberInput}
      </div>
    </div>
  );
}

export default StepOneView;
