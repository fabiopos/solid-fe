import { ApiClient } from "@/lib/ApiClient";
import { FulfilledFieldPosition } from "../domain/field-position.schema";

export class FieldPositionGet {
  constructor(private readonly client: ApiClient) {}

  getAllFieldPositions = async (access_token: string) => {
    const result = await this.client.GET("/field-position", access_token);
    const response = await result.json();
    return response as FulfilledFieldPosition[];
  };
}
