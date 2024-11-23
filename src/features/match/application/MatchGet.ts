import { ApiClient } from "@/lib/ApiClient";
import { FulfilledMatch } from "../domain/match.schema";

export class MatchGet {
  constructor(private readonly client: ApiClient) {}

  async getBySeason(
    seasonId: string,
    token: string
  ): Promise<FulfilledMatch[]> {
    const client = new ApiClient();
    const result = await client.GET(`/match/${seasonId}/season`, token);

    if (!result.ok) return [];

    return (await result.json()) as FulfilledMatch[];
  }

  async getByCompetition(competitionId: string, token: string) {
    const client = new ApiClient();
    const result = await client.GET(
      `/match/${competitionId}/competition`,
      token
    );

    if (!result.ok) return [];

    return (await result.json()) as FulfilledMatch[];
  }

  async find(matchId: string, token: string) {
    const client = new ApiClient();
    const result = await client.GET(`/match/${matchId}`, token);

    if (!result.ok) return null;

    return (await result.json()) as FulfilledMatch;
  }
}
