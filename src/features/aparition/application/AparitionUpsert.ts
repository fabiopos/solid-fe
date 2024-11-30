import { ApiClient } from "@/lib/ApiClient";
import { FulfilledMatchAparition } from "../domain/aparition.schema";
import { FulfilledPlayer } from "@/features/players/domain/player.effect.schema";

export class AparitionUpsert {
  constructor(private readonly client: ApiClient) {}

  async addAparition(player: FulfilledPlayer, matchId: string, token: string) {
    const resource = `/match-aparition`;
    await this.client.POST(
      resource,
      FulfilledMatchAparition.make({
        minutes: 0,
        goals: 0,
        assists: 0,
        yellowCards: 0,
        redCards: 0,
        injury: false,
        manOfTheMatch: false,
        rating: 6,
        played: false,
        confirmed: false,
        playerId: player.id,
        matchId: matchId,
        match: { id: matchId },
        player: { id: player.id },
      }),
      token
    );
  }

  async upsertAparitions(aparitions: FulfilledMatchAparition[], token: string) {
    const resource = `/match-aparition`;
    const toAdd = aparitions.filter((x) => !x.id);
    const toUpdate = aparitions.filter((x) => x.id);

    // Insert
    const promAdd = toAdd.map((x) => this.client.POST(resource, x, token));
    const promUpdate = toUpdate.map((x) =>
      this.client.PATCH(`${resource}/${x.id}`, x, token)
    );

    await Promise.all(promAdd);
    await Promise.all(promUpdate);
  }
}
