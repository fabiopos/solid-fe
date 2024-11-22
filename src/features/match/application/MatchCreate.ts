import { ApiClient } from "@/lib/ApiClient";
import { EmptyMatch, FulfilledMatch } from "../domain/match.schema";
// import { FulfilledMatch } from "../domain/match.schema";

export class MatchCreate {
  constructor(private readonly client: ApiClient) {}

  async createMatch(
    emptyMatch: EmptyMatch,    
    token: string
  ): Promise<FulfilledMatch> {
    const resource = `/match/`;
    const result = await this.client.POST(resource, emptyMatch, token);
    const createdMatch = (await result.json()) as FulfilledMatch;
    return createdMatch;
  }
}
