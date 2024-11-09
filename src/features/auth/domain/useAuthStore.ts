import { ApiClient } from "@/lib/ApiClient";
import { AccountData, RequestStatus } from "@/types/types.common";
import { Session } from "next-auth";
import { createStore } from "zustand/vanilla";
import { persist, createJSONStorage } from "zustand/middleware";
// import { signOut } from "next-auth/react";
import { TeamGet } from "@/features/teams/application/TeamGet";

export type AuthStoreState = {
  session: Session | null;
  accountData: AccountData;
  fetchTeamsStatus: RequestStatus;
  persist: typeof persist;
  error: string | null;
};
export type AuthStoreActions = {
  setTeamId(id: AuthStoreState["accountData"]["selectedTeamId"]): void;
  setTeams(teams: AuthCreateStore["accountData"]["teams"]): void;
  setSession(session: AuthStoreState["session"]): void;
  fetchTeams(access_token: string): Promise<void>;
};

export type AuthCreateStore = AuthStoreState & AuthStoreActions;

const defaultInitState: AuthStoreState = {
  session: null,
  accountData: { teams: [], selectedTeamId: null },
  fetchTeamsStatus: "IDLE",
  persist: persist,
  error: null,
};

export const makeAuthStore = (initState: AuthStoreState = defaultInitState) => {
  return createStore<AuthCreateStore>()(
    persist(
      (set) => ({
        ...initState,
        setTeamId(id) {
          set((state) => ({
            accountData: {
              teams: state.accountData?.teams ?? [],
              selectedTeamId: id,
            },
          }));
        },
        setTeams(teams) {
          set((state) => ({
            accountData: {
              teams: teams,
              selectedTeamId: state.accountData.selectedTeamId,
            },
          }));
        },
        setSession(session) {
          set(() => ({ session }));
        },
        async fetchTeams(access_token: string) {
          set(() => ({ fetchTeamsStatus: "IN_PROGRESS" }));
          const client = new TeamGet(new ApiClient());
          const token = access_token;
          if (token) {
            try {
              const teams = await client.getTeams(token)
              set((state) => ({
                fetchTeamsStatus: "DONE",
                accountData: {
                  teams: teams,
                  selectedTeamId: state.accountData.selectedTeamId,
                },
              }));
            } catch (error) {
              if (error instanceof Error)
                set(() => ({
                  fetchTeamsStatus: "ERROR",
                  error: error.message,
                }));
              else
                set(() => ({
                  fetchTeamsStatus: "ERROR",
                  error: error as string,
                }));
            }
          } else {
            set(() => ({ fetchTeamsStatus: "DONE" }));
          }
        },
      }),
      {
        name: "auth-storage",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  );
};
