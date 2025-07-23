import React from "react";
import StepOneView from "../../NewPlayer/Steps/StepOne/StepOneView";
import { useSolidStore } from "@/providers/store.provider";
import { selectNewPlayerInvite } from "@/stores/selectors";
import FirstNameInputView from "../../NewPlayer/Inputs/FirstNameInput/FirstNameInputView";
import LastNameInputView from "../../NewPlayer/Inputs/LastNameInput/LastNameInput";
import PlayerAvatarInputView from "../../NewPlayer/Inputs/PlayerAvatar/PlayerAvatarInputView";
import BirthDateInputView from "../../NewPlayer/Inputs/BirthDateInput/BirthDateInputView";
import CountryInputView from "../../NewPlayer/Inputs/CountryInput/CountryInput";
import DocumentNumberInputView from "../../NewPlayer/Inputs/DocumentNumberInput/DocumentNumberInput";
import DocumentTypeInputView from "../../NewPlayer/Inputs/DocumentTypeInput/DocumentTypeInputView";
import EmailInputView from "../../NewPlayer/Inputs/EmailInput/EmailInput";
import PhoneNumberInputView from "../../NewPlayer/Inputs/PhoneNumberInput/PhoneNumberInputView";
import RegionInputView from "../../NewPlayer/Inputs/RegionInput/RegionInputView";
import { isValidEmail } from "@/features/players/domain/player.schema";

function StepOneController() {
  const setNewPlayer = useSolidStore((state) => state.setNewPlayer);
  const newPlayer = useSolidStore(selectNewPlayerInvite);

  const firstNameInput = (
    <FirstNameInputView
      firstName={newPlayer?.firstName ?? ""}
      setFirstName={(firstName) => {
        setNewPlayer({ firstName });
      }}
    />
  );

  const lastNameInput = (
    <LastNameInputView
      lastName={newPlayer?.lastName ?? ""}
      setLastName={(lastName) => {
        setNewPlayer({ lastName });
      }}
    />
  );

  const playerAvatarInput = (
    <PlayerAvatarInputView
      avatarUrl={newPlayer?.avatarUrl ?? ""}
      setAvatarUrl={(avatarUrl) => {
        setNewPlayer({ avatarUrl });
      }}
      setAvatarFile={(avatarFile) => {
        setNewPlayer({ avatarFile });
      }}
    />
  );

  const birthDateInput = (
    <BirthDateInputView
      birthDate={newPlayer?.birthDate ?? null}
      setBirthDate={(birthDate) => {
        setNewPlayer({ birthDate });
      }}
    />
  );

  const countryInput = (
    <CountryInputView
      setCountry={(country) => {
        setNewPlayer({ country });
      }}
    />
  );

  const regionInput = (
    <RegionInputView
      setCity={(city) => {
        setNewPlayer({ city });
      }}
      country={newPlayer?.country ?? ""}
    />
  );

  const documentNumberInput = (
    <DocumentNumberInputView
      setDocumentNumber={(documentNumber) => {
        setNewPlayer({ documentNumber });
      }}
      documentNumber={newPlayer?.documentNumber ?? ""}
    />
  );

  const documentTypeInput = (
    <DocumentTypeInputView
      setDocumentType={(documentType) => {
        setNewPlayer({ documentType });
      }}
      documentType={newPlayer?.documentType ?? ""}
    />
  );

  const emailInput = (
    <EmailInputView
      setEmail={(email) => {
        setNewPlayer({ email });
      }}
      email={newPlayer?.email ?? ""}
      isValidEmail={isValidEmail.safeParse(newPlayer?.email).success}
    />
  );

  // TODO: create validation isvalidPhone
  const phoneNumberInput = (
    <PhoneNumberInputView
      setPhone={(phone) => {
        setNewPlayer({ phone });
      }}
      phone={newPlayer?.phone ?? ""}
    />
  );

  return (
    <StepOneView
      firstNameInput={firstNameInput}
      lastNameInput={lastNameInput}
      playerAvatarInput={playerAvatarInput}
      birthDateInput={birthDateInput}
      countryInput={countryInput}
      documentNumberInput={documentNumberInput}
      documentTypeInput={documentTypeInput}
      emailInput={emailInput}
      phoneNumberInput={phoneNumberInput}
      regionInput={regionInput}
    />
  );
}

export default StepOneController;
