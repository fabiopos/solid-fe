import { ReactNode } from "react";
import { AuthStoreProvider } from "./AuthCtx";
import { getCookieTeamId } from "@/app/actions";
import { auth } from "@/auth";
import { TeamGet } from "@/features/teams/application/TeamGet";
import { ApiClient } from "@/lib/ApiClient";

export async function AuthWrapper({ children }: { children: ReactNode }) {
    const { selectedTeamId, teams } = await getAuthData();
    return (
      <AuthStoreProvider selectedTeamId={selectedTeamId} teams={teams}>
        {children}
      </AuthStoreProvider>
    );
  }
  
  const getAuthData = async () => {
    const session = await auth();
    const selectedTeamId = await getCookieTeamId();
  
    if (!session?.user.access_token) return { teams: [], selectedTeamId: null };
  
    const teamGet = new TeamGet(new ApiClient());
    const subscriptionTeams = await teamGet.getTeams(session.user.access_token);
  
    return { teams: subscriptionTeams, selectedTeamId: selectedTeamId ?? null };
  };
 