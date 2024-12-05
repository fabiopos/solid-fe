import { ApiClient } from "@/lib/ApiClient";
import { EmptyPlayer, FulfilledPlayer } from "../domain/player.effect.schema";
import { RequestError } from "@/shared/errors/RequestError";

export class PlayerCreate {
  constructor(private readonly client: ApiClient) {}

  async createNewPlayer(player: EmptyPlayer, token: string) {
    const response = await this.client.POST(`/player`, player, token);

    if (!response.ok) return await response.json() as RequestError;

    return (await response.json()) as FulfilledPlayer;
  }
}
