import { ApiClient } from "@/lib/ApiClient";
import { PlayerType } from "../domain/player.schema";

export class PlayerGet {
  private apiClient: ApiClient;
  constructor(private client: ApiClient) {
    this.apiClient = client;
  }

  async getAllPlayers(
    teamId: string,
    access_token?: string
  ): Promise<PlayerType[]> {
    // const teamId = "c71a85b2-9bbb-4f8f-9ee3-f87cc4a7c754";
    const response = await this.apiClient.GET(
      `/player/${teamId}`,
      access_token ?? ""
    );

    if (!response.ok) throw new Error();

    const result = await response.json();

    const mapped = (result as PlayerType[]).map((a) =>
      a.favPosition
        ? a
        : {
            ...a,
            favPosition: {
              id: "",
              category: "NO POSITION",
              description: "",
              name: "",
              order: 99,
            },
          }
    );
    const sorted = mapped.sort((a, b) =>
      a.favPosition!.order > b.favPosition!.order ? 1 : -1
    );

    return sorted;
  }
}
