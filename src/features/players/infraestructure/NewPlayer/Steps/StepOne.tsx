"use client";
import FirstNameInput from "../Inputs/FirstNameInput";
import LastNameInput from "../Inputs/LastNameInput";
import DocumentTypeInput from "../Inputs/DocumentTypeInput";
import DocumentNumberInput from "../Inputs/DocumentNumberInput";
import BirthDateInput from "../Inputs/BirthDateInput";
import EmailInput from "../Inputs/EmailInput";
import CountryInput from "../Inputs/CountryInput";
import RegionInput from "../Inputs/RegionInput";
import PhoneNumberInput from "../Inputs/PhoneNumberInput";
import PlayerAvatarInput from "../Inputs/PlayerAvatarInput";

function StepOne() {
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <PlayerAvatarInput />
        <div />
        <FirstNameInput />
        <LastNameInput />
        <DocumentTypeInput />
        <DocumentNumberInput />
        <EmailInput />
        <BirthDateInput />
        <CountryInput />
        <RegionInput />
        <PhoneNumberInput />
      </div>
    </div>
  );
}

export default StepOne;
