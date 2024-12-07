import { auth } from "@/auth";
import { Toaster } from "@/components/ui/toaster";
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
    <main className="w-full p-5">
      {children}
      <SelectTeamModal teams={teams} />
      <Toaster />
    </main>
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
