"use client";
import CompetitionStatusBadge from "@/components/Competition/CompetitionStatusBadge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { ChevronRight, Link2Icon } from "lucide-react";
import Link from "next/link";
import CompetitionTriggerIcon from "../Details/CompetitionTriggerIcon";
import { useCompetitionStore } from "@/context/CompetitionCtx";
import CompetitionStatusText from "@/components/Competition/CompetitionStatusText";
import { cn } from "@/lib/utils";
import MatchTriggerIcon from "@/features/match/infraestructure/MatchTriggerIcon";
import { FulfilledMatch } from "@/features/match/domain/match.schema";
import { useState } from "react";
import MatchAddDrawer from "@/features/match/infraestructure/MatchAddDrawer";

function CompetitionList() {
  const {
    selectedCompetition: selected,
    setSelectedCompetition: setSelected,
    allCompetitions,
  } = useCompetitionStore((state) => state);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className="flex gap-5 p-5 justify-between">
      <div className="space-y-2 flex-1">
        {allCompetitions.map((c) => (
          <div
            key={c.id}
            className={cn(
              "border p-2 flex gap-2 justify-between items-center",
              c.id === selected?.id &&
                "dark:bg-slate-800 bg-slate-50 border-l-4 border-l-primary"
            )}
          >
            <div className="flex flex-col">
              <strong>{c.name}</strong>
              <small className="text-slate-500">
                {c.description ?? "no description"}
              </small>
              <small>{c.matches?.length ?? 0} matches</small>
              <small>
                <CompetitionStatusText status={c.status} />
              </small>
            </div>
            <div>
              <Button variant="ghost" onClick={() => setSelected(c)}>
                <ChevronRight />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="border p-5 flex-1">
        <div className="flex justify-between pb-5 items-center">
          <strong className="text-xl">{selected?.name}</strong>
          <div className="flex items-center gap-5">
            <CompetitionStatusBadge status={selected?.status} />
            {selected && <CompetitionTriggerIcon competition={selected} />}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex justify-between">
            <small>From:</small>
            <small>
              {selected?.startDate && format(selected?.startDate, "PPP")}
            </small>
          </div>
          <div className="flex justify-between">
            <small>To:</small>
            <small>
              {selected?.endDate && format(selected?.endDate, "PPP")}
            </small>
          </div>
          <div></div>
        </div>
        <Separator className="my-5" />
        <div className="py-2">
          <div className="flex justify-between items-center">
            <small>Matches ({selected?.matches?.length ?? 0})</small>
            <Button variant="link" className="font-bold" onClick={handleOpen}>Add Match</Button>
          </div>
          <Separator className="my-2" />
          <ul className="mt-2 space-y-2">
            {selected?.matches?.map((m) => (
              <li key={m.id} className="flex justify-between items-center">
                <Link
                  href={`/seasons/competitions/matches/${m.id}`}
                  className="hover:text-cyan-400 flex gap-2 items-center justify-between"
                >
                  <Link2Icon size={15} /> <strong>{m.title}</strong>
                  <div>
                    <small>({m.completed ? "Complete" : "Incomplete"})</small>
                  </div>
                  <div>
                    <small>{m.matchDay && format(m.matchDay, "PPP")}</small>
                  </div>
                  <div></div>
                </Link>
                <MatchTriggerIcon match={FulfilledMatch.make(m)} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {selected && selected.id && (
        <MatchAddDrawer
          competitionId={selected.id}
          onClose={handleClose}
          open={open}
        />
      )}
    </div>
  );
}

export default CompetitionList;
