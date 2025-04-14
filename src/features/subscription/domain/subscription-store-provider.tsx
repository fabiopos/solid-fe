"use client";

import {createContext, type ReactNode, useContext, useRef} from "react";
import {useStore} from "zustand";

import {
  makeSubscriptionCreateStore,
  type SubscriptionCreateStore,
} from "@/features/subscription/domain/useSubscriptionCreateStore";

export type SubscriptionCreateStoreApi = ReturnType<
    typeof makeSubscriptionCreateStore
>;

export const SubscriptionCreateStoreContext = createContext<
    SubscriptionCreateStoreApi | undefined
>(undefined);

export interface SubscriptionCreateStoreProviderProps {
    children: ReactNode;
}

export const SubscriptionCreateStoreProvider = (
    {
        children,
    }: SubscriptionCreateStoreProviderProps) => {
    const storeRef = useRef<SubscriptionCreateStoreApi | null>(null);
    if (!storeRef.current) {
        storeRef.current = makeSubscriptionCreateStore();
    }

    return (
        <SubscriptionCreateStoreContext.Provider value={storeRef.current}>
            {children}
        </SubscriptionCreateStoreContext.Provider>
    );
};

export const useSubscriptionCreateStore = <T, >(
    selector: (store: SubscriptionCreateStore) => T
): T => {
    const subscriptionCreateStoreContext = useContext(
        SubscriptionCreateStoreContext
    );

    if (!subscriptionCreateStoreContext) {
        throw new Error(`useSubscriptionCreateStore must be used within SubscriptionCreateStoreProvider`);
    }

    return useStore(subscriptionCreateStoreContext, selector);
};
