import { ApiClient } from "@/lib/ApiClient";
import { AccountData, RequestStatus, Team } from "@/types/types.common";
import { Session, User } from "next-auth";
import { createStore } from "zustand/vanilla";
import { persist, createJSONStorage } from "zustand/middleware";

export type AuthStoreState = {
  session: Session | null;
  accountData: AccountData;
  fetchTeamsStatus: RequestStatus;
  persist: typeof persist
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
  persist: persist
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
          const client = new ApiClient();
          const token = access_token;
          if (token) {
            try {
              const response = await client.GET("/team", token);
              if (!response?.ok)
                throw new Error(
                  "Something went wrong trying to retrieve teams"
                );
              const result = await response.json();
              set((state) => ({
                fetchTeamsStatus: "DONE",
                accountData: {
                  teams: result as Team[],
                  selectedTeamId: state.accountData.selectedTeamId,
                },
              }));
            } catch (error) {
              set(() => ({ fetchTeamsStatus: "ERROR" }));
            }
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
