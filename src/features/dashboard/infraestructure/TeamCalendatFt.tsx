import { getCookieTeamId } from "@/app/actions";
import { auth } from "@/auth";
import { ApiClient } from "@/lib/ApiClient";
import { DashboardGet } from "../application/DashboardGet";
import { add, max, min, toDate } from "date-fns";
import { CompetitionGet } from "@/features/competition/application/CompetitionGet";
import { Variant } from "@/types/types.common";
import { twMerge } from "tailwind-merge";
import TeamCalendarComp from "@/components/Team/TeamCalendarComp";

import CompetitionBadges from "./CompetitionBadges";

const variantSelector: Variant[] = [
  "default" as Variant,
  "warning" as Variant,
  "success" as Variant,
  "destructive" as Variant,
  "success" as Variant,
];

async function TeamCalendatFt() {
  const { minDate, range, modifiers, modifiersClassNames, competitions } =
    await getData();

  console.log(modifiers, modifiersClassNames);
  return (
    <div className="p-2">
      <div className="px-5">
        <h3 className="text-lg font-bold tracking-tight text-white max-lg:text-center">
          Calendar
        </h3>
      </div>

      <CompetitionBadges competitions={competitions} />

      <div className="px-5 relative">
        <TeamCalendarComp
          minDate={minDate}
          range={range}
          modifiers={modifiers}
          modifiersClassNames={modifiersClassNames}
        />
      </div>
    </div>
  );
}

const modifierCss = (variant: Variant) =>
  twMerge(
    "text-red rounded-full",
    variant === "default" && "bg-primary",
    variant === "destructive" && "bg-destructive hover:bg-destructive/50",
    variant === "secondary" && "bg-secondary",
    variant === "success" && "bg-success hover:bg-green-500/50",
    variant === "warning" && "bg-orange-500 hover:bg-orange-500/50"
  );

const modifiersClassNames = (records: { key: string; variant: Variant }[]) => {
  const modifiers = records.reduce(
    (prev, curr) => ({
      ...prev,
      [curr.key]: modifierCss(curr.variant),
    }),
    {}
  );

  return modifiers;
};

async function getData() {
  const session = await auth();

  const teamId = await getCookieTeamId();

  const emptyState = {
    matches: [],
    minDate: new Date(),
    maxDate: add(new Date(), { months: 12 }),
    range: {
      from: new Date(),
      to: add(new Date(), { months: 1 }),
    },
    modifiers: {},
    modifiersClassNames: undefined,
    competitions: [],
  };

  if (!session) return emptyState;
  if (!teamId) return emptyState;

  const apiClient = new ApiClient();
  const client = new DashboardGet(apiClient);
  const competitionGet = new CompetitionGet(apiClient);
  const matches = await client.getCalendar(teamId, session.user.access_token);

  const dates = matches
    .filter((x) => !!x.matchDay)
    .map((x) => toDate(x.matchDay!));

  const minDate: Date = min(dates);
  const maxDate: Date = max(dates);

  const competitions = await competitionGet.getAllByTeam(
    teamId,
    session.user.access_token
  );

  const competitionIds = competitions
    .filter((x) => !!x.id)    
    .map((x) => x.id!);

  const range = {
    from: minDate,
    to: maxDate,
  };

  const cDate = (date: Date | string): Date => {
    const dDate = toDate(date);
    const mth = dDate.getMonth();
    const day = dDate.getDate();
    const year = dDate.getFullYear();
    return new Date(year, mth, day);
  };

  const matchEvents = matches
    .filter((x) => !!x.matchDay)
    .map((x) => ({
      day: cDate(x.matchDay!),
      title: x.title,
      competitionId: x.competition?.id,
      awayTeamName: x.awayTeam?.name,
      location: x.location,
      matchHour: x.matchHour,
      awayScore: x.awayScore,
      homeScore: x.homeScore,
      homeName: x.homeTeam?.name,
    }));

  const modifiers = competitionIds.reduce(
    (prev, curr) => ({
      ...prev,
      [curr]: matchEvents
        .filter((x) => x.competitionId === curr)
        .map((x) => x.day),
    }),
    {}
  );

  const buildModifierClassNames = () => {
    return competitionIds.map((c, i) => ({
      key: c,
      variant: variantSelector[i % 4],
      name: competitions[i].name,
    }));
  };

  const competitionsWithVariants = buildModifierClassNames();

  return {
    matches,
    minDate,
    maxDate,
    range,
    matchEvents,
    modifiers,
    modifiersClassNames: modifiersClassNames(competitionsWithVariants),
    competitions: competitionsWithVariants,
  };
}

export default TeamCalendatFt;
