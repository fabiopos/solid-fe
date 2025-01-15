import { createStore } from "zustand/vanilla";

import { SubscriptionInput } from "./subscription.schema";
import { SubscriptionCreate } from "../application/SubscriptionCreate";
import { ApiClient } from "@/lib/ApiClient";
import { SubscriptionResponse } from "./types";
import { ErrorResponse, RequestStatus } from "@/types/types.common";

export type SubscriptionCreateState = {
  input: SubscriptionInput;
  status: RequestStatus;
  error: string | null;
  createdSubscription: SubscriptionResponse | null;
};

export type SubscriptionCreateActions = {
  setInput: (input: SubscriptionInput) => void;
  createSubscription: (input: SubscriptionInput) => Promise<void>;
};

export type SubscriptionCreateStore = SubscriptionCreateState &
  SubscriptionCreateActions;

export const defaultInitState: SubscriptionCreateState = {
  input: {
    documentNumber: "",
    documentType: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    teamName: "",
    policy: false,
  },
  status: "IDLE",
  error: null,
  createdSubscription: null,
};

export const makeSubscriptionCreateStore = (
  initState: SubscriptionCreateState = defaultInitState
) => {
  return createStore<SubscriptionCreateStore>()((set) => ({
    ...initState,
    createSubscription: async (input) => {
      try {
        set((state) => ({ ...state, status: "IN_PROGRESS", error: null }));
        const client = new SubscriptionCreate(new ApiClient());
        const subscription = await client.create(input);
        set((state) => ({ ...state, createdSubscription: subscription }));
        set((state) => ({ ...state, status: "DONE" }));
      } catch (error) {
        if (error instanceof Error || error instanceof ErrorResponse)
          set((state) => ({ ...state, status: "ERROR", error: error.message }));
        else
          set((state) => ({
            ...state,
            status: "ERROR",
            error: "Something went wrong!",
          }));
      }
      return;
    },
    setInput: (input) => set(() => ({ input: input })),
  }));
};
