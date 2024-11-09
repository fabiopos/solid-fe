import { ApiClient } from "@/lib/ApiClient";

import { ErrorResponse } from "@/types/types.common";
import { SubscriptionInput } from "../domain/subscription.schema";
import { SubscriptionCreatePayload, SubscriptionResponse } from "../domain/types";

const resource = "/subscription";

export class SubscriptionCreate {
  private apiClient: ApiClient;
  constructor(private client: ApiClient) {
    this.apiClient = client;
  }
  async create(
    subscriptionInput: SubscriptionInput
  ): Promise<SubscriptionResponse> {
    const payload = this.makePayload(subscriptionInput);
    const response = await this.apiClient.POST(resource, payload);
    const result = await response.json();
    if (!response.ok) throw new ErrorResponse(result.message);

    return result as SubscriptionResponse;
  }

  makePayload(subscriptionInput: SubscriptionInput): SubscriptionCreatePayload {
    return {
      planId: "FREE",
      team: {
        name: subscriptionInput.teamName,
      },
      user: {
        documentNumber: subscriptionInput.documentNumber,
        documentType: subscriptionInput.documentType,
        email: subscriptionInput.email,
        firstName: subscriptionInput.firstName,
        lastName: subscriptionInput.lastName,
        password: subscriptionInput.password,
        policy: subscriptionInput.policy,
        roleId: "admin", // make dynamic
      },
    };
  }
}
