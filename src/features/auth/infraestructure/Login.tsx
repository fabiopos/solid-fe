"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginInput, loginSchema } from "@/features/auth/domain/login.schema";
import { LoginForm } from "@/components/login/form/LoginForm";
import { SolidAuth } from "../application/auth";
import { useRouter } from "next/navigation";

export function Login() {
  const router = useRouter();
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: LoginInput) {
    SolidAuth.loginWithCredentials(values).then((response) => {
      if (response?.ok) router.push("/");
    });
  }

  return <LoginForm onSubmit={onSubmit} form={form} />;
}
