import { ApiClient } from "@/lib/ApiClient";
import { PlayerType } from "../domain/player.schema";

export class PlayerGet {
  constructor(private apiClient: ApiClient) {}

  async getAllPlayers(
    teamId: string,
    access_token?: string
  ): Promise<PlayerType[]> {
    const endpoint = `/player/${teamId}`;
    const response = await this.apiClient.GET(endpoint, access_token ?? "");

    if (!response.ok) throw new Error();

    const result = await response.json();   

    const mapped = (result as PlayerType[]).map(this.mapPlayers);
    const sorted = mapped.sort(this.sortPlayers);

    return sorted;
  }

  private mapPlayers = (player: PlayerType) =>
    player.favPosition
      ? player
      : {
          ...player,
          favPosition: {
            id: "",
            category: "NO POSITION",
            description: "",
            name: "",
            order: 99,
          },
        };

  private sortPlayers = (a: PlayerType, b: PlayerType) =>
    a.favPosition!.order > b.favPosition!.order ? 1 : -1;
}
