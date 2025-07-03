"use client";

const pricing = {
  tiers: [
    {
      title: "Free",
      price: 0,
      frequency: "/forever",
      description: "Perfect for casual teams getting started.",
      features: [
        "1 team",
        "Up to 15 players",
        "Basic lineup builder",
        "Match schedule view",
        "Player availability",
      ],
      cta: "Free forever",
      mostPopular: false,
    },
    {
      title: "Team Pro",
      price: 5,
      frequency: "/month",
      description: "Designed for active teams that want full control.",
      features: [
        "Unlimited players",
        "Lineup planner + drag & drop",
        "Player stats & attendance tracking",
        "Injury reports",
        "League table tracking",
        "Priority support",
      ],
      cta: "Start 7-day free trial",
      mostPopular: true,
    },
    {
      title: "Club Plus",
      price: 8,
      frequency: "/month",
      description: "Best for clubs managing multiple teams or competitions.",
      features: [
        "Multiple team support",
        "Coach and staff roles",
        "Centralized calendar & events",
        "Team performance reports",
        "Custom branding",
        "Early access to new features",
        "Dedicated onboarding",
      ],
      cta: "Contact sales",
      mostPopular: false,
    },
  ],
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Pricing() {
  return (
    <div className="bg-transparent py-24 sm:py-32">
      <section
        aria-labelledby="pricing-heading"
        className="relative mx-auto max-w-7xl px-6 lg:px-8"
      >
        <h2 className="text-pretty text-5xl font-semibold tracking-tight text-cyan-600 dark:text-cyan-300 sm:text-balance sm:text-6xl pb-14">
          Simple, honest pricing
        </h2>
        <div className="mx-auto max-w-2xl space-y-12 px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:space-y-0 lg:px-8">
          {pricing.tiers.map((tier) => (
            <div
              key={tier.title}
              className="relative flex flex-col rounded-2xl border border-gray-200 bg-cyan-500/50 dark:bg-cyan-950 p-8 shadow-sm"
            >
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-cyan-600 dark:text-cyan-300">
                  {tier.title}
                </h3>
                {tier.mostPopular ? (
                  <p className="absolute top-0 -translate-y-1/2 transform rounded-full bg-cyan-500 px-4 py-1.5 text-sm font-semibold text-white shadow-lg shadow-cyan-200/50">
                    Most popular
                  </p>
                ) : null}
                <p className="mt-4 flex items-baseline text-cyan-600 dark:text-cyan-300">
                  <span className="text-5xl font-bold tracking-tight">
                    ${tier.price}
                  </span>
                  <span className="ml-1 text-xl font-semibold">
                    {tier.frequency}
                  </span>
                </p>
                <p className="mt-6 text-gray-600 dark:text-gray-300">
                  {tier.description}
                </p>

                <ul role="list" className="mt-6 space-y-6">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-5 flex-none text-cyan-600 dark:text-cyan-300"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                        />
                      </svg>
                      <span className="ml-3 text-gray-600 dark:text-gray-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="#"
                className={classNames(
                  tier.mostPopular
                    ? "bg-cyan-500 text-white hover:bg-cyan-600"
                    : "bg-cyan-50 text-cyan-700 hover:bg-cyan-100",
                  "mt-8 block w-full rounded-md border border-transparent px-6 py-3 text-center font-medium"
                )}
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
