import TeamCalendarComp from "@/components/Team/TeamCalendarComp";
import CompetitionBadges from "./CompetitionBadges";

async function TeamCalendatFt({
  competitions,
  minDate,
  range,
  modifiers,
  modifiersClassNames,
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
any) {
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

export default TeamCalendatFt;
