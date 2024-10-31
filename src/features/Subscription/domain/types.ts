import { PlanId } from "@/constants/plans";
import { RoleId } from "@/constants/roles";

export interface SubscriptionCreatePayload {
  team: {
    name: string;
  };
  user: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    roleId: RoleId;
    documentNumber: string;
    documentType: string;
    policy: boolean;
  };
  planId: PlanId;
}

type TeamResponse = {
  id: string;
  name: string;
  active: boolean;
  hasSubscription: boolean;
};

type UserResponse = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  documentType: string;
  documentNumber: string;
};

type PlanResponse = {
  id: PlanId;
  name: string;
  interval: string;
  intervalCount: number;
  createdAt: Date;
  active: boolean;
  price: number;
  description: string;
  currency: string;
};

type FeatureReponse = {
  max: number;
  featureId: string;
  enabled: boolean;
  id: string;
};

export interface SubscriptionResponse {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  active: boolean;
  planId: PlanId;
  teams: TeamResponse[];
  users: UserResponse[];
  plan: PlanResponse;
  features: FeatureReponse[];
  isExpired: boolean;
  _tag: "SubscriptionCreateResponse";
}
