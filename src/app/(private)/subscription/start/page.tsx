import SubscriptionCard from "@/components/Subscription/Card/Card";

const plans = [
  {
    id: "Free",
    description: "For begginners",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. In sapiente hic eveniet.",
    buttonLabel: "Subscribe now",
  },
  {
    id: "Standard",
    description: "For rising team managers",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. In sapiente hic eveniet.",
    buttonLabel: "Subscribe now",
  },
  {
    id: "Pro",
    description: "For expert team managers",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. In sapiente hic eveniet.",
    buttonLabel: "Subscribe now",
  },
];

export default function StartSubscription() {
  return (
    <div>
      <div className="flex flex-1 gap-2">
        {plans.map((plan) => (
          <SubscriptionCard
            key={plan.id}
            content={plan.content}
            description={plan.description}
            buttonLabel={plan.buttonLabel}
            planId={plan.id}
          />
        ))}
      </div>
    </div>
  );
}
