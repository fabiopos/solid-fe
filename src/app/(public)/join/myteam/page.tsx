"use client";
// $15.3975
// $15.1925
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { PhoneInput } from "@/components/ui/phone-input";
import { validateInviteMutationOptions } from "@/core/query/team/validateInviteOptions";
import { FulfilledTeam } from "@/features/teams/domain/team.schema";
import { useMutation } from "@tanstack/react-query";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

function MyTeam() {
  const [isValidTeam, setIsValidTeam] = useState<boolean>(false);
  const [team, setTeam] = useState<FulfilledTeam | null>(null);
  const handleSuccessValidateInvite = (
    data: FulfilledTeam,
    _variables: { teamId: string },
    _ctx: unknown
  ) => {
    setTeam(data);
    if (data.active && data.hasSubscription) return setIsValidTeam(true);
    return setIsValidTeam(false);
  };
  const {
    isPending,
    isSuccess: isSuccessValidation,
    mutate,
    isError: isErrorValidation,
  } = useMutation(
    validateInviteMutationOptions({
      onSuccess: handleSuccessValidateInvite,
    })
  );
  const searchParams = useSearchParams();
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [isSent, setIsSent] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);

  const [error, setError] = useState<string>("");
  const [sid, setSid] = useState<string>("");
  const [teamId, setTeamId] = useState<string>("");

  useEffect(() => {
    console.log("entra");
    setTeamId(searchParams.get("tid")!);
    mutate({ teamId: searchParams.get("tid")! });
  }, [mutate, searchParams]);

  const handleCreate2FA = async () => {
    try {
      setError("");
      const { status, sid, message } = await post2fa(phone, email, teamId);
      const isSuccess = status === "pending";
      setIsSent(isSuccess);
      setSid(sid);
      if (!isSuccess) setError(message);
    } catch (error) {
      console.error("Error creating 2FA:", error);
    }
  };

  const handleVerify2FA = async () => {
    try {
      const { success } = await verify2fa(code, phone);
      setIsVerified(success);
      if (success) handleContinue();
    } catch (error) {
      console.error("Error creating 2FA:", error);
    }
  };

  const handleContinue = () => {
    // Logic to continue after verification - send sid as queryparam
    const tid = searchParams.get("tid");
    console.log("Continuing after verification", sid, tid);
    router.push(`/join/onboarding?sid=${sid}&tid=${tid}`);
  };

  const isSendCodeDisabled = useMemo(() => {
    const isValidEmail = email.trim().length > 0;
    const isValidPhone = phone.trim().length >= 10;

    return !(isValidEmail && isValidPhone && isValidTeam);
  }, [email, phone, isValidTeam]);

  if (searchParams.get("tid") === null) redirect("/");

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100/55 w-full">
      <div className="p-5 space-y-2 border max-w-[300px]">
        <h3 className="font-bold">Verify your identity</h3>
        {team && <h4>You&apos;re about join to {team.name}</h4>}
        <Input
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isSent}
        />
        <PhoneInput
          value={phone}
          onChange={setPhone}
          defaultCountry="CO"
          maxLength={10}
          disabled={isSent}
          placeholder="Phone Number"
        />
        {isSent && !isVerified && (
          <InputOTP maxLength={6} value={code} onChange={setCode}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        )}
        <div className="space-x-2">
          {!isSent && (
            <Button disabled={isSendCodeDisabled} onClick={handleCreate2FA}>
              Send code
            </Button>
          )}
          {isSent && !isVerified && (
            <Button onClick={handleVerify2FA}>Verify</Button>
          )}
          <div className="flex justify-end">
            {isVerified && <span>Please wait...</span>}
          </div>
        </div>
        {isPending && (
          <div className="text-sm text-gray-500 italic">
            Validating your team...
          </div>
        )}

        {isSuccessValidation && !isValidTeam && (
          <div className="text-sm text-red-500 italic max-w-[250px]">
            The team you was invited is not active or the subscription is
            expired.
          </div>
        )}
        {isErrorValidation && (
          <div className="text-sm text-red-500 italic">
            An error occurred while validating the team invite.
          </div>
        )}

        {error && (
          <div>
            <span className="text-red-500 text-sm italic">{error}</span>
          </div>
        )}
      </div>
      <div className="space-y-2 mt-5 px-10 max-w-[400px]">
        <p className="text-sm text-gray-500">
          Filling this form you will accept our terms and conditions and privacy
          policy.
        </p>

        <p className="text-sm text-gray-500">
          We will send you a code to your phone number, please enter it in the
          input above to verify your identity.
        </p>
      </div>
    </div>
  );
}

async function post2fa(phone: string, email: string, teamId: string) {
  const res = await fetch("http://localhost:3000/auth/2fa", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      phone,
      teamId,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to post 2FA data");
  }
  const data = await res.json();
  return data;
}

async function verify2fa(code: string, phone: string) {
  const res = await fetch("http://localhost:3000/auth/2fa/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      phone,
      code,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to verify 2FA data");
  }
  const data = await res.json();
  return data;
}

export default MyTeam;
