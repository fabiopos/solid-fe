import { ApiClient } from "@/lib/ApiClient";

export class TeamDelete {
  constructor(private readonly client: ApiClient) {}
  async deleteteam(id: string, token: string) {
    const resource = `/team/${id}`;
    const response = await this.client.DELETE(resource, token);
    return response.ok;
  }
}
