import { RequestStatus } from "@/types/types.common";
import { createStore } from "zustand";
import { ApiClient } from "@/lib/ApiClient";
import { EmptyMatch, FulfilledMatch } from "./match.schema";
import { MatchDelete } from "../application/MatchDelete";
import { MatchCreate } from "../application/MatchCreate";
import { MatchUpdate } from "../application/MatchUpdate";
import { MatchGet } from "../application/MatchGet";

export type MatchStoreState = {
  selectedMatch: FulfilledMatch | null;
  emptyMatch: EmptyMatch | null;
  allMatches: FulfilledMatch[];
  postingStatus: RequestStatus;
  patchingStatus: { id: string | null; status: RequestStatus };
  deletingStatus: { id: string | null; status: RequestStatus };
};

export type MatchStoreActions = {
  postMatch: (emptyMatch: EmptyMatch, token: string) => Promise<void>;
  patchMatch: (
    MatchId: string,
    emptyMatch: EmptyMatch,
    token: string
  ) => Promise<void>;
  deleteMatch: (matchId: string, token: string) => Promise<void>;
  fetchMatches: (competitionId: string, token: string) => Promise<void>;
  setSelectedMatch: (selectedMatch: FulfilledMatch | null) => void;
  updateSelectedMatch: (emptyMatch: EmptyMatch | null) => void;
};

export type MatchStore = MatchStoreState & MatchStoreActions;

const defaultInitState: MatchStoreState = {
  allMatches: [],
  deletingStatus: { id: null, status: "IDLE" },
  postingStatus: "IDLE",
  patchingStatus: { id: null, status: "IDLE" },
  emptyMatch: null,
  selectedMatch: null,
};

export const makeMatchStore = (initProps?: Partial<MatchStoreState>) => {
  return createStore<MatchStore>()((set, get) => ({
    ...defaultInitState,
    ...initProps,
    fetchMatches: async (competitionId: string, token: string) => {
      const client = new MatchGet(new ApiClient());
      const matches = await client.getByCompetition(competitionId, token);
      set(() => ({ allMatches: matches }));
    },
    deleteMatch: async (matchId: string, token: string) => {
      const curr = get().allMatches;
      const client = new MatchDelete(new ApiClient());
      set(() => ({
        deletingStatus: { id: matchId, status: "IN_PROGRESS" },
      }));
      await client.deleteMatch(matchId, token);

      set(() => ({
        allMatches: curr.filter((x) => x.id !== matchId),
        deletingStatus: { id: matchId, status: "DONE" },
      }));
    },
    postMatch: async (emptyMatch: EmptyMatch, token: string) => {
      const client = new MatchCreate(new ApiClient());
      const prev = get().allMatches;
      set(() => ({ postingStatus: "IN_PROGRESS" }));
      const createdMatch = await client.createMatch(emptyMatch, token);
      set(() => ({
        allMatches: [...prev, createdMatch],
        postingStatus: "DONE",
      }));
    },
    patchMatch: async (matchId, emptyMatch, token) => {
      const client = new MatchUpdate(new ApiClient());
      const prev = get().allMatches;
      set(() => ({
        patchingStatus: { id: matchId, status: "IN_PROGRESS" },
      }));
      const updatedMatch = await client.updateMatch(matchId, emptyMatch, token);
      if (!updatedMatch) {
        set(() => ({ patchingStatus: { id: matchId, status: "ERROR" } }));
        return;
      }

      set(() => ({
        allMatches: prev.map((x) => {
          if (x.id === matchId) return updatedMatch;
          return x;
        }),
        patchingStatus: { id: matchId, status: "DONE" },
      }));
    },
    setSelectedMatch: (selectedMatch: FulfilledMatch | null) => {
      set(() => ({ selectedMatch }));
    },
    updateSelectedMatch: (emptyMatch) => {
      const curr = get().selectedMatch;

      set(() => ({
        selectedMatch: FulfilledMatch.make({
          ...curr,
          ...emptyMatch,
        }),
      }));
    },
  }));
};
