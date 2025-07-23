import { useNewPlayerStore } from "@/context/NewPlayerCtx";
import StepThreeView from "./StepThreeView";

function StepThreeController() {
  const {
    birthDate,
    city,
    country,
    documentNumber,
    documentType,
    email,
    favPosition,
    firstName,
    height,
    lastName,
    nameOnShirt,
    numberOnShirt,
    phone,
    shirtSize,
    weight,
    healthProvider,
    riskInsurance,
  } = useNewPlayerStore((state) => state);
  return (
    <StepThreeView
      birthDate={birthDate}
      city={city}
      country={country}
      documentNumber={documentNumber}
      documentType={documentType}
      email={email}
      favPosition={favPosition}
      firstName={firstName}
      height={height}
      lastName={lastName}
      nameOnShirt={nameOnShirt}
      numberOnShirt={numberOnShirt}
      phone={phone}
      shirtSize={shirtSize}
      weight={weight}
      healthProvider={healthProvider}
      riskInsurance={riskInsurance}
    />
  );
}

export default StepThreeController;
