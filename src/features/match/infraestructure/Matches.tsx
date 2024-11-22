"use client";
import MatchRow from "@/components/Match/MatchRow";
import { FulfilledMatch } from "../domain/match.schema";
import { useMatchStore } from "@/context/MatchCtx";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import MatchAddDrawer from "./MatchAddDrawer";
import { useParams } from "next/navigation";
import MatchTriggerIcon from "./MatchTriggerIcon";

function Matches() {
  const { competitionId } = useParams();
  const { allMatches: matches } = useMatchStore((state) => state);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <div className="flex justify-between p-5">
        <div>
          <span className="text-xl">
            <strong>{matches.length}</strong> matches in this competition
          </span>
        </div>
        <div>
          <Button onClick={handleOpen}>Add Match</Button>
          <MatchAddDrawer
            competitionId={competitionId as string}
            onClose={handleClose}
            open={open}
          />
        </div>
      </div>
      <div className="flex flex-col justify-center rounded-xl">
        {matches.map((x) => (
          <MatchRow
            actionsColumn={<MatchTriggerIcon match={x} />}
            match={x as FulfilledMatch}
            key={`match-${x.id}`}
          />
        ))}
      </div>
    </div>
  );
}

export default Matches;
