import { ApiClient } from "@/lib/ApiClient";
import { FulfilledTeamStats } from "../domain/teamStats.schema";
import { FulfilledPlayer } from "@/features/players/domain/player.effect.schema";
import { FulfilledMatchAparition } from "@/features/aparition/domain/aparition.schema";

export class DashboardGet {
  constructor(private readonly client: ApiClient) {}

  async getTeamStats(teamId: string, token: string) {
    const stats = await this.client.GET(
      `/dashboard/team-stats/${teamId}`,
      token
    );
    return (await stats.json()) as FulfilledTeamStats;
  }

  async getLastPlayersAdded(teamId: string, token: string, limit?: number) {
    const stats = await this.client.GET(
      `/dashboard/last-players-added/${teamId}?limit=${limit}`,
      token
    );
    return (await stats.json()) as FulfilledPlayer[];
  }

  async getTopScorers(teamId: string, token: string, limit?: number) {
    const stats = await this.client.GET(
      `/dashboard/top-scorers/${teamId}?limit=${limit}`,
      token
    );
    return (await stats.json()) as FulfilledMatchAparition[];
  }

  async getTopAssists(teamId: string, token: string, limit?: number) {
    const stats = await this.client.GET(
      `/dashboard/top-asists/${teamId}?limit=${limit}`,
      token
    );
    return (await stats.json()) as FulfilledMatchAparition[];
  }
}
