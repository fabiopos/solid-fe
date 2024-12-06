import { ApiClient } from "@/lib/ApiClient";
import { FulfilledTeamStats } from "../domain/teamStats.schema";

export class DashboardGet {
  constructor(private readonly client: ApiClient) {}

  async getTeamStats(teamId: string, token: string) {
    const stats = await this.client.GET(`/dashboard/team-stats/${teamId}`, token);
    return (await stats.json()) as FulfilledTeamStats;
  }
}
