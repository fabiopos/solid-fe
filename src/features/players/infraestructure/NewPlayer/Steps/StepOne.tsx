"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FirstNameInput from "../Inputs/FirstNameInput";
import LastNameInput from "../Inputs/LastNameInput";
import DocumentTypeInput from "../Inputs/DocumentTypeInput";
import DocumentNumberInput from "../Inputs/DocumentNumberInput";
import BirthDateInput from "../Inputs/BirthDateInput";
import EmailInput from "../Inputs/EmailInput";

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
      </div>      
    </div>
  );
}

export default StepOne;
