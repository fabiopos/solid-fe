import { ApiClient } from "@/lib/ApiClient";
import { PartialSeason } from "../domain/season.schema";

export class SeasonUpdate {
  constructor(private readonly client: ApiClient) {}

  async updateSeason(
    seasonId: string,
    payload: PartialSeason,
    access_token: string
  ) {
    const resource = `/season/${seasonId}`;
    const result = await this.client.PATCH(resource, payload, access_token);

    return await result.json();
  }
}
