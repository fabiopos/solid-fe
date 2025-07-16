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
import { StoreProvider } from "@/providers/store.provider";
import { auth } from "@/auth";
import { Store } from "@/types/store";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialData = await getData();
  const { teams } = initialData;
  if (!teams) return redirect("/");
  return (
    <StoreProvider
      initialState={{
        ...initialData,
      }}
    >
      <AuthWrapper>
        <SidebarProvider>
          <AppSidebar />
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
    </StoreProvider>
  );
}

async function getData(): Promise<Partial<Store>> {
  try {
    const res = await auth();

    const data = await Effect.runPromise(getInitialData());
    return {
      teams: data.teams,
      isSignedIn: !!res?.user.access_token,
      user: res?.user,
      tree: data.tree as never,
      selectedTeamId: data.selectedTeamId,
    };
  } catch (error) {
    console.log("Failed to initialize data:", error);
    return {};
  }
}
