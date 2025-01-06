import { Button } from "@/components/ui/button";
import MatchAddDrawer from "../MatchAddDrawer";
import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { useMatchStore } from "@/context/MatchCtx";
import { H1 } from "@/components/ui/typograhpy";
import MatchesShortResults from "../MatchesShortResults/MatchesShortResults";

function MatchesHead() {
  const { competitionId } = useParams<{ competitionId: string }>();
  const { allMatches: matches } = useMatchStore((state) => state);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const completedMatches = useMemo(
    () => matches.filter((x) => x.completed),
    [matches]
  );

  return (
    <div className="">
      <div className="bg-background p-5 rounded-lg border">
        <H1>Matches</H1>
        <br />
        <p>
          There's a total of <strong>{matches.length}</strong> matches, you can edit the matches
          result clicking the action button next to the match or edit the match
          details.
        </p>

        <p>Make sure once you finished editing the match, mark the match as <strong>completed</strong> to view match result in the dashboard.</p>
      </div>

      <div className="p-5 bg-background my-2 border rounded-lg">
        <strong className="mb-2 flex">Last Results</strong>
        <MatchesShortResults matches={matches} />
      </div>
      <div className="flex justify-between items-center p-2">
        <div>
          <span className="text-xl">
            <strong>
              {completedMatches.length} / {matches.length}
            </strong>{" "}
            completed matches
          </span>
        </div>
        <div>
          <Button onClick={handleOpen}>Add Match</Button>
          <MatchAddDrawer
            competitionId={competitionId}
            onClose={handleClose}
            open={open}
          />
        </div>
      </div>
    </div>
  );
}

export default MatchesHead;
