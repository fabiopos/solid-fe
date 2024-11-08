import { PlayerStatus } from "@/types/types.common";
import { z, string, boolean, number } from "zod";

const teamSchema = z.object({
  id: string(),
  name: string(),
});

const fieldPositionSchema = z.object({
  id: string(),
  createdAt: string(),
});

const playerPositionSchema = z.object({
  id: string(),
  fieldPosition: fieldPositionSchema,
});

const favPositionSchema = z.object({
  id: string(),
  category: string().nullable(),
  name: string(),
  description: string(),
  order: number(),
});

export const playerSchema = z.object({
  id: string(),
  firstName: string(),
  lastName: string(),
  documentNumber: string(),
  documentType: string(),
  active: boolean(),
  status: z.enum([PlayerStatus.OK, PlayerStatus.INJURIED, PlayerStatus.DOWN]),
  email: string(),
  shirtSize: string().optional().nullable(),
  shirtName: string().optional().nullable(),
  shirtNumber: number().optional().nullable(),
  dominantFoot: string().optional().nullable(),
  address: string().optional().nullable(),
  avatarUrl: string().optional().nullable(),
  phone: string().optional().nullable(),
  city: string().optional().nullable(),
  country: string().optional().nullable(),
  eps: string().optional().nullable(),
  arl: string().optional().nullable(),
  weight: number().optional().nullable(),
  height: number().optional().nullable(),
  playerPositions: z.array(playerPositionSchema).optional().nullable(),
  favPosition: favPositionSchema.nullable(),
  team: teamSchema.optional().nullable(),
  _tag: string(),
});

export type PlayerType = z.infer<typeof playerSchema>;
