import { getCookieTeamId } from "@/app/actions";
import { auth } from "@/auth";
import { ApiClient } from "@/lib/ApiClient";
import { add, max, min, toDate } from "date-fns";
import { CompetitionGet } from "@/features/competition/application/CompetitionGet";
import TeamCalendarComp from "@/components/Team/TeamCalendarComp";

import CompetitionBadges from "./CompetitionBadges";
import { formatRawDate } from "@/lib/date.util";
import {
  modifiersClassNames,
  variantSelector,
} from "../domain/modifiers.helper";
import { DashboardFacade } from "@/facade/dashboard/DashboardFacade";

async function TeamCalendatFt() {
  const { minDate, range, modifiers, modifiersClassNames, competitions } =
    await getData();

  return (
    <div className="">
      <div className="p-5">
        <h3 className="text-2xl font-bold tracking-tight max-lg:text-center">
          Team Calendar
        </h3>
      </div>

      <CompetitionBadges competitions={competitions} />

      <div className="px-1">
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
  const competitionGet = new CompetitionGet(apiClient);
  const matches = await DashboardFacade.getCalendar();

  const dates = matches
    .filter((x) => !!x.matchDay)
    .map((x) => toDate(x.matchDay!));

  const minDate: Date = min(dates);
  const maxDate: Date = max(dates);

  const allCompetitions = await competitionGet.getAllByTeam(
    teamId,
    session.user.access_token
  );

  const competitions = allCompetitions
    .filter((x) => !!x.id)
    .filter((x) => (x.matches ?? []).length > 0);

  const competitionIds = competitions.map((x) => x.id!);

  const range = {
    from: minDate,
    to: maxDate,
  };

  const matchEvents = matches
    .filter((x) => !!x.matchDay)
    .map((x) => ({
      day: formatRawDate(x.matchDay!),
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
