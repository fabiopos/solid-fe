import { ApiClient } from "@/lib/ApiClient";

export class SeasonDelete {
  constructor(private readonly client: ApiClient) {}

  async deleteSeason(seasonId: string, _access_token: string) {
    const result = await this.client.DELETE("/season/" + seasonId);
    return result.ok;
  }
}
