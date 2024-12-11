import { auth } from "@/auth";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import AppBreadcumbs from "@/features/appBreadcumbs/AppBreadcumbs";
import SelectTeamModal from "@/features/team-select/infraestructure/SelectTeamModal";
import { TeamGet } from "@/features/teams/application/TeamGet";
import { ApiClient } from "@/lib/ApiClient";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const teams = await getData();

  if (!teams) return redirect("/");
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main className="w-full p-5">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <AppBreadcumbs />
          </header>
          {children}
          <SelectTeamModal teams={teams} />
          <Toaster />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

async function getData() {
  try {
    const session = await auth();
    const teamClient = new TeamGet(new ApiClient());
    const teams = await teamClient.getTeams(session?.user.access_token ?? "");
    return teams;
  } catch (error) {
    console.log(error);
    // if (error instanceof UnauthorizedError) {
    //   return redirect("/logout");
    // }
  }
}
