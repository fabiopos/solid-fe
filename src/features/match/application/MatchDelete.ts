import { ApiClient } from "@/lib/ApiClient";
// import { FulfilledMatch } from "../domain/match.schema";

export class MatchDelete {
  constructor(private readonly client: ApiClient) {}

  async deleteMatch(matchId: string, token: string) {
    const resource = `/match/${matchId}`;
    await this.client.DELETE(resource, token);
  }
}
