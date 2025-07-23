"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface NewPlayerViewProps {
  step: number;
  stepOne: React.ReactNode;
  stepTwo: React.ReactNode;
  stepThree: React.ReactNode;
  catButtons: React.ReactNode;
}

function NewPlayerView({
  step,
  stepOne,
  stepThree,
  stepTwo,
  catButtons,
}: NewPlayerViewProps) {
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
          {stepOne && stepOne}
        </div>

        <div
          className={cn(
            "transition-all opacity-0 duration-300 animate-slideinright hidden delay-0 ease-in-out",
            step === 2 && "opacity-100 block"
          )}
        >
          {stepTwo && stepTwo}
        </div>

        <div
          className={cn(
            "transition-all opacity-0 duration-300 animate-slideinright hidden delay-0 ease-in-out",
            step === 3 && "opacity-100 block"
          )}
        >
          {stepThree && stepThree}
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
        <div className="flex gap-5 justify-end">{catButtons}</div>
      </CardFooter>
    </Card>
  );
}

export default NewPlayerView;
