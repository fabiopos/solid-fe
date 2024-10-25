import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string(),
});

export type LoginInput = z.infer<typeof loginSchema>;
