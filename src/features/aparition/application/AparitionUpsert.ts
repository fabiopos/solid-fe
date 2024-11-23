import { ApiClient } from "@/lib/ApiClient";
import { FulfilledMatchAparition } from "../domain/aparition.schema";

export class AparitionUpsert {
  constructor(private readonly client: ApiClient) {}

  async upsertAparitions(aparitions: FulfilledMatchAparition[], token: string) {
    const resource = `/match-aparitions`;
    const toAdd = aparitions.filter((x) => !x.id);
    const toUpdate = aparitions.filter((x) => !x.id);

    // Insert
    const promAdd = toAdd.map((x) => this.client.POST(resource, x, token));
    const promUpdate = toUpdate.map((x) =>
      this.client.PATCH(`${resource}/${x.id}`, x, token)
    );

    await Promise.all(promAdd);
    await Promise.all(promUpdate);
  }
}
