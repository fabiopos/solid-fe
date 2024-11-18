import { createStore } from "zustand/vanilla";
import { EmptySeason, FulfilledSeason, PartialSeason } from "./season.schema";
import { ApiClient } from "@/lib/ApiClient";
import { RequestStatus } from "@/types/types.common";
import { SeasonStatusEnum } from "@/shared/enums/seasonStatusEnum";
import { SeasonGet } from "../application/SeasonGet";
import { SeasonUpdate } from "../application/SeasonUpdate";
import { SeasonDelete } from "../application/SeasonDelete";
import { SeasonCreate } from "../application/SeasonCreate";

export type SeasonStoreState = {
  fetchSeasonStatus: RequestStatus;
  seasonStatusUpdate: { id: string | null; status: RequestStatus };
  seasonStatusDelete: { id: string | null; status: RequestStatus };
  error: string | null;
  seasons: FulfilledSeason[];
  selectedSeason: FulfilledSeason | undefined;
  emptySeason: EmptySeason | undefined;
};

export type SeasonStoreActions = {
  fetchSeasons(subscriptionId: string, access_token: string): Promise<void>;
  updateSeason(
    seasonId: string,
    season: PartialSeason,
    access_token: string
  ): Promise<void>;
  deleteSeason(seasonId: string, access_token: string): Promise<void>;
  setSeasonStatus(seasonId: string, seasonStatus: SeasonStatusEnum): void;
  updateSelectedSeason(selectedSeason: {
    name?: string | undefined;
    startDate?: Date | undefined;
    endDate?: Date | undefined;
    description?: string | undefined;
  }): void;
  setSelectedSeason(seasonId: string | undefined): void;
  setEmptySeason(
    emptySeason:
      | {
          teamId: string;
          name?: string | undefined;
          startDate?: Date | undefined;
          endDate?: Date | undefined;
          description?: string | undefined;
        }
      | undefined
  ): void;
  postEmptySeason(emptySeason: EmptySeason, token: string): Promise<void>;
};

export type SeasonStore = SeasonStoreState & SeasonStoreActions;

const defaultInitState: SeasonStoreState = {
  seasons: [],
  fetchSeasonStatus: "IDLE",
  error: null,
  seasonStatusUpdate: { id: null, status: "IDLE" },
  seasonStatusDelete: { id: null, status: "IDLE" },
  selectedSeason: undefined,
  emptySeason: undefined,
};
export const makeSeasonStore = (initProps?: Partial<SeasonStoreState>) => {
  return createStore<SeasonStore>()((set, get) => ({
    ...defaultInitState,
    ...initProps,
    async fetchSeasons(subscriptionId, token) {
      const sclient = new SeasonGet(new ApiClient());

      set(() => ({ fetchSeasonStatus: "IN_PROGRESS" }));
      const seasons = await sclient.getAllSeasonsBySubscription(
        subscriptionId,
        token
      );
      set(() => ({ seasons: seasons ?? [], fetchSeasonStatus: "DONE" }));
    },
    setSeasonStatus: (seasonId, seasonStatus) => {
      const seasons = get().seasons;
      set(() => ({
        seasons: seasons.map((s) => {
          if (s.id === seasonId) return { ...s, status: seasonStatus };
          return s;
        }),
      }));
    },
    updateSeason: async (seasonId, season, access_token) => {
      const uclient = new SeasonUpdate(new ApiClient());
      set(() => ({
        seasonStatusUpdate: { id: seasonId, status: "IN_PROGRESS" },
      }));
      const fulfilledSeason = await uclient.updateSeason(
        seasonId,
        season,
        access_token
      );

      set(() => ({
        seasonStatusUpdate: { id: seasonId, status: "DONE" },
      }));

      const seasons = get().seasons;

      set(() => ({
        seasons: seasons.map((s) => {
          if (s.id === seasonId) return { ...s, ...fulfilledSeason };
          return s;
        }),
      }));
    },
    deleteSeason: async (seasonId, access_token) => {
      const client = new SeasonDelete(new ApiClient());
      set(() => ({
        seasonStatusDelete: { id: seasonId, status: "IN_PROGRESS" },
      }));
      const result = await client.deleteSeason(seasonId, access_token);
      if (result) {
        const newSeasons = get().seasons.filter((x) => x.id !== seasonId);
        set(() => ({
          seasonStatusDelete: { id: seasonId, status: "DONE" },
          seasons: newSeasons,
        }));
      } else {
        set(() => ({
          seasonStatusDelete: { id: seasonId, status: "ERROR" },
        }));
      }
    },
    updateSelectedSeason: ({ endDate, startDate, name }) => {
      const currentSeason = get().selectedSeason;
      if (currentSeason) {
        set(() => ({
          selectedSeason: {
            ...currentSeason,
            name,
            startDate,
            endDate,
          },
        }));
      }
    },
    setSelectedSeason: (seasonId) => {
      const selectedSeason = get().seasons.find((x) => x.id === seasonId);
      set(() => ({ selectedSeason: selectedSeason }));
    },
    setEmptySeason(emptySeason) {
      const currentEmptySeason = get().emptySeason;
      
      if (!emptySeason) {      
        set(() => ({
          emptySeason: undefined,
        }));
      } else {
        set(() => ({
          emptySeason: EmptySeason.make({
            ...currentEmptySeason,
            teamId: emptySeason.teamId,
            name: emptySeason.name,
            description: emptySeason.description,
            startDate: emptySeason.startDate,
            endDate: emptySeason.endDate,
            active: true,
          }),
        }));
      }
    },
    postEmptySeason: async (emptySeason, token) => {
      const client = new SeasonCreate(new ApiClient());
      const newSeason = await client.addSeason(emptySeason, token);
      const currentSeasons = get().seasons;
      if (newSeason) set(() => ({ seasons: [...currentSeasons, newSeason] }));
    },
  }));
};
