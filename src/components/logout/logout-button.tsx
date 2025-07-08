"use client";
import { useCallback } from "react";
import { Button } from "../ui/button";
import { SolidAuth } from "@/features/auth/application/SolidAuth";
import { useSession } from "next-auth/react";
import { navigationMenuTriggerStyle } from "../ui/navigation-menu";
import { Effect, pipe } from "effect";

export default function LogoutButton() {
  const { status } = useSession();

  const handleSubmit = useCallback(() => {
    const logout = pipe(
      Effect.tryPromise(() => SolidAuth.logout()),
      Effect.tap(() => (window.location.href = "/"))
    );

    Effect.runPromise(logout).catch((error) => {
      console.error("Logout failed:", error);
    });
  }, []);

  if (status === "loading") return "";
  if (status === "unauthenticated") return null;

  return (
    <Button
      variant="ghost"
      className={navigationMenuTriggerStyle()}
      onClick={handleSubmit}
      type="submit"
    >
      Logout
    </Button>
  );
}
