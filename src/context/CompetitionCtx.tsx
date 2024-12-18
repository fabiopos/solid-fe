"use client";

import {
  CompetitionType,
  FulfilledCompetition,
} from "@/features/competition/domain/competition.schema";
import {
  CompetitionStore,
  makeCompetitionStore,
} from "@/features/competition/domain/useCompetitionStore";
import { FulfilledSeason } from "@/features/seasons/domain/season.schema";
import { toDate } from "date-fns";
import { createContext, ReactNode, useContext, useRef } from "react";
import { useStore } from "zustand";

export type CompetitionStoreApi = ReturnType<typeof makeCompetitionStore>;

export const CompetitionStoreContext = createContext<
  CompetitionStoreApi | undefined
>(undefined);

export interface CompetitionStoreProviderProps {
  children: ReactNode;
  allCompetitions?: FulfilledCompetition[];
  season: FulfilledSeason | null;
}

export const CompetitionStoreProvider = ({
  children,
  season,
  allCompetitions: payloadComps,
}: CompetitionStoreProviderProps) => {
  const storeRef = useRef<CompetitionStoreApi>();
  if (!storeRef.current) {
    const allCompetitions = payloadComps ?? getCompetitions(season);
    const selectedCompetition =
      allCompetitions?.length > 0 ? allCompetitions[0] : undefined;
    console.log(selectedCompetition, allCompetitions);
    storeRef.current = makeCompetitionStore({
      allCompetitions,
      selectedCompetition,
    });
  }

  return (
    <CompetitionStoreContext.Provider value={storeRef.current}>
      {children}
    </CompetitionStoreContext.Provider>
  );
};

export const useCompetitionStore = <T,>(
  selector: (store: CompetitionStore) => T
): T => {
  const competitionStoreContext = useContext(CompetitionStoreContext);

  if (!competitionStoreContext) {
    throw new Error(
      `useCompetitionStore must be used within CompetitionStoreProvider`
    );
  }

  return useStore(competitionStoreContext, selector);
};

function getCompetitions(
  season: FulfilledSeason | null
): FulfilledCompetition[] {
  const competitions = season?.competitions ?? ([] as CompetitionType[]);
  const fcompetitions = competitions.map(mapToDomain);
  return fcompetitions;
}

function mapToDomain(competition: CompetitionType) {
  return FulfilledCompetition.make({
    ...competition,
    startDate: competition.startDate && toDate(competition.startDate),
    endDate: competition.endDate && toDate(competition.endDate),
    createdAt: competition.createdAt && toDate(competition.createdAt),
  });
}
