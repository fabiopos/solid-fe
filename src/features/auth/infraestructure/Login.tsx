"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginInput, loginSchema } from "@/features/auth/domain/login.schema";
import { LoginForm } from "@/components/login/form/form";
import { SolidAuth } from "../application/SolidAuth";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/context/AuthCtx";

export function Login() {
  const router = useRouter();
  const { fetchTeams, session } = useAuthStore((state) => state);
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginInput) {
    const response = await SolidAuth.loginWithCredentials(values);
    if (response?.ok) {
      await fetchTeams(session?.user.access_token ?? "");
      router.push("/");
    }
  }

  return <LoginForm onSubmit={onSubmit} form={form} />;
}
