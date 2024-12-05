import { ApiClient } from "@/lib/ApiClient";

export class PlayerDelete {
  constructor(private readonly client: ApiClient) {}

  async deletePlayer(playerId: string, token: string) {
    const result = await this.client.DELETE(`/player/${playerId}`);
    return result.ok;
  }
}
