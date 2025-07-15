import { ApiClient } from "@/lib/ApiClient";
import { PlayerType } from "../domain/player.schema";
import {
  FulfilledPlayer,
  FulfilledPlayerWithStats,
} from "../domain/player.effect.schema";
import { Effect, flow } from "effect";

export class PlayerGet {
  constructor(private apiClient: ApiClient) {}

  async getAllPlayers(
    teamId: string,
    access_token?: string
  ): Promise<FulfilledPlayer[]> {
    const endpoint = `/player/${teamId}`;
    const response = await this.apiClient.GET(endpoint, access_token ?? "");

    if (!response.ok) return [];

    const result = (await response.json()) as FulfilledPlayer[];

    return result;
  }

  async getAllPlayersWithStats(
    teamId: string,
    access_token?: string
  ): Promise<FulfilledPlayerWithStats[]> {
    const endpoint = `/player/${teamId}/with-stats`;

    const playersEffect = this.getAllPlayersWithStatsEffect(
      endpoint,
      access_token ?? "",
      this.apiClient
    );

    const res = await Effect.runPromise(playersEffect());
    return res;
  }

  getAllPlayersWithStatsEffect(
    endpoint: string,
    token: string,
    apiClient: ApiClient
  ) {
    return flow(
      () => endpoint,
      (endpoint: string) =>
        Effect.tryPromise(() => apiClient.GET(endpoint, token)),
      Effect.flatMap((response) => {
        if (!response.ok) return Effect.succeed([]);
        return Effect.tryPromise(
          () => response.json() as Promise<FulfilledPlayerWithStats[]>
        );
      })
    );
  }

  async find(pid: string, token: string) {
    const result = await this.apiClient.GET(`/player/${pid}/details`, token);

    if (!result.ok) return null;

    return (await result.json()) as FulfilledPlayerWithStats;
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
