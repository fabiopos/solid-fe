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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { teams, tree } = await getData();

  if (!teams) return redirect("/");
  return (
    <AuthWrapper>
      <SidebarProvider>
        <AppSidebar teams={teams} tree={tree} />
        <SidebarInset>
          <main className="w-full p-5">
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

async function getData() {
  const emptyState = {
    teams: [],
    tree: [],
  };
  try {
    const session = await auth();

    const teamId = await getCookieTeamId();

    const token = session?.user.access_token;
    const apiClient = new ApiClient();

    if (!token) return emptyState;

    const teamClient = new TeamGet(apiClient);
    const seasonClient = new SeasonGet(apiClient);
    const teams = await teamClient.getTeams(token);

    let tree = [];
    if (teamId) tree = await seasonClient.getSeasonTree(teamId, token);

    return { teams, tree };
  } catch (error) {
    console.error("getData", error);
    return emptyState;
  }
}
