"use client";

import {useStore} from "zustand";
import {createContext, type ReactNode, useContext, useRef} from "react";
import {makeNewPlayerStore, NewPlayerStore,} from "@/features/players/domain/useNewPlayerStore";

export type NewPlayerStoreApi = ReturnType<typeof makeNewPlayerStore>;

export const NewPlayerStoreContext = createContext<
    NewPlayerStoreApi | undefined
>(undefined);

export interface NewPlayerStoreProviderProps {
    children: ReactNode;
}

export const NewPlayerStoreProvider = (
    {
        children,
    }: NewPlayerStoreProviderProps) => {
    const storeRef = useRef<NewPlayerStoreApi | null>(null);
    if (!storeRef.current) {
        storeRef.current = makeNewPlayerStore();
    }

    return (
        <NewPlayerStoreContext.Provider value={storeRef.current}>
            {children}
        </NewPlayerStoreContext.Provider>
    );
};

export const useNewPlayerStore = <T, >(
    selector: (store: NewPlayerStore) => T
): T => {
    const newPlayerStoreContext = useContext(NewPlayerStoreContext);

    if (!newPlayerStoreContext) {
        throw new Error(
            `useNewPlayerStore must be used within NewPlayerStoreProvider`
        );
    }

    return useStore(newPlayerStoreContext, selector);
};
