"use client";

import { Alert } from "@/components/ui/alert";
import { useNewPlayerStore } from "@/context/NewPlayerCtx";
import { useMemo } from "react";

function ValidationAlert() {
  const {
    birthDate,
    city,
    country,
    documentType,
    documentNumber,
    email,
    healthProvider,
    riskInsurance,
    favPosition,
    firstName,
    lastName,
    height,
    weight,
    nameOnShirt,
    numberOnShirt,
    phone,
    shirtSize,
  } = useNewPlayerStore((state) => state);

  const isValid = useMemo(() => {
    return (
      birthDate &&
      city &&
      country &&
      documentType &&
      documentNumber &&
      email &&
      healthProvider &&
      riskInsurance &&
      favPosition &&
      firstName &&
      lastName &&
      height &&
      weight &&
      nameOnShirt &&
      numberOnShirt &&
      phone &&
      shirtSize
    );
  }, [
    birthDate,
    city,
    country,
    documentType,
    documentNumber,
    email,
    healthProvider,
    riskInsurance,
    favPosition,
    firstName,
    lastName,
    height,
    weight,
    nameOnShirt,
    numberOnShirt,
    phone,
    shirtSize,
  ]);

  if (isValid) return null;
  return (
    <Alert variant="destructive">
      <div className="flex flex-col">
        {!firstName && (
          <small className="text-red-500">* First name is required</small>
        )}
        {!lastName && (
          <small className="text-red-500">* Last name is required</small>
        )}
        {!birthDate && (
          <small className="text-red-500">* Birth date is required</small>
        )}
        {!country && (
          <small className="text-red-500">* Origin Country is required</small>
        )}
        {!city && (
          <small className="text-red-500">* Origin Region is required</small>
        )}
        {!documentNumber && (
          <small className="text-red-500">* Document Number is required</small>
        )}
        {!documentType && (
          <small className="text-red-500">* Document Type is required</small>
        )}
        {!email && (
          <small className="text-red-500">* Email address is required</small>
        )}
        {!healthProvider && (
          <small className="text-red-500">* Health Provider is required</small>
        )}
        {!riskInsurance && (
          <small className="text-red-500">
            * Risk Insurance Provider is required
          </small>
        )}
        {!favPosition && (
          <small className="text-red-500">* Field Position is required</small>
        )}
        {!height && (
          <small className="text-red-500">* Height is required</small>
        )}
        {!weight && (
          <small className="text-red-500">* Weight is required</small>
        )}
        {!nameOnShirt && (
          <small className="text-red-500">* Name on shirt is required</small>
        )}
        {!numberOnShirt && (
          <small className="text-red-500">* Number on shirt is required</small>
        )}
        {!phone && <small className="text-red-500">* Phone is required</small>}
        {!shirtSize && (
          <small className="text-red-500">* Shirt Size is required</small>
        )}
      </div>
    </Alert>
  );
}

export default ValidationAlert;
