import { StringValidation } from "zod";

export class ErrorResponse extends Error {
  constructor(message?: string) {
    super(message);
  }
}

export type Team = {
  id: string;
  name: string;
  active: boolean;
  hasSubscription: boolean;
  createdAt: Date;
  primaryColor: string | null;
  secondaryColor: string | null;
  logoUrl: string | null;
  shieldUrl: string | null;
  _tag: "FulfilledTeam";
};

export interface AccountData {
  teams: Team[];
  selectedTeamId: string | null;
}

export type RequestStatus = "IDLE" | "IN_PROGRESS" | "DONE" | "ERROR";
