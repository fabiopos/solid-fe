import { ApiClient } from "@/lib/ApiClient";
import { EmptyTeam } from "../domain/team.schema";

export class TeamCreate {
  constructor(private readonly client: ApiClient) {}
  async createRival(payload: EmptyTeam, token: string) {
    const resource = `/team`;
    const response = await this.client.POST(
      resource,
      { ...payload, hasSubscription: false },
      token
    );
    return response.ok;
  }
  async createTeam(payload: EmptyTeam, token: string) {
    const resource = `/team`;
    const response = await this.client.POST(
      resource,
      { ...payload, hasSubscription: true },
      token
    );
    return response.ok;
  }
}
