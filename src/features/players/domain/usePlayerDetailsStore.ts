import { createStore } from "zustand/vanilla";
import {
  isValidEmail,
  isValidHeight,
  isValidShirtNumber,
  isValidWeight,
  PlayerUpdateType,
} from "./player.schema";
import {
  EmptyPlayer,
  FulfilledPlayer,
  PartialPlayer,
} from "./player.effect.schema";
import { DocumentType } from "@/shared/enums/playerEnums";
import { DominantFoot, RequestStatus, ShirtSize } from "@/types/types.common";
import { PlayerCreate } from "../application/PlayerCreate";
import { ApiClient } from "@/lib/ApiClient";
import { RequestError } from "@/shared/errors/RequestError";
import { PlayerUpdate } from "../application/PlayerUpdate";

export type PlayerDetailStoreState = {
  player: FulfilledPlayer | null;
  updateRequestStatus: RequestStatus;
  error: RequestError | null;
};
export type PlayerDetailStoreActions = {
  setFulfiledPlayer: (player: FulfilledPlayer) => void;
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
      const response = await result.json();
      console.log("RESPONSE PATCH PLAYER:", response);
      set(() => ({ error: null, updateRequestStatus: "DONE" }));
    },
    setFulfiledPlayer: (p) => {},
    reset: () => {
      set(() => ({ ...initState }));
    },
  }));
};
