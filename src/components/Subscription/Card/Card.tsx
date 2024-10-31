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
import { useRouter } from "next/navigation";
import { useCallback } from "react";

interface SubscriptionCardProps {
  planId: string;
  description: string;
  content: string;
  buttonLabel: string;
}

export default function SubscriptionCard(props: SubscriptionCardProps) {
  const router = useRouter();
  const onSuscribe = useCallback(
    (planId: string) => {
      router.push(`/subscription/start/${planId}`);
    },
    [router]
  );
  return (
    <Card>
      <CardHeader>
        <CardTitle>{props.planId}</CardTitle>
        <CardDescription>{props.description}</CardDescription>
      </CardHeader>
      <CardContent>{props.content}</CardContent>
      <CardFooter>
        <Button onClick={() => onSuscribe(props.planId.toLowerCase())}>
          {props.buttonLabel}
        </Button>
      </CardFooter>
    </Card>
  );
}
