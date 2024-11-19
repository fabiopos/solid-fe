import { ApiClient } from "@/lib/ApiClient";
import { FulfilledSeason } from "../domain/season.schema";

export class SeasonGet {
  constructor(private readonly client: ApiClient) {}

  async getAllSeasonsBySubscription(
    subscriptionId: string,
    access_token: string
  ): Promise<FulfilledSeason[] | null> {
    const resource = `/season/${subscriptionId}/subscription`;
    const result = await this.client.GET(resource, access_token);
    if (!result.ok) return null;
    return (await result.json()) as FulfilledSeason[];
  }

  async findSeason(seasonId: string, access_token: string): Promise<FulfilledSeason | null>{
    const resource = `/season/${seasonId}/details`;
    const result = await this.client.GET(resource, access_token);
    if (!result.ok) return null;
    return (await result.json()) as FulfilledSeason;
  }
}
