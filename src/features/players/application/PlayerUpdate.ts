import { ApiClient } from "@/lib/ApiClient";
import { PlayerUpdateType } from "../domain/player.schema";

export class PlayerUpdate {
  constructor(private client: ApiClient) {}

  async editPlayer(id: string, player: PlayerUpdateType, token: string) {
    const response = await this.client.PATCH(`/player/${id}`, player, token);
    return response;
  }

  async updatePlayerPositions(
    id: string,
    favPosition: string,
    positions: string[],
    token: string
  ) {
    const body = { favPosition, fieldPositions: positions };
    const response = await this.client.PATCH(`/player/${id}/field-positions`, body, token);
    return response;
  }
}
