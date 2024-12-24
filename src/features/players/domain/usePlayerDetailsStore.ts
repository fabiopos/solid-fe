import { createStore } from "zustand/vanilla";
import { PlayerUpdateType } from "./player.schema";
import { FulfilledPlayer } from "./player.effect.schema";
import { RequestStatus } from "@/types/types.common";
import { ApiClient } from "@/lib/ApiClient";
import { RequestError } from "@/shared/errors/RequestError";
import { PlayerUpdate } from "../application/PlayerUpdate";
import { PlayerCreate } from "../application/PlayerCreate";

export type PlayerDetailStoreState = {
  player: FulfilledPlayer | null;
  updateRequestStatus: RequestStatus;
  uploadAvatarStatus: RequestStatus;
  error: RequestError | null;
};
export type PlayerDetailStoreActions = {
  setFulfiledPlayer: (player: FulfilledPlayer) => void;
  setAvatarUrl: (avatarUrl: string) => void;
  putAvatar: (pid: string, file: File, token: string) => Promise<void>;
  reset: () => void;
  putPlayer: (
    pid: string,
    partialPlayer: PlayerUpdateType,
    token: string
  ) => Promise<void>;
};

export type PlayerDetailStore = PlayerDetailStoreState &
  PlayerDetailStoreActions;

const defaultInitState: PlayerDetailStoreState = {
  error: null,
  player: null,
  updateRequestStatus: "IDLE",
  uploadAvatarStatus: "IDLE",
};

export const makePlayerDeailsStore = (
  initState: PlayerDetailStoreState = defaultInitState
) => {
  return createStore<PlayerDetailStore>()((set, get) => ({
    ...initState,
    putPlayer: async (
      pid: string,
      partialPlayer: PlayerUpdateType,
      token: string
    ) => {
      set(() => ({ error: null, updateRequestStatus: "IN_PROGRESS" }));
      const apiClient = new ApiClient();
      const patch = new PlayerUpdate(apiClient);
      const result = await patch.editPlayer(pid, partialPlayer, token);
      if (!result.ok) {
        const error = await result.json();
        set(() => ({ error: error, updateRequestStatus: "ERROR" }));
      }
      await result.json();
      set(() => ({ error: null, updateRequestStatus: "DONE" }));
    },
    setAvatarUrl: (avatarUrl: string) => {
      const currentPlayer = get().player;
      if (currentPlayer) {
        set(() => ({ player: { ...currentPlayer, avatarUrl } }));
      }
    },
    putAvatar: async (pid: string, file: File, token: string) => {
      const put = get().putPlayer;
      const apiClient = new ApiClient();
      const pCreate = new PlayerCreate(apiClient);
      const result = await pCreate.updateAvatar(pid, file);      
      await put(pid, { avatarUrl: result }, token);
    },
    setFulfiledPlayer: (p) => {
      set(() => ({ player: p }));
    },
    reset: () => {
      set(() => ({ ...initState }));
    },
  }));
};
