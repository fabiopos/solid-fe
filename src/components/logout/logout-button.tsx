"use client";
import { useCallback } from "react";
import { Button } from "../ui/button";
import { SolidAuth } from "@/features/auth/application/SolidAuth";
import { useSession } from "next-auth/react";
import { navigationMenuTriggerStyle } from "../ui/navigation-menu";

export default function LogoutButton() {
  const { status } = useSession();

  const handleSubmit = useCallback(() => {
    SolidAuth.logout();
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
