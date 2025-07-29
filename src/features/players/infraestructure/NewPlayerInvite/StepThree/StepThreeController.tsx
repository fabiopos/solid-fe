"use client";
import { useSolidStore } from "@/providers/store.provider";
import StepThreeView from "../../NewPlayer/Steps/StepThree/StepThreeView";
import { selectNewPlayerInvite } from "@/stores/selectors";

function StepThreeController() {
  const newPlayer = useSolidStore(selectNewPlayerInvite);
  return (
    <StepThreeView
      birthDate={newPlayer?.birthDate || null}
      city={newPlayer?.city ?? ""}
      country={newPlayer?.country ?? ""}
      documentNumber={newPlayer?.documentNumber ?? ""}
      documentType={newPlayer?.documentType ?? ""}
      email={newPlayer?.email ?? ""}
      firstName={newPlayer?.firstName ?? ""}
      height={`${newPlayer?.height ?? ""}`}
      lastName={newPlayer?.lastName ?? ""}
      nameOnShirt={newPlayer?.nameOnShirt ?? ""}
      phone={newPlayer?.phone ?? ""}
      shirtSize={newPlayer?.shirtSize ?? ""}
      weight={`${newPlayer?.weight ?? ""}`}
      healthProvider={newPlayer?.healthProvider ?? ""}
      riskInsurance={newPlayer?.riskInsurance ?? ""}
      favPosition={newPlayer?.favPositionId ?? ""}
      numberOnShirt={`${newPlayer?.shirtNumber ?? ""}`}
      // TODO: create validation alert
      validationAlert={<></>}
    />
  );
}

export default StepThreeController;
