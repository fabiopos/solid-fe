import { auth } from "@/auth";
import Settings from "@/features/settings/infraestructure/Settings";
import { SubscriptionGet } from "@/features/subscription/application/SubscriptionGet";
import { ApiClient } from "@/lib/ApiClient";
import { redirect } from "next/navigation";

const SettingsPage = async () => {
  const subscription = await getData();

  if (!subscription) return redirect("/");  
  return (
    <div className="">
      <h1 className="text-3xl font-extrabold my-5">Settings</h1>
      <Settings subscription={subscription} />
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
