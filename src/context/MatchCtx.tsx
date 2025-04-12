"use client";

import {FulfilledMatch} from "@/features/match/domain/match.schema";
import {makeMatchStore, MatchStore,} from "@/features/match/domain/useMatchStore";
import {createContext, ReactNode, useContext, useRef} from "react";
import {useStore} from "zustand";

export type MatchStoreApi = ReturnType<typeof makeMatchStore>;

export const MatchStoreContext = createContext<MatchStoreApi | undefined>(
    undefined
);

export interface MatchStoreProviderProps {
    children: ReactNode;
    allMatches: FulfilledMatch[] | null;
}

export const MatchStoreProvider = ({
                                       children,
                                       allMatches,
                                   }: MatchStoreProviderProps) => {
    const storeRef = useRef<MatchStoreApi | null>(null);
    if (!storeRef.current) {
        storeRef.current = makeMatchStore({
            allMatches: allMatches ?? [],
        });
    }

    return (
        <MatchStoreContext.Provider value={storeRef.current}>
            {children}
        </MatchStoreContext.Provider>
    );
};

export const useMatchStore = <T, >(selector: (store: MatchStore) => T): T => {
    const matchStoreContext = useContext(MatchStoreContext);

    if (!matchStoreContext) {
        throw new Error(`useMatchStore must be used within MatchStoreProvider`);
    }

    return useStore(matchStoreContext, selector);
};
