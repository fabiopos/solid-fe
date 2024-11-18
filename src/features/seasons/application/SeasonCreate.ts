import { ApiClient } from "@/lib/ApiClient";
import { EmptySeason, FulfilledSeason } from "../domain/season.schema";

export class SeasonCreate {
  constructor(private readonly client: ApiClient) {}

  async addSeason(
    season: EmptySeason,
    access_token: string
  ): Promise<FulfilledSeason | null> {
    const result = await this.client.POST(`/season/${season.teamId}`, season, access_token);
    if (!result.ok) return null;

    return (await result.json()) as FulfilledSeason;
  }
}
