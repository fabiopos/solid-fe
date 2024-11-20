import { ApiClient } from "@/lib/ApiClient";

export class CompetitionDelete {
  constructor(private readonly client: ApiClient) {}

  async deleteCompetition(competitionId: string, token: string) {
    const result = await this.client.DELETE(`/competition/${competitionId}`, token);
    return result.ok;
  }
}
