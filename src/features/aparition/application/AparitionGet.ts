import { ApiClient } from "@/lib/ApiClient";
import { FulfilledMatchAparition } from "../domain/aparition.schema";

export class AparitionGet {
  constructor(private readonly client: ApiClient) {}

  async getAparitions(matchId: string, token: string) {
    const result = await this.client.GET(`/match-aparition/${matchId}`, token);
    if (result.ok) return [];
    return (await result.json()) as FulfilledMatchAparition[];
  }
}
