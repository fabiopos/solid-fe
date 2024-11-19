"use client";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export default function LoginButton() {
  const router = useRouter();
  const { status } = useSession();

  const handleSubmit = useCallback(() => {
    router.push("/login");
  }, [router]);

  if (status === "unauthenticated")
    return (
      <Button onClick={handleSubmit} type="submit">
        Login
      </Button>
    );
  return <></>;
}
