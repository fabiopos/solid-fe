"use client";

import {useStore} from "zustand";
import {createContext, type ReactNode, useContext, useRef} from "react";
import {type AuthCreateStore, makeAuthStore,} from "@/features/auth/domain/useAuthStore";
import {Team} from "@/types/types.common";

export type AuthStoreApi = ReturnType<typeof makeAuthStore>;

export const AuthStoreStoreContext = createContext<AuthStoreApi | undefined>(
    undefined
);

export interface AuthStoreProviderProps {
    children: ReactNode;
    teams: Team[];
    selectedTeamId: null | string;
}

export const AuthStoreProvider = (
    {
        children,
        selectedTeamId,
        teams,
    }: AuthStoreProviderProps) => {
    const storeRef = useRef<AuthStoreApi | null>(null);

    if (!storeRef.current) {
        storeRef.current = makeAuthStore({
            teams,
            selectedTeamId,
        });
    }

    return (
        <AuthStoreStoreContext.Provider value={storeRef.current}>
            {children}
        </AuthStoreStoreContext.Provider>
    );
};

export const useAuthStore = <T, >(
    selector: (store: AuthCreateStore) => T
): T => {
    const authStoreContext = useContext(AuthStoreStoreContext);

    if (!authStoreContext) {
        throw new Error(
            `useAuthStore must be used within SubscriptionCreateStoreProvider`
        );
    }

    return useStore(authStoreContext, selector);
};
