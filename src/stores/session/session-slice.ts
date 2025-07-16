import { User } from "next-auth";
import { StateCreator } from "zustand";
import { Store } from "@/types/store";

export type SessionState = {
  isSignedIn: boolean;
  user: User | undefined;
  selectedTeamId: string | undefined;
};

export type SessionActions = {
  signIn: (user: User) => void;
  signOut: () => void;
};

export type SessionSlice = SessionState & SessionActions;

const defaultState: SessionState = {
  isSignedIn: false,
  user: undefined,
  selectedTeamId: undefined,
};

export const createSessionSlice: StateCreator<
  Store,
  [["zustand/immer", never]],
  [],
  SessionSlice
> = (set, _get) => ({
  ...defaultState,
  signIn: (user) =>
    set((state) => {
      state.user = user;
      state.isSignedIn = !!user;
    }),
  signOut() {
    set((state) => {
      state.isSignedIn = false;
      state.user = undefined;
    });
  },
});
