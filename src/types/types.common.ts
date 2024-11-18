export class ErrorResponse extends Error {
  constructor(message?: string) {
    super(message);
  }
}

export interface CustomJWT {
  email: string;
  name: string;
  subscriptionId: string;
  iat: number;
  exp: number;
}

export enum PlayerStatus {
  OK = "OK",
  INJURIED = "INJURIED",
  DOWN = "DOWN",
}

export type Team = {
  id: string;
  name: string;
  active: boolean;
  hasSubscription: boolean;
  createdAt: string;
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

export enum RoleEnum {
  ADMIN = "admin",
  USER = "user",
  COACH = "coach",
}

export enum ShirtSize {
  S = "S",
  M = "M",
  L = "L",
  XL = "XL",
  XXL = "XXL",
}

export enum DocumentType {
  CC = "CC",
  CE = "CE",
  TI = "TI",
  PP = "PP",
  OTHER = "OTHER",
}

export enum DominantFoot {
  RIGHT = "right",
  LEFT = "left",
  BOTH = "both",
}

export type User = {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  roleId: RoleEnum;
  documentNumber: string;
  documentType: DocumentType;
  active: boolean;
  avatarUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
  address?: string;
  city?: string;
  country?: string;
  policy: boolean;
  subscriptionId?: string;
  phone?: string;
};

export type Plan = {
  id: string;
  createdAt: Date;
  name: string;
  active: boolean;
  price: number;
  description: string;
  currency: string;
  interval: string;
  intervalCount: number;
};

export type Feature = {
  id: string;
  createdAt: string;
  enabled: boolean;
  max: number;
  feature: { id: string; name: string; description: string };
};

export type Subscription = {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  active: boolean;
  paymentId?: string | undefined;
  planId?: string | undefined;
  teams: Team[];
  users: User[];
  plan: Plan;
  features: Feature[];
};
