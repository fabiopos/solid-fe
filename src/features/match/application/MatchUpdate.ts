import { ApiClient } from "@/lib/ApiClient";
import { EmptyMatch, FulfilledMatch } from "../domain/match.schema";
// import { FulfilledMatch } from "../domain/match.schema";

export class MatchUpdate {
  constructor(private readonly client: ApiClient) {}

  async updateMatch(
    matchId: string,
    emptyMatch: EmptyMatch,
    token: string
  ): Promise<FulfilledMatch> {
    const resource = `/match/${matchId}`;
    const result = await this.client.PATCH(resource, emptyMatch, token);
    const updatedMatch = (await result.json()) as FulfilledMatch;
    return updatedMatch;
  }
}
