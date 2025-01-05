import { RequestStatus } from "@/types/types.common";
import { EmptyCompetition, FulfilledCompetition } from "./competition.schema";
import { createStore } from "zustand";
import { CompetitionDelete } from "../application/CompetitionDelete";
import { ApiClient } from "@/lib/ApiClient";
import { CompetitionCreate } from "../application/CompetitionCreate";
import { CompetitionUpdate } from "../application/CompetitionUpdate";

export type CompetitionStoreState = {
  selectedCompetition: FulfilledCompetition | null;
  emptyCompetition: EmptyCompetition | null;
  allCompetitions: FulfilledCompetition[];
  postingStatus: RequestStatus;
  patchingStatus: { id: string | null; status: RequestStatus };
  deletingStatus: { id: string | null; status: RequestStatus };
};

export type CompetitionStoreActions = {
  postCompetition: (
    emptyCompetition: EmptyCompetition,
    seasonId: string,
    token: string
  ) => Promise<void>;
  patchCompetition: (
    competitionId: string,
    emptyCompetition: EmptyCompetition,
    token: string
  ) => Promise<void>;
  deleteCompetition: (competitionId: string, token: string) => Promise<void>;
  setSelectedCompetition: (
    selectedCompetition: FulfilledCompetition | null
  ) => void;
  updateSelectedCompetition: (
    emptyCompetition: EmptyCompetition | null
  ) => void;
  setCompetitions: (competitions: FulfilledCompetition[]) => void;
};

export type CompetitionStore = CompetitionStoreState & CompetitionStoreActions;

const defaultInitState: CompetitionStoreState = {
  allCompetitions: [],
  deletingStatus: { id: null, status: "IDLE" },
  postingStatus: "IDLE",
  patchingStatus: { id: null, status: "IDLE" },
  emptyCompetition: null,
  selectedCompetition: null,
};

export const makeCompetitionStore = (
  initProps?: Partial<CompetitionStoreState>
) => {
  return createStore<CompetitionStore>()((set, get) => ({
    ...defaultInitState,
    ...initProps,
    deleteCompetition: async (competitionId: string, token: string) => {
      const curr = get().allCompetitions;
      const client = new CompetitionDelete(new ApiClient());
      set(() => ({
        deletingStatus: { id: competitionId, status: "IN_PROGRESS" },
      }));
      await client.deleteCompetition(competitionId, token);

      set(() => ({
        allCompetitions: curr.filter((x) => x.id !== competitionId),
        deletingStatus: { id: competitionId, status: "ERROR" },
      }));
    },
    postCompetition: async (
      emptyCompetition: EmptyCompetition,
      seasonId: string,
      token: string
    ) => {
      const client = new CompetitionCreate(new ApiClient());
      const prev = get().allCompetitions;
      set(() => ({ postingStatus: "IN_PROGRESS" }));
      const createdCompetition = await client.createCompetition(
        emptyCompetition,
        seasonId,
        token
      );
      set(() => ({
        allCompetitions: [...prev, createdCompetition],
        postingStatus: "DONE",
      }));
    },
    patchCompetition: async (competitionId, emptyCompetition, token) => {
      const client = new CompetitionUpdate(new ApiClient());
      const prev = get().allCompetitions;
      set(() => ({
        patchingStatus: { id: competitionId, status: "IN_PROGRESS" },
      }));
      const updatedCompetition = await client.updateCompetition(
        competitionId,
        emptyCompetition,
        token
      );
      if (!updatedCompetition) {
        set(() => ({ patchingStatus: { id: competitionId, status: "ERROR" } }));
        return;
      }

      set(() => ({
        allCompetitions: prev.map((x) => {
          if (x.id === competitionId) return updatedCompetition;
          return x;
        }),
        patchingStatus: { id: competitionId, status: "DONE" },
        selectedCompetition: updatedCompetition,
      }));
    },
    setSelectedCompetition: (
      selectedCompetition: FulfilledCompetition | null
    ) => {
      set(() => ({ selectedCompetition }));
    },
    updateSelectedCompetition: (emptyCompetition) => {
      const curr = get().selectedCompetition;

      set(() => ({
        selectedCompetition: FulfilledCompetition.make({
          ...curr,
          ...emptyCompetition,
        }),
      }));
    },
    setCompetitions: (competitions) => {
      set(() => ({ allCompetitions: competitions }));
    },
  }));
};
