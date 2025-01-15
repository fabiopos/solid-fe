import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MyRivals from "@/features/settings/infraestructure/MyRivals";
import MyTeams from "@/features/settings/infraestructure/MyTeams";
import Settings from "@/features/settings/infraestructure/Settings";
import { SubscriptionGet } from "../../../features/subscription/application/subscriptionget";
import { FulfilledTeam } from "@/features/teams/domain/team.schema";
import { ApiClient } from "@/lib/ApiClient";

const SettingsPage = async () => {
  const subscription = await getData();
  const myTeams = subscription?.teams?.filter((x) => x.hasSubscription) ?? [];
  const myRivals = subscription?.teams?.filter((x) => !x.hasSubscription) ?? [];

  if (!subscription) return redirect("/");
  return (
    <div className="">
      <h1 className="text-3xl font-extrabold my-5">Settings</h1>
      <Tabs defaultValue="general" className="w-[600px] bg-background border rounded-lg">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="my-teams">My Teams</TabsTrigger>
          <TabsTrigger value="my-rivals">My Rivals</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Settings subscription={subscription} />
        </TabsContent>

        <TabsContent value="my-teams">
          <MyTeams teams={myTeams as FulfilledTeam[]} />
        </TabsContent>

        <TabsContent value="my-rivals">
          <MyRivals teams={myRivals as FulfilledTeam[]} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

const getData = async () => {
  const session = await auth();
  const client = new SubscriptionGet(new ApiClient());

  if (!session) return null;
  if (!session.user.subscriptionId) return null;

  return await client.getSubscription(
    session?.user.access_token,
    session.user.subscriptionId
  );
};

export default SettingsPage;
