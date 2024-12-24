import { ApiClient } from "@/lib/ApiClient";
import { PlayerType } from "../domain/player.schema";
import { FulfilledPlayer } from "../domain/player.effect.schema";

export class PlayerGet {
  constructor(private apiClient: ApiClient) {}

  async getAllPlayers(
    teamId: string,
    access_token?: string
  ): Promise<FulfilledPlayer[]> {
    const endpoint = `/player/${teamId}`;
    const response = await this.apiClient.GET(endpoint, access_token ?? "");

    if (!response.ok) return [];

    const result = await response.json() as FulfilledPlayer[];

    // const mapped = (result as PlayerType[]).map(this.mapPlayers);
    const sorted = result;

    return sorted;
  }

  async find(pid: string, token: string) {
    const result = await this.apiClient.GET(`/player/${pid}/details`, token);

    if (!result.ok) return null;

    return (await result.json()) as FulfilledPlayer;
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

  private sortPlayers = (a: FulfilledPlayer, b: FulfilledPlayer) =>
    a.favPosition!.order! > b.favPosition!.order! ? 1 : -1;
}
