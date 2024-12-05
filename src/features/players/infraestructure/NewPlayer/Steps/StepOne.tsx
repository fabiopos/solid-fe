"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FirstNameInput from "../Inputs/FirstNameInput";
import LastNameInput from "../Inputs/LastNameInput";
import DocumentTypeInput from "../Inputs/DocumentTypeInput";
import DocumentNumberInput from "../Inputs/DocumentNumberInput";
import BirthDateInput from "../Inputs/BirthDateInput";
import EmailInput from "../Inputs/EmailInput";
import CountryInput from "../Inputs/CountryInput";
import RegionInput from "../Inputs/RegionInput";
import PhoneNumberInput from "../Inputs/PhoneNumberInput";

function StepOne() {
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
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
