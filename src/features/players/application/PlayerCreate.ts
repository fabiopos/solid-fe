import { ApiClient } from "@/lib/ApiClient";
import { EmptyPlayer, FulfilledPlayer } from "../domain/player.effect.schema";
import { RequestError } from "@/shared/errors/RequestError";
import { createSupaBrowserClient } from "@/lib/supabase.client";

export class PlayerCreate {
  constructor(private readonly client: ApiClient) {}

  async createNewPlayer(player: EmptyPlayer, token: string) {
    const response = await this.client.POST(`/player`, player, token);

    if (!response.ok) {
      const error = (await response.json()) as RequestError;
      return {
        success: false,
        createdPlayer: null,
        error,
      };
    }

    const createdPlayer = (await response.json()) as FulfilledPlayer;
    return {
      success: true,
      error: null,
      createdPlayer,
    };
  }

  async updateAvatar(pid: string, file: File) {
    const supabase = createSupaBrowserClient();

    if (file.size > 0) {
      const extension = file.name.split(".").pop();
      const fileName = `avatar_${pid}.${extension}`;

      const { error } = await supabase.storage
        .from("assets")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (error) return null;

      return this.getFullPathUrl(fileName);
    }
    return null;
  }

  async deleteAvatar(_pid: string) {}

  getFullPathUrl(fileName: string) {
    return `https://tvefqfrpvwacsfdyfked.supabase.co/storage/v1/object/public/assets/${fileName}`;
  }
}
