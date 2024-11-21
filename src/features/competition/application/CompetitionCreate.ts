import { ApiClient } from "@/lib/ApiClient";
import {
  EmptyCompetition,
  FulfilledCompetition,
} from "../domain/competition.schema";

export class CompetitionCreate {
  constructor(private readonly client: ApiClient) {}

  async createCompetition(emptyCompetition: EmptyCompetition, seasonId: string, token: string) {
    const resource = `/competition/${seasonId}`;
    const result = await this.client.POST(resource, emptyCompetition, token);
    const competition = await result.json();
    return competition as FulfilledCompetition;
  }
}
