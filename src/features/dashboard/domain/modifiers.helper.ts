import { Variant } from "@/types/types.common";
import { twMerge } from "tailwind-merge";

export const modifierCss = (variant: Variant) =>
  twMerge(
    "text-red rounded-full",
    variant === "default" && "bg-primary",
    variant === "destructive" && "bg-destructive hover:bg-destructive/50",
    variant === "secondary" && "bg-secondary",
    variant === "success" && "bg-success hover:bg-green-500/50",
    variant === "warning" && "bg-orange-500 hover:bg-orange-500/50"
  );

export const modifiersClassNames = (
  records: { key: string; variant: Variant }[]
) => {
  const modifiers = records.reduce(
    (prev, curr) => ({
      ...prev,
      [curr.key]: modifierCss(curr.variant),
    }),
    {}
  );

  return modifiers;
};

export const variantSelector: Variant[] = [
  "default" as Variant,
  "warning" as Variant,
  "success" as Variant,
  "destructive" as Variant,
  "success" as Variant,
];
