import { ApiClient } from "@/lib/ApiClient";
import { FulfilledCompetition } from "../domain/competition.schema";

export class CompetitionGet {
  constructor(private readonly client: ApiClient) {}

  async getAllBySeason(seasonId: string, token: string) {
    const resource = `/competition/${seasonId}/season`;
    const result = await this.client.GET(resource, token);
    const competitions = await result.json();
    return competitions as FulfilledCompetition[];
  }

  async getAllByTeam(teamId: string, token: string) {
    const resource = `/competition/${teamId}/team`;
    const result = await this.client.GET(resource, token);
    const competitions = await result.json();
    return competitions as FulfilledCompetition[];
  }

  async find(competitionId: string, token: string) {
    const resource = `/competition/${competitionId}`;
    const result = await this.client.GET(resource, token);
    const competitions = await result.json();
    return competitions as FulfilledCompetition;
  }
}
