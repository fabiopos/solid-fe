"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNewPlayerStore } from "@/context/NewPlayerCtx";
import { cn } from "@/lib/utils";
import StepOne from "./Steps/StepOne";
import StepTwo from "./Steps/StepTwo";
import StepThree from "./Steps/StepThree";
import { useCallback } from "react";
import { useSession } from "next-auth/react";

function NewPlayer() {
  const { data } = useSession();
  const { prevStep, nextStep, postPlayer, step } = useNewPlayerStore(
    (state) => state
  );

  const handleCreatePlayer = useCallback(() => {
    postPlayer(data?.user.access_token ?? "");
  }, [data?.user.access_token]);

  return (
    <Card className="bg-[#E2E8F0] text-slate-800 w-full">
      <CardHeader>
        <CardTitle>New Player</CardTitle>
        <CardDescription>
          We will create new account for the player, the password will be sent
          to his/her email to activate the accout.
        </CardDescription>
      </CardHeader>
      <CardContent className="min-h-[400px]">
        <div
          className={cn(
            "transition-all opacity-0 duration-300 animate-slideinright hidden delay-0 ease-in-out",
            step === 1 && "opacity-100 block"
          )}
        >
          <StepOne />
        </div>

        <div
          className={cn(
            "transition-all opacity-0 duration-300 animate-slideinright hidden delay-0 ease-in-out",
            step === 2 && "opacity-100 block"
          )}
        >
          <StepTwo />
        </div>

        <div
          className={cn(
            "transition-all opacity-0 duration-300 animate-slideinright hidden delay-0 ease-in-out",
            step === 3 && "opacity-100 block"
          )}
        >
          <StepThree />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-5">
        <div className="flex gap-2 justify-center">
          <div
            className={cn(
              "bg-cyan-500/20 h-2 w-2 rounded-full transition-colors duration-500",
              step === 1 && "bg-cyan-500"
            )}
          />
          <div
            className={cn(
              "bg-cyan-500/20 h-2 w-2 rounded-full transition-colors duration-500",
              step === 2 && "bg-cyan-500"
            )}
          />
          <div
            className={cn(
              "bg-cyan-500/20 h-2 w-2 rounded-full transition-colors duration-500",
              step === 3 && "bg-cyan-500"
            )}
          />
        </div>
        <div className="flex gap-5 justify-end">
          <Button variant="outline" onClick={prevStep} disabled={step === 1}>
            Back
          </Button>

          {step !== 3 && <Button onClick={nextStep}>Continue</Button>}

          {step === 3 && (
            <Button onClick={handleCreatePlayer} disabled={step !== 3}>
              Add this player to my team
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}

export default NewPlayer;
