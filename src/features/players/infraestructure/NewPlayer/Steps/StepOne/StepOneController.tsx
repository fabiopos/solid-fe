import StepOneView from "./StepOneView";
import PlayerAvatarController from "../../Inputs/PlayerAvatar/PlayerAvatarController";
import FirstNameInputController from "../../Inputs/FirstNameInput/FirstNameInputController";
import LastNameInputController from "../../Inputs/LastNameInput/LastNameInputController";
import BirthDateInputController from "../../Inputs/BirthDateInput/BirthDateInputController";
import CountryInputController from "../../Inputs/CountryInput/CountryInputController";
import DocumentNumberInputController from "../../Inputs/DocumentNumberInput/DocumentNumberInputController";
import DocumentTypeInputController from "../../Inputs/DocumentTypeInput/DocumentTypeInputController";
import EmailInputController from "../../Inputs/EmailInput/EmailInputController";
import RegionInputController from "../../Inputs/RegionInput/RegionInputController";
import PhoneNumberInputController from "../../Inputs/PhoneNumberInput/PhoneNumberInputController";

function StepOneController() {
  return (
    <StepOneView
      playerAvatarInput={<PlayerAvatarController />}
      firstNameInput={<FirstNameInputController />}
      lastNameInput={<LastNameInputController />}
      birthDateInput={<BirthDateInputController />}
      countryInput={<CountryInputController />}
      documentNumberInput={<DocumentNumberInputController />}
      documentTypeInput={<DocumentTypeInputController />}
      emailInput={<EmailInputController />}
      regionInput={<RegionInputController />}
      phoneNumberInput={<PhoneNumberInputController />}
    />
  );
}

export default StepOneController;
