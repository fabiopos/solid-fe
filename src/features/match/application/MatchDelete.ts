import { ApiClient } from "@/lib/ApiClient";
// import { FulfilledMatch } from "../domain/match.schema";

export class MatchDelete {
  constructor(private readonly client: ApiClient) {}

  deleteMatch(matchId: string, token: string) {
    const resource = `/match/${matchId}`;
    return this.client.DELETE(resource, token);
  }
}
