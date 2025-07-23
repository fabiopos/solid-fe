import { useCallback, useEffect, useMemo } from "react";
import CATButtonsView from "./CATButtonsView";
import { format } from "date-fns";
import { useNewPlayerStore } from "@/context/NewPlayerCtx";
import { useTeamId } from "@/hooks/use-team-id";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";

function CATButtonsController() {
  const teamId = useTeamId();
  const { data } = useSession();
  const { toast } = useToast();

  const {
    prevStep,
    nextStep,
    postPlayer,
    step,
    firstName,
    lastName,
    documentType,
    documentNumber,
    email,
    birthDate,
    country,
    city,
    phone,
    isValidEmail,
    nameOnShirt,
    numberOnShirt,
    shirtSize,
    favPosition,
    height,
    weight,
    healthProvider,
    riskInsurance,
    createPlayerStatus,
  } = useNewPlayerStore((state) => state);

  const handleCreatePlayer = useCallback(async () => {
    if (!teamId) return;
    await postPlayer(teamId, data?.user.access_token ?? "");
  }, [data?.user.access_token, postPlayer, teamId]);

  useEffect(() => {
    if (createPlayerStatus === "DONE") {
      toast({
        title: `Player successfuly created: ${firstName} ${lastName} `,
        description: format(new Date(), "PPP"),
      });
      setTimeout(() => {
        window.location.replace(window.location.origin + "/players");
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createPlayerStatus]);

  const firstStepData = useMemo(() => {
    return {
      firstName,
      lastName,
      documentType,
      documentNumber,
      email,
      birthDate,
      country,
      city,
      phone,
    };
  }, [
    firstName,
    lastName,
    documentType,
    documentNumber,
    email,
    birthDate,
    country,
    city,
    phone,
  ]);

  const secondStepData = useMemo(() => {
    return {
      nameOnShirt,
      numberOnShirt,
      shirtSize,
      favPosition,
      height,
      weight,
      healthProvider,
      riskInsurance,
    };
  }, [
    nameOnShirt,
    numberOnShirt,
    shirtSize,
    favPosition,
    height,
    weight,
    healthProvider,
    riskInsurance,
  ]);

  const isValidFirstStep = useMemo(() => {
    return (
      firstStepData.birthDate &&
      firstStepData.city &&
      firstStepData.country &&
      firstStepData.country &&
      firstStepData.documentNumber &&
      firstStepData.documentType &&
      firstStepData.email &&
      firstStepData.firstName &&
      firstStepData.lastName &&
      firstStepData.phone &&
      isValidEmail
    );
  }, [firstStepData, isValidEmail]);

  const isValidSecondStep = useMemo(() => {
    return (
      secondStepData.favPosition &&
      secondStepData.healthProvider &&
      secondStepData.height &&
      secondStepData.nameOnShirt &&
      secondStepData.numberOnShirt &&
      secondStepData.riskInsurance &&
      secondStepData.shirtSize &&
      secondStepData.weight
    );
  }, [secondStepData]);

  const canContinue = useMemo(() => {
    switch (step) {
      case 1:
        return !!isValidFirstStep;
      case 2:
        return !!isValidSecondStep;
      case 3:
        return !!isValidFirstStep && !!!isValidSecondStep;
      default:
        return true;
    }
  }, [step, isValidFirstStep, isValidSecondStep]);
  return (
    <CATButtonsView
      canContinue={canContinue}
      createPlayerStatus={createPlayerStatus}
      handleCreatePlayer={handleCreatePlayer}
      nextStep={nextStep}
      prevStep={prevStep}
      step={step}
    />
  );
}

export default CATButtonsController;
