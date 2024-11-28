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
import { RequestStatus } from "@/types/types.common";
import { FulfilledPlayer } from "@/features/players/domain/player.effect.schema";

export type MatchDetailsStoreState = {
  match: FulfilledMatch | null;
  competition: FulfilledCompetition | null;
  aparitions: FulfilledMatchAparition[];
  score: {
    homeScore: number | null;
    awayScore: number | null;
  };
  upsertStatus: RequestStatus;
};

export type MatchDetailsStoreActions = {
  setHomeScore: (score: number) => void;
  setAwayScore: (score: number) => void;
  setAparition: (playerId: string, aparition: FulfilledMatchAparition) => void;
  upsertAparitions: (token: string) => Promise<void>;
  fetchAparitions: (token: string) => Promise<void>;
  setConfirmed: (playerId: string, confirmed: boolean) => void;
  setPlayed: (playerId: string, played: boolean) => void;
  setYellowCards: (playerId: string, value: number) => void;
  setRedCards: (playerId: string, value: number) => void;
  setMinutes: (playerId: string, value: number) => void;
  setGoals: (playerId: string, value: number) => void;
  setRating: (playerId: string, value: number) => void;
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
  upsertStatus: "IDLE",
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
      const fetchAp = get().fetchAparitions;
      set(() => ({ upsertStatus: "IN_PROGRESS" }));
      const curr = get().aparitions;
      const upsertClient = new AparitionUpsert(new ApiClient());
      await upsertClient.upsertAparitions(curr, token);
      await fetchAp(token);
      set(() => ({ upsertStatus: "DONE" }));
      // set aparitions ids after upsert
    },
    fetchAparitions: async (token) => {
      const matchId = get().match?.id;
      if (!matchId) return;
      const getClient = new AparitionGet(new ApiClient());
      const apars = await getClient.getAparitions(matchId, token);
      console.log(apars);

      set(() => ({ aparitions: apars }));
    },
    setConfirmed: (playerId, confirmed) => {
      const curr = get().aparitions;
      const updatedAp = curr.map((x) => {
        if (x.playerId === playerId) return { ...x, confirmed };
        return x;
      });
      set(() => ({ aparitions: updatedAp }));
    },
    setPlayed: (playerId, played) => {
      const curr = get().aparitions;
      const updatedAp = curr.map((x) => {
        if (x.playerId === playerId) return { ...x, played };
        return x;
      });
      set(() => ({ aparitions: updatedAp }));
    },
    setGoals: (playerId, goals) => {
      const curr = get().aparitions;
      const updatedAp = curr.map((x) => {
        if (x.playerId === playerId) return { ...x, goals };
        return x;
      });
      set(() => ({ aparitions: updatedAp }));
    },
    setMinutes: (playerId, minutes) => {
      const curr = get().aparitions;
      const updatedAp = curr.map((x) => {
        if (x.playerId === playerId) return { ...x, minutes };
        return x;
      });
      set(() => ({ aparitions: updatedAp }));
    },
    setRating: (playerId, rating) => {
      const curr = get().aparitions;
      const updatedAp = curr.map((x) => {
        if (x.playerId === playerId) return { ...x, rating };
        return x;
      });
      set(() => ({ aparitions: updatedAp }));
    },
    setRedCards: (playerId, redCards) => {
      const curr = get().aparitions;
      const updatedAp = curr.map((x) => {
        if (x.playerId === playerId) return { ...x, redCards };
        return x;
      });
      set(() => ({ aparitions: updatedAp }));
    },
    setYellowCards: (playerId, yellowCards) => {
      const curr = get().aparitions;
      const updatedAp = curr.map((x) => {
        if (x.playerId === playerId) return { ...x, yellowCards };
        return x;
      });
      set(() => ({ aparitions: updatedAp }));
    },
  }));
};
