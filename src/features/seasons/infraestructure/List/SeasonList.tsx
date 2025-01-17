import { useMemo } from "react";
import { format } from "date-fns";
import Link from "next/link";
import { ChevronRight, Link2Icon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSeasonStore } from "@/context/SeasonCtx";
import { useCompetitionStore } from "@/context/CompetitionCtx";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import SeasonStatusBadge from "@/components/Season/SeasonStatusBadge";
import SeasonActionTriggerIcon from "../Season/SeasonActionTriggerIcon";
import CompetitionTriggerIcon from "../Details/CompetitionTriggerIcon";

function SeasonList() {
  const { seasons, selectedSeason, setSelectedSeason } = useSeasonStore(
    (state) => state
  );
  const { allCompetitions } = useCompetitionStore((state) => state);

  const filteredCompetitions = useMemo(() => {
    if (!selectedSeason) return [];
    return allCompetitions.filter((x) => x.season?.id === selectedSeason.id);
  }, [selectedSeason, allCompetitions]);
  
  return (
    <div className="flex gap-5 p-5 justify-between">
      <div className="space-y-2 flex-1">
        {seasons.map((c) => (
          <div
            key={c.id}
            className={cn(
              "border px-5 py-2 flex gap-2 justify-between items-center bg-background rounded-lg",
              c.id === selectedSeason?.id && "dark:bg-slate-800 border-l-primary border-l-4 "
            )}
          >
            <div className="flex flex-col">
              <strong>{c.name}</strong>
              <small className="text-slate-500">
                {c.description ?? "no description"}
              </small>
              <small>{c.competitions?.length ?? 0} competitions</small>
              <small>
                <SeasonStatusBadge status={c.status} />
                {/* <CompetitionStatusText status={c.status} /> */}
              </small>
            </div>
            <div>
              <Button variant="ghost" onClick={() => setSelectedSeason(c.id)}>
                <ChevronRight />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="border p-5 flex-1 bg-background rounded-lg">
        <div className="flex justify-between pb-5 items-center">
          <strong className="text-xl">{selectedSeason?.name}</strong>
          <div className="flex items-center gap-5">
            <SeasonStatusBadge status={selectedSeason?.status} />
            {selectedSeason && (
              <SeasonActionTriggerIcon season={selectedSeason} />
            )}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex justify-between">
            <small>From:</small>
            <small>
              {selectedSeason?.startDate &&
                format(selectedSeason?.startDate, "PPP")}
            </small>
          </div>
          <div className="flex justify-between">
            <small>To:</small>
            <small>
              {selectedSeason?.endDate &&
                format(selectedSeason?.endDate, "PPP")}
            </small>
          </div>
          <div></div>
        </div>
        <Separator className="my-5" />
        <div className="py-2">
          <small className="text-muted-foreground">
            Competitions ({selectedSeason?.competitions?.length ?? 0})
          </small>
          <ul className="mt-2 space-y-2">
            {filteredCompetitions.map((comp) => (
              <li key={comp.id} className="flex justify-between items-center hover:text-cyan-300">
                <Link
                  href={`/seasons/competitions/${comp.id}`}
                  className="font-normal flex gap-2 items-center justify-between"
                >
                  <Link2Icon size={15} /> <strong>{comp.name}</strong>
                  <div></div>
                </Link>
                <CompetitionTriggerIcon competition={comp} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SeasonList;
