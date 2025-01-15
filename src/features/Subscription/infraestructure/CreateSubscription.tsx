"use client";
import SubscriptionForm from "@/components/Subscription/Form/SubscriptionForm";
import {
  SubscriptionInput,
  subscriptionSchema,
} from "../domain/subscription.schema";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSubscriptionCreateStore } from "../domain/subscription-store-provider";
import { useEffect } from "react";

interface CreateSubscriptionProps {
  planId: string;
}

export default function CreateSubscription(props: CreateSubscriptionProps) {
  const router = useRouter();
  const { createSubscription, setInput, status, error, createdSubscription } =
    useSubscriptionCreateStore((state) => state);
  const form = useForm<SubscriptionInput>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: {
      email: "",
      password: "",
      lastName: "",
      documentNumber: "",
      documentType: "",
      firstName: "",
      teamName: "",
      policy: false,
    },
  });

  useEffect(() => {
    if (createdSubscription?.id) {
      router.push(`/players?sid=${createdSubscription.id}`);
    }
  }, [createdSubscription?.id, router]);

  function onSubmit(input: SubscriptionInput) {
    setInput(input);
    createSubscription(input);
  }
  const title = `Plan ${props.planId.toUpperCase()}`;
  return (
    <div className="space-y-5">
      <SubscriptionForm
        form={form}
        onSubmit={onSubmit}
        content={{
          title: title,
        }}
        isSubmitting={status === "IN_PROGRESS"}
        error={error}
      />
    </div>
  );
}
