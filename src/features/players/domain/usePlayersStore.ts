import { createStore } from "zustand/vanilla";
import { PlayerType, PlayerUpdateType } from "./player.schema";
import { PlayerGet } from "../application/PlayerGet";
import { ApiClient } from "@/lib/ApiClient";
import { PlayerStatus, RequestStatus } from "@/types/types.common";
import { PlayerUpdate } from "../application/PlayerUpdate";

export type PlayersStoreState = {
  fetchPlayersStatus: RequestStatus;
  playerStatusUpdate: { id: string | null; status: RequestStatus };
  error: string | null;
  players: PlayerType[];
};
export type PlayersStoreActions = {
  fetchPlayers(teamId: string, access_token: string): Promise<void>;
  updatePlayer(
    playerId: string,
    player: PlayerUpdateType,
    access_token: string
  ): Promise<void>;
  setPlayerStatus(playerId: string, playerStatus: PlayerStatus): void;
};

export type PlayersStore = PlayersStoreState & PlayersStoreActions;

const defaultInitState: PlayersStoreState = {
  players: [],
  fetchPlayersStatus: "IDLE",
  error: null,
  playerStatusUpdate: { id: null, status: "IDLE" },
};
export const makePlayersStore = (
  initState: PlayersStoreState = defaultInitState
) => {
  return createStore<PlayersStore>()((set, get) => ({
    ...initState,
    async fetchPlayers(teamId, access_token) {
      set(() => ({ fetchPlayersStatus: "IN_PROGRESS" }));

      const client = new PlayerGet(new ApiClient());

      try {
        const result = await client.getAllPlayers(teamId, access_token);        
        set(() => ({
          fetchPlayersStatus: "DONE",
          players: result,
        }));

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
    setPlayerStatus(playerId: string, playerStatus: PlayerStatus) {
      const players = get().players;

      set(() => ({
        players: players.map((p) => {
          if (p.id === playerId) return { ...p, status: playerStatus };
          return p;
        }),
      }));
    },
    async updatePlayer(
      playerId: string,
      player: PlayerUpdateType,
      token: string
    ) {
      set(() => ({
        playerStatusUpdate: { id: playerId, status: "IN_PROGRESS" },
      }));
      const client = new PlayerUpdate(new ApiClient());
      await client.editPlayer(playerId, player, token);
      set(() => ({
        playerStatusUpdate: { id: playerId, status: "DONE" },
      }));
    },
  }));
};
