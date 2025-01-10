import { ApiClient } from "@/lib/ApiClient";
import { FulfilledTeamStats } from "../domain/teamStats.schema";
import { FulfilledPlayer } from "@/features/players/domain/player.effect.schema";
import {
  FulfilledMatchAparition,
  FulfilledScorer,
} from "@/features/aparition/domain/aparition.schema";
import { FulfilledMatch } from "@/features/match/domain/match.schema";

export interface LastMatchesPayload {
  teamId: string;
  token: string;
  limit: number;
}

export interface TopScorersPayload {
  teamId: string;
  token: string;
  limit: number;
}
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

  async getTopScorers({ teamId, token, limit }: TopScorersPayload) {
    const stats = await this.client.GET(
      `/dashboard/top-scorers/${teamId}?limit=${limit}`,
      token
    );
    return (await stats.json()) as FulfilledScorer[];
  }

  async getTopAssists(teamId: string, token: string, limit?: number) {
    const stats = await this.client.GET(
      `/dashboard/top-asists/${teamId}?limit=${limit}`,
      token
    );
    return (await stats.json()) as FulfilledMatchAparition[];
  }

  async getLastMatches({ teamId, token, limit }: LastMatchesPayload) {
    const stats = await this.client.GET(
      `/dashboard/last-matches/${teamId}?limit=${limit}`,
      token
    );
    return (await stats.json()) as FulfilledMatch[];
  }

  async getNextMatches(teamId: string, token: string, limit?: number) {
    const stats = await this.client.GET(
      `/dashboard/next-matches/${teamId}?limit=${limit}`,
      token
    );
    return (await stats.json()) as FulfilledMatch[];
  }

  async getCalendar(teamId: string, token: string) {
    const stats = await this.client.GET(`/dashboard/calendar/${teamId}`, token);
    return (await stats.json()) as FulfilledMatch[];
  }
}
