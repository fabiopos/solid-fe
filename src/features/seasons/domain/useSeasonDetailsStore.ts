import { createStore } from "zustand/vanilla";
import { FulfilledSeason } from "./season.schema";
import { ApiClient } from "@/lib/ApiClient";
import { RequestStatus } from "@/types/types.common";

import { SeasonGet } from "../application/SeasonGet";
import { FulfilledMatch } from "@/features/match/domain/match.schema";

export type SeasonDetailsStoreState = {
  season: FulfilledSeason | null;
  fetchSeasonDetailsStatus: RequestStatus;
  matches: FulfilledMatch[] | null
};

export type SeasonDetailsStoreActions = {
  fetchSeasonDetails(seasonId: string, access_token: string): Promise<void>;
};

export type SeasonDetailsStore = SeasonDetailsStoreState &
  SeasonDetailsStoreActions;

const defaultInitState: SeasonDetailsStoreState = {
  fetchSeasonDetailsStatus: "IDLE",
  season: null,
  matches: null
};
export const makeSeasonDetailsStore = (
  initProps?: Partial<SeasonDetailsStoreState>
) => {
  return createStore<SeasonDetailsStore>()((set) => ({
    ...defaultInitState,
    ...initProps,
    fetchSeasonDetails: async (seasonId: string, access_token: string) => {
      const client = new SeasonGet(new ApiClient());
      set(() => ({ fetchSeasonDetailsStatus: "IN_PROGRESS" }));
      const season = await client.findSeason(seasonId, access_token);
      set(() => ({ season, fetchSeasonDetailsStatus: "DONE" }));
    },
  }));
};
