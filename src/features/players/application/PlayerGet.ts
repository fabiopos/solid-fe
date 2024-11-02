import { ApiClient } from "@/lib/ApiClient";

export class PlayerGet {
  private apiClient: ApiClient;
  constructor(private client: ApiClient) {
    this.apiClient = client;
  }

  async getAllPlayers(teamId: string, access_token?: string) {
    // const teamId = "c71a85b2-9bbb-4f8f-9ee3-f87cc4a7c754";
    const response = await this.apiClient.GET(
      `/player/${teamId}`,
      access_token ?? ""
    );

    return response;
  }
}
