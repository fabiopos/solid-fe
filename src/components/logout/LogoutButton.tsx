"use client";
import { useCallback } from "react";
import { Button } from "../ui/button";
import { SolidAuth } from "@/features/auth/application/auth";
import { useSession } from "next-auth/react";

export default function LogoutButton() {
  const { status } = useSession();

  const handleSubmit = useCallback(() => {
    SolidAuth.logout();
  }, []);

  if (status === "loading") return "";
  if (status === "unauthenticated") return null;

  return (
    <Button onClick={handleSubmit} type="submit">
      Logout
    </Button>
  );
}
