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
  error: string | undefined;
}
const emptyState: PrivateLayoutData = {
  teams: [],
  tree: [],
  isTeamSelected: false,
  selectedTeam: undefined,
  error: undefined,
};

async function getData(): Promise<PrivateLayoutData> {
  try {
    const session = await auth();
    const teamId = await getCookieTeamId();   

    const token = session?.user.access_token;

    if (!token)
      return {
        ...emptyState,
        isTeamSelected: true,
        selectedTeam: undefined,
        error: "No token",
      };

    const apiClient = new ApiClient();
    const teamClient = new TeamGet(apiClient);
    const seasonClient = new SeasonGet(apiClient);
    const teams = await teamClient.getTeams(token);

    let tree = [];
    if (teamId) tree = await seasonClient.getSeasonTree(teamId, token);

    const selectedTeam = teams.find((x) => x.id === teamId);
    
    return {
      teams,
      tree,
      isTeamSelected: !!teamId,
      selectedTeam,
      error: !!teamId ? undefined : 'No team selected',
    };
  } catch (error) {
    console.error("getData", error);
    return emptyState;
  }
}
