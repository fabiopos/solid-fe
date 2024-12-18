import { FulfilledCompetition } from "@/features/competition/domain/competition.schema";
import { EmptyMatch, FulfilledMatch } from "./match.schema";
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
import { MatchUpdate } from "../application/MatchUpdate";

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
  formattedScore: string;
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
  formattedScore: "00",
  scoreRequestStatus: "IDLE",
};

export const makeMatchDetailsStore = (
  initProps?: Partial<MatchDetailsStoreState>
) => {
  return createStore<MatchDetailsStore>()((set, get) => ({
    ...defaultInitialState,
    ...initProps,
    formattedScore: `${initProps?.match?.homeScore ?? 0}${
      initProps?.match?.awayScore ?? 0
    }`,
    putScore: async (token: string) => {
      const fScore = get().formattedScore;
      const matchId = get().match?.id;
      set(() => ({ scoreRequestStatus: "IN_PROGRESS" }));
      if (!matchId) return;

      const [homeScore, awayScore] = fScore.split("");
      const client = new ApiClient();
      const mClient = new MatchUpdate(client);
      try {
        await mClient.updateMatch(
          matchId,
          EmptyMatch.make({
            homeScore: Number(homeScore),
            awayScore: Number(awayScore),
          }),
          token
        );
        set(() => ({ scoreRequestStatus: "DONE" }));
      } catch (error) {
        set(() => ({ scoreRequestStatus: "ERROR" }));
      }
    },
    setScore: (score: string) => {
      set(() => ({ formattedScore: score }));
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
