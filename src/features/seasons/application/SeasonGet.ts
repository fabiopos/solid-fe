import { ApiClient } from "@/lib/ApiClient";
import { FulfilledSeason } from "../domain/season.schema";

export class SeasonGet {
  constructor(private readonly client: ApiClient) {}

  async getAllByTeam(teamId: string, token: string){
    const resource = `/season/${teamId}`;
    const result = await this.client.GET(resource, token);
    if (!result.ok) return [];
    return (await result.json()) as FulfilledSeason[];

  }
  async getAllSeasonsBySubscription(
    subscriptionId: string,
    access_token: string
  ): Promise<FulfilledSeason[] | null> {
    const resource = `/season/${subscriptionId}/subscription`;
    const result = await this.client.GET(resource, access_token);
    if (!result.ok) return null;
    return (await result.json()) as FulfilledSeason[];
  }

  async findSeason(
    seasonId: string,
    access_token: string
  ): Promise<FulfilledSeason | null> {
    const resource = `/season/${seasonId}/details`;
    const result = await this.client.GET(resource, access_token);
    if (!result.ok) return null;
    return (await result.json()) as FulfilledSeason;
  }

  async getSeasonTree(teamId: string, token: string): Promise<any> {
    const resource = `/season/${teamId}/tree`;
    const result = await this.client.GET(resource, token);
    if (!result.ok) return null;
    return await result.json();
  }
}
