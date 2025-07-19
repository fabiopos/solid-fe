"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginInput, loginSchema } from "@/features/auth/domain/login.schema";
import { LoginForm } from "@/components/login/form/form";
import { SolidAuth } from "../application/SolidAuth";
import { Effect, pipe } from "effect";
import { useToast } from "@/hooks/use-toast";

export function Login() {
  const { toast } = useToast();
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginInput) {
    const loginExecutor = pipe(
      SolidAuth.loginWithCredentials(values),
      Effect.mapBoth({
        onSuccess: (response) => Effect.succeed(response),
        onFailure: (_) => {
          toast({
            title: "Login failed",
            description: "Please check your credentials and try again.",
            variant: "destructive",
          });
        },
      }),
      Effect.tap(
        () => (window.location.href = `${window.location.origin}/dashboard`)
      )
    );

    Effect.runPromise(loginExecutor);
  }

  return <LoginForm onSubmit={onSubmit} form={form} />;
}
