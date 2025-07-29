import { getCookieTeamId } from "@/app/actions";
import { auth } from "@/auth";
import { DashboardFacade } from "@/facade/dashboard/DashboardFacade";
import { CompetitionGet } from "@/features/competition/application/CompetitionGet";
import {
  modifiersClassNames,
  variantSelector,
} from "@/features/dashboard/domain/modifiers.helper";
import TeamCalendatFt from "@/features/dashboard/infraestructure/TeamCalendatFt";
import { ApiClient } from "@/lib/ApiClient";
import { formatRawDate } from "@/lib/date.util";
import { add, max, min, toDate } from "date-fns";
import { tryCatchAsync } from "rambdax";

async function TeamCalendarSection() {
  const {
    competitions,
    minDate,
    modifiers,
    modifiersClassNames,
    range,
    error,
  } = await getData();

  if (error) return null;
  return (
    <TeamCalendatFt
      competitions={competitions}
      minDate={minDate}
      modifiers={modifiers}
      modifiersClassNames={modifiersClassNames}
      range={range}
    />
  );
}

async function getData() {
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
    error: null,
  };
  try {
    const session = await auth();

    const teamId = await getCookieTeamId();

    if (!session) return emptyState;
    if (!teamId) return emptyState;

    const res = tryCatchAsync(() => DashboardFacade.getCalendar(), []);
    const matches = await res(undefined);

    const competitions = await getCompetitions(
      teamId,
      session.user.access_token
    );

    const dates = matches
      .filter((x) => !!x.matchDay)
      .map((x) => toDate(x.matchDay!));

    const minDate: Date = min(dates);
    const maxDate: Date = max(dates);

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
      error: null,
    };
  } catch (_error) {
    console.log(_error);
    return {
      ...emptyState,
      error: _error,
    };
  }
}

const getCompetitions = async (teamId: string, token: string) => {
  const apiClient = new ApiClient();
  const competitionGet = new CompetitionGet(apiClient);

  const res = tryCatchAsync(
    () => competitionGet.getAllByTeam(teamId, token),
    []
  );
  const allCompetitions = await res(undefined);

  const competitions = allCompetitions
    .filter((x) => !!x.id)
    .filter((x) => (x.matches ?? []).length > 0);

  return competitions;
};

export default TeamCalendarSection;
