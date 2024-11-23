import { FulfilledCompetition } from "@/features/competition/domain/competition.schema";
import { FulfilledMatch } from "./match.schema";
import { createStore } from "zustand";
import {
  EmptyMatchAparition,
  FulfilledMatchAparition,
} from "@/features/aparition/domain/aparition.schema";
import { AparitionUpsert } from "@/features/aparition/application/AparitionUpsert";
import { ApiClient } from "@/lib/ApiClient";
import { AparitionGet } from "@/features/aparition/application/AparitionGet";

export type MatchDetailsStoreState = {
  match: FulfilledMatch | null;
  competition: FulfilledCompetition | null;
  aparitions: FulfilledMatchAparition[];
  score: {
    homeScore: number | null;
    awayScore: number | null;
  };
};

export type MatchDetailsStoreActions = {
  setHomeScore: (score: number) => void;
  setAwayScore: (score: number) => void;
  setAparition: (playerId: string, aparition: FulfilledMatchAparition) => void;
  upsertAparitions: (token: string) => Promise<void>;
  fetchAparitions: (token: string) => Promise<void>;
};

export type MatchDetailsStore = MatchDetailsStoreState &
  MatchDetailsStoreActions;

const defaultInitialState: MatchDetailsStoreState = {
  competition: null,
  match: null,
  aparitions: [],
  score: {
    awayScore: null,
    homeScore: null,
  },
};

export const makeMatchDetailsStore = (
  initProps?: Partial<MatchDetailsStoreState>
) => {
  return createStore<MatchDetailsStore>()((set, get) => ({
    ...defaultInitialState,
    ...initProps,
    setAwayScore: (score) => {
      const curr = get().score;
      set(() => ({ score: { ...curr, awayScore: score } }));
    },
    setHomeScore: (score) => {
      const curr = get().score;
      set(() => ({ score: { ...curr, homeScore: score } }));
    },
    setAparition: (playerId, emptyMatchAparition) => {
      const curr = get().aparitions;
      const updatedAp = curr.map((x) => {
        if (x.playerId === playerId) return { ...x, ...emptyMatchAparition };
        return x;
      });

      set(() => ({ aparitions: updatedAp }));
    },
    upsertAparitions: async (token: string) => {
      const curr = get().aparitions;
      const upsertClient = new AparitionUpsert(new ApiClient());
      await upsertClient.upsertAparitions(curr, token);
    },
    fetchAparitions: async (token) => {
      const matchId = get().match?.id;
      if (!matchId) return;
      const getClient = new AparitionGet(new ApiClient());
      const apars = await getClient.getAparitions(matchId, token);
      set(() => ({ aparitions: apars }));
    },
  }));
};
