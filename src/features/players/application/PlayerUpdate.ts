import { ApiClient } from "@/lib/ApiClient";
import { PlayerType, PlayerUpdateType } from "../domain/player.schema";

export class PlayerUpdate {
  constructor(private client: ApiClient) {}

  async editPlayer(id: string, player: PlayerUpdateType, token: string) {
    
    const response = await this.client.PATCH(
      `/player/${id}`,
      player,
      token
    );    
    return response;
  }
}
