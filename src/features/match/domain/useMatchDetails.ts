import { FulfilledCompetition } from "@/features/competition/domain/competition.schema";
import { FulfilledMatch } from "./match.schema";
import { createStore } from "zustand";
import { FulfilledMatchAparition } from "@/features/aparition/domain/aparition.schema";
import { AparitionUpsert } from "@/features/aparition/application/AparitionUpsert";
import { ApiClient } from "@/lib/ApiClient";
import { AparitionGet } from "@/features/aparition/application/AparitionGet";
import { RequestStatus } from "@/types/types.common";
import { FulfilledPlayer } from "@/features/players/domain/player.effect.schema";
import { getScoreFromFormatted, runUpdateScoreEffect } from "@/lib/match.util";
import { Effect } from "effect";

export type MatchDetailsStoreState = {
  players: FulfilledPlayer[];
  match: FulfilledMatch | null;
  competition: FulfilledCompetition | null;
  aparitions: FulfilledMatchAparition[];
  score: {
    homeScore: number | null;
    awayScore: number | null;
  };
  upsertStatus: RequestStatus;
  scoreRequestStatus: RequestStatus;
  formattedScore: string | undefined;
  updateError: Error | string | undefined;
};

export type MatchDetailsStoreActions = {
  setHomeScore: (score: number) => void;
  setAwayScore: (score: number) => void;
  setScore: (score: string) => void;
  setAparition: (playerId: string, aparition: FulfilledMatchAparition) => void;
  upsertAparitions: (token: string) => Promise<void>;
  fetchAparitions: (token: string) => Promise<void>;
  addAparition: (
    player: FulfilledPlayer,
    matchId: string,
    token: string
  ) => Promise<void>;
  setConfirmed: (playerId: string, confirmed: boolean) => void;
  setPlayed: (playerId: string, played: boolean) => void;
  setYellowCards: (playerId: string, value: number) => void;
  setRedCards: (playerId: string, value: number) => void;
  setMinutes: (playerId: string, value: number) => void;
  setGoals: (playerId: string, value: number) => void;
  setRating: (playerId: string, value: number) => void;
  putScore: (token: string) => Promise<void>;
};

export type MatchDetailsStore = MatchDetailsStoreState &
  MatchDetailsStoreActions;

const defaultInitialState: MatchDetailsStoreState = {
  competition: null,
  players: [],
  match: null,
  aparitions: [],
  score: {
    awayScore: null,
    homeScore: null,
  },

  upsertStatus: "IDLE",
  formattedScore: undefined,
  scoreRequestStatus: "IDLE",
  updateError: undefined,
};

export const makeMatchDetailsStore = (
  initProps?: Partial<MatchDetailsStoreState>
) => {
  return createStore<MatchDetailsStore>()((set, get) => ({
    ...defaultInitialState,
    ...initProps,
    formattedScore: `${initProps?.match?.homeScore ?? ""}${
      initProps?.match?.awayScore ?? ""
    }`,
    putScore: async (token: string) => {
      const payload = {
        fScore: get().formattedScore,
        matchId: get().match?.id,
        onBegin: () => set(() => ({ scoreRequestStatus: "IN_PROGRESS" })),
        onError: () => set(() => ({ scoreRequestStatus: "ERROR" })),
        onSuccess: () => set(() => ({ scoreRequestStatus: "DONE" })),
        token,
      };

      const effectToRun = runUpdateScoreEffect(payload);
      await Effect.runPromise(effectToRun);      
    },
    setScore: (score: string) => {
      const currMatch = get().match;
      const [homeScore, awayScore] = getScoreFromFormatted(score);

      set(() => ({
        formattedScore: score,
        match: FulfilledMatch.make({ ...currMatch, awayScore, homeScore }),
      }));
    },
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
    addAparition: async (player, matchId, token) => {
      const fetchAp = get().fetchAparitions;
      set(() => ({ upsertStatus: "IN_PROGRESS" }));
      const addApp = new AparitionUpsert(new ApiClient());
      await addApp.addAparition(player, matchId, token);
      await fetchAp(token);
      set(() => ({ upsertStatus: "DONE" }));
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

      set(() => ({ aparitions: apars }));
    },
    setConfirmed: (playerId, confirmed) => {
      const curr = get().aparitions;
      const updatedAp = curr.map((x) => {
        if (x.player?.id === playerId) return { ...x, confirmed };
        return x;
      });
      set(() => ({ aparitions: updatedAp }));
    },
    setPlayed: (playerId, played) => {
      const curr = get().aparitions;
      const updatedAp = curr.map((x) => {
        if (x.player?.id === playerId) return { ...x, played };
        return x;
      });
      set(() => ({ aparitions: updatedAp }));
    },
    setGoals: (playerId, goals) => {
      const curr = get().aparitions;
      const updatedAp = curr.map((x) => {
        if (x.player?.id === playerId) return { ...x, goals };
        return x;
      });
      set(() => ({ aparitions: updatedAp }));
    },
    setMinutes: (playerId, minutes) => {
      const curr = get().aparitions;
      const updatedAp = curr.map((x) => {
        if (x.player?.id === playerId) return { ...x, minutes };
        return x;
      });
      set(() => ({ aparitions: updatedAp }));
    },
    setRating: (playerId, rating) => {
      const curr = get().aparitions;
      const updatedAp = curr.map((x) => {
        if (x.player?.id === playerId) return { ...x, rating };
        return x;
      });
      set(() => ({ aparitions: updatedAp }));
    },
    setRedCards: (playerId, redCards) => {
      const curr = get().aparitions;
      const updatedAp = curr.map((x) => {
        if (x.player?.id === playerId) return { ...x, redCards };
        return x;
      });
      set(() => ({ aparitions: updatedAp }));
    },
    setYellowCards: (playerId, yellowCards) => {
      const curr = get().aparitions;
      const updatedAp = curr.map((x) => {
        if (x.player?.id === playerId) return { ...x, yellowCards };
        return x;
      });
      set(() => ({ aparitions: updatedAp }));
    },
  }));
};
