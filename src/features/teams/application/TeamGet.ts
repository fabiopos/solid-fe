import { ApiClient } from "@/lib/ApiClient";
import { Team } from "@/types/types.common";

export class TeamGet {
  constructor(private client: ApiClient) {}

  async getTeams(token: string): Promise<Team[]> {
    const endpoint = `/team`;
    const response = await this.client.GET(endpoint, token);
    if (!response.ok) return [];
    const teams = await response.json();
    return teams as Team[];
  }
}
