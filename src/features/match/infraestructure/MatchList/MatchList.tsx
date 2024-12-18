"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import MatchTriggerIcon from "@/features/match/infraestructure/MatchTriggerIcon";
import { useMatchStore } from "@/context/MatchCtx";

function MatchList() {
  const { allMatches, selectedMatch, setSelectedMatch } = useMatchStore((state) => state);

  return (
    <div className="flex gap-5 p-5 justify-between">
      <div className="space-y-2 flex-1">
        {allMatches.map((m) => (
          <div
            key={m.id}
            className={cn(
              "border p-2 flex gap-2 justify-between items-center",
              m.id === selectedMatch?.id && "bg-slate-800"
            )}
          >
            <div className="flex flex-col">
              <strong>{m.title}</strong>
              {/* <small className="text-slate-500">
                {m. ?? "no description"}
              </small> */}
              <small>{m.matchAparitions?.length ?? 0} aparitions</small>
              <small>
                {m.completed ? 'Complete': 'Incomplete'}
              </small>
            </div>
            <div>
              <Button variant="ghost" onClick={() => setSelectedMatch(m)}>
                <ChevronRight />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="border p-5 flex-1">
        <div className="flex justify-between pb-5 items-center">
          <strong className="text-xl">{selectedMatch?.title}</strong>
          <div className="flex items-center gap-5">
            
            {selectedMatch && <MatchTriggerIcon match={selectedMatch} />}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex justify-between">
            <small>From:</small>
            <small>
              {selectedMatch?.matchDay && format(selectedMatch?.matchDay, "PPP")}
            </small>
          </div>
          <div className="flex justify-between">
            <small>To:</small>
            <small>
              {selectedMatch?.matchHour && format(selectedMatch?.matchHour, "HH:mm")}
            </small>
          </div>
          <div></div>
        </div>
        <Separator className="my-5" />
        <div className="py-2">
          {/* <small>Matches ({selectedMatch?.matches?.length ?? 0})</small> */}
         
        </div>
      </div>
    </div>
  );
}

export default MatchList;
