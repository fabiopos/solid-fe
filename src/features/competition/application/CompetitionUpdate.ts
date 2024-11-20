import { ApiClient } from "@/lib/ApiClient";
import {
  EmptyCompetition,
  FulfilledCompetition,
} from "../domain/competition.schema";

export class CompetitionUpdate {
  constructor(private readonly client: ApiClient) {}

  async updateCompetition(
    competitionId: string,
    emptyCompetition: EmptyCompetition,
    token: string
  ) {
    const resource = `/competition/${competitionId}`;
    const result = await this.client.PATCH(resource, emptyCompetition, token);
    if(!result.ok) return null;
    const competition = await result.json();
    return competition as FulfilledCompetition;
  }
}
