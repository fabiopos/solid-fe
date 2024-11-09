import { SubscriptionCreateStoreProvider } from "@/features/subscription/domain/subscription-store-provider";
import CreateSubscription from "@/features/subscription/infraestructure/CreateSubscription";

interface StartPlanPageProps {
  params: Promise<{ planId: string }>;
}

export default async function StartPlanPage({ params }: StartPlanPageProps) {
  const { planId } = await params;

  return (
    <SubscriptionCreateStoreProvider>
      <div>
        <CreateSubscription planId={planId} />
      </div>
    </SubscriptionCreateStoreProvider>
  );
}
