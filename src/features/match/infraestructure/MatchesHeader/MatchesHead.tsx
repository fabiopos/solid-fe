import { Button } from "@/components/ui/button";
import MatchAddDrawer from "../MatchAddDrawer";
import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { useMatchStore } from "@/context/MatchCtx";

interface MatchesHeadProps {}

function MatchesHead({}: MatchesHeadProps) {
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
    <div className="flex justify-between items-center p-5">
      <div>
        <span className="text-xl">
          <strong>
            {completedMatches.length} / {matches.length}
          </strong>{" "}
          completed matches on this competition
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
  );
}

export default MatchesHead;
