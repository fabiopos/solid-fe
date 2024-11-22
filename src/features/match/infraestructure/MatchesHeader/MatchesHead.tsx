import { Button } from "@/components/ui/button";
import MatchAddDrawer from "../MatchAddDrawer";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useMatchStore } from "@/context/MatchCtx";

interface MatchesHeadProps {}

function MatchesHead({}: MatchesHeadProps) {
  const { competitionId } = useParams<{ competitionId: string }>();
  const { allMatches: matches } = useMatchStore((state) => state);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="flex justify-between items-center p-5">
      <div>
        <span className="text-xl">
          <strong>{matches.length}</strong> matches in this competition
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
