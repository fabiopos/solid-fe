import { ApiClient } from "@/lib/ApiClient";
import { Subscription } from "@/types/types.common";

export class SubscriptionGet {
  constructor(private client: ApiClient) {}

  async getSubscription(token: string, subscriptionId: string) {
    const response = await this.client.GET(
      `/subscription/${subscriptionId}`,
      token
    );

    if (!response.ok) return null;
    const result = await response.json();

    return result as Subscription;
  }
}
