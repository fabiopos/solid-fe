import { auth } from "@/auth";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import AppBreadcumbs from "@/features/appBreadcumbs/AppBreadcumbs";
import { SeasonGet } from "@/features/seasons/application/SeasonGet";
import { TeamGet } from "@/features/teams/application/TeamGet";
import { ApiClient } from "@/lib/ApiClient";
import { redirect } from "next/navigation";
import { getCookieTeamId } from "../actions";
import { AuthWrapper } from "@/context/AuthWrapper";
import { Team } from "@/types/types.common";
import { Effect, pipe, Schedule } from "effect";
import { getSession } from "next-auth/react";
import { getToken } from "@/actions/dashboard.actions";
import { get } from "http";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await getData();
  const { teams, tree, isTeamSelected, selectedTeam } = data;
  if (!teams) return redirect("/");
  return (
    <AuthWrapper>
      <SidebarProvider>
        <AppSidebar
          teams={teams}
          tree={tree}
          isteamselected={isTeamSelected}
          selectedTeam={selectedTeam}
        />
        <SidebarInset>
          <main className="w-full p-5 dark:bg-background bg-slate-50 border-t">
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <AppBreadcumbs />
            </header>
            {children}
            {/* <SelectTeamModal teams={teams} /> */}
            <Toaster />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </AuthWrapper>
  );
}

interface PrivateLayoutData {
  teams: Team[];
  tree: unknown;
  isTeamSelected: boolean;
  selectedTeam: Team | undefined;
  selectedTeamId: string | undefined;
  error: string | undefined;
}
const emptyState: PrivateLayoutData = {
  teams: [],
  tree: [],
  isTeamSelected: false,
  selectedTeam: undefined,
  error: undefined,
  selectedTeamId: undefined,
};

async function getData(): Promise<PrivateLayoutData> {
  try {
    const token = await Effect.runPromise(getTokenRetry());
    const apiClient = new ApiClient();

    const teams = await getTeams(apiClient, token);
    const selectedTeam = await getSelectedOrDefaultTeam(teams);

    let tree = [];
    if (selectedTeam)
      tree = await getSeasonTree(apiClient, selectedTeam?.id, token);

    const payload = {
      ...emptyState,
      teams,
      tree,
      selectedTeam,
      isTeamSelected: !!selectedTeam,
    } as PrivateLayoutData;

    return payload;
  } catch (error) {
    return emptyState;
  }
}

function getTeams(apiClient: ApiClient, token: string) {
  const teamClient = new TeamGet(apiClient);
  return teamClient.getTeams(token);
}

function getSeasonTree(apiClient: ApiClient, teamId: string, token: string) {
  const seasonClient = new SeasonGet(apiClient);
  return seasonClient.getSeasonTree(teamId, token);
}

function getTokenRetry() {
  const policy = Schedule.addDelay(Schedule.recurs(2), () => "100 millis");
  const task = getToken();
  const p = Effect.retryOrElse(task, policy, () =>
    Effect.fail(new Error("No token found after retries"))
  );
  return p;
}

async function getSelectedOrDefaultTeam(teams: Team[]) {
  const teamId = await getCookieTeamId();
  if (teamId) {
    return teams.find((team) => team.id === teamId);
  }
  return teams.length > 0 ? teams[0] : undefined;
}
