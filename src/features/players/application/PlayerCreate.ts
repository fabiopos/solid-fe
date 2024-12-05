import { ApiClient } from "@/lib/ApiClient";
import { EmptyPlayer, FulfilledPlayer } from "../domain/player.effect.schema";

export class PlayerCreate {
  constructor(private readonly client: ApiClient) {}

  async createNewPlayer(player: EmptyPlayer, token: string) {
    const response = await this.client.POST(`/player`, player, token);

    if (!response.ok) return await response.text();

    return (await response.json()) as FulfilledPlayer;
  }
}
