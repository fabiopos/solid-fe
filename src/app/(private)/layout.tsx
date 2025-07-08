import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import AppBreadcumbs from "@/features/appBreadcumbs/AppBreadcumbs";
import { redirect } from "next/navigation";
import { AuthWrapper } from "@/context/AuthWrapper";
import { Effect } from "effect";
import { getInitialData } from "@/actions/init.action";
import { PrivateLayoutData } from "@/types/layout.types";

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

const emptyState: PrivateLayoutData = {
  teams: [],
  tree: [],
  isTeamSelected: false,
  selectedTeam: undefined,
  error: undefined,
  selectedTeamId: undefined,
  token: undefined,
};

async function getData(): Promise<PrivateLayoutData> {
  try {
    const dataExecutor = await Effect.runPromise(getInitialData());
    return dataExecutor;
  } catch (error) {
    console.error("Failed to initialize data:", error);
    return emptyState;
  }
}
