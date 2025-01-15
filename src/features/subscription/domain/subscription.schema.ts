import { z, string } from "zod";

export const subscriptionSchema = z.object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(6, "Password must be more than 6 characters"),
  firstName: string({ required_error: "First name is required" }).min(
    1,
    "First name is required"
  ),
  lastName: string({ required_error: "Last name is required" }).min(
    1,
    "Last name is required"
  ),
  documentType: string({ required_error: "Document type is required" }).min(
    1,
    "Document Type is required"
  ),
  documentNumber: string({ required_error: "Document number is required" })
    .min(3, "Document number must be more than 3 characters")
    .max(18, "Document number mus be 18 characters max"),
  teamName: string({ required_error: "Team name is required" }).min(
    3,
    "Team name must be more than 3 characters"
  ),
  policy: z.boolean(),
});

export type SubscriptionInput = z.infer<typeof subscriptionSchema>;
