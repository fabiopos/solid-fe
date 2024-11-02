import { createStore } from "zustand/vanilla";
import { PlayerType } from "./player.schema";
import { PlayerGet } from "../application/PlayerGet";
import { ApiClient } from "@/lib/ApiClient";
import { RequestStatus } from "@/types/types.common";

export type PlayersStoreState = {
  fetchPlayersStatus: RequestStatus;
  error: string | null;
  players: PlayerType[];
};
export type PlayersStoreActions = {
  fetchPlayers(teamId: string, access_token: string): Promise<void>;
};

export type PlayersStore = PlayersStoreState & PlayersStoreActions;

const defaultInitState: PlayersStoreState = {
  players: [],
  fetchPlayersStatus: "IDLE",
  error: null,
};
export const makePlayersStore = (
  initState: PlayersStoreState = defaultInitState
) => {
  return createStore<PlayersStore>()((set) => ({
    ...initState,
    async fetchPlayers(teamId, access_token) {
      set(() => ({ fetchPlayersStatus: "IN_PROGRESS" }));

      const client = new PlayerGet(new ApiClient());

      try {
        const response = await client.getAllPlayers(teamId, access_token);
        if (!response.ok) throw new Error();

        const result = await response.json();
        set(() => ({ fetchPlayersStatus: "DONE", players: result }));

        return;
      } catch (error) {
        if (error instanceof Error)
          set(() => ({ fetchPlayersStatus: "ERROR", error: error.message }));
        else
          set(() => ({
            fetchPlayersStatus: "ERROR",
            error: "Something is wrong!",
          }));
      }
    },
  }));
};
