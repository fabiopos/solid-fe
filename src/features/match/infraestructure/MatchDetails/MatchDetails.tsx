"use client";
import MatchRow from "@/components/Match/MatchRow";
import { Separator } from "@/components/ui/separator";
import { H1 } from "@/components/ui/typograhpy";
import { useMatchDetailsStore } from "@/context/MatchDetailsCtx";
import { useCallback, useMemo } from "react";
import AparitionsEditTable from "@/features/aparition/infraestructure/AparitionsEditTable";
import ReadOnlyAlert from "./ReadOnlyAlert";
import { useAuthStore } from "@/context/AuthCtx";
import { Alert } from "@/components/ui/alert";
import AparitionDiffAlert from "@/features/aparition/infraestructure/AparitionDiffAlert";
import { EditScoreDialog } from "./EditScoreDialog";
import { FulfilledMatch } from "../../domain/match.schema";

function MatchDetails() {
  const teamId = useAuthStore((state) => state.accountData.selectedTeamId);
  const { match } = useMatchDetailsStore((state) => state);

  if (!match) return <>Match not found</>;

  const teamIds = useMemo(() => [match.homeTeamId, match.awayTeamId], [match]);
  const isReadonly = useMemo(() => {
    return !teamIds.includes(teamId ?? "");
  }, [teamIds, teamId]);

  const handleOpenDialog = useCallback((match: FulfilledMatch) => {}, []);

  return (
    <div className="container">
      <H1>
        {match.competition?.name} - {match.title}
      </H1>
      <Separator className="my-5" />
      <div className="flex flex-col min-w-[550px]">
        <MatchRow match={match} onClickScore={() => handleOpenDialog(match)} />
        <EditScoreDialog />
      </div>
      <Separator className="my-5" />
      {isReadonly && <ReadOnlyAlert />}
      {!isReadonly && <AparitionsEditTable />}
      <AparitionDiffAlert />
      
    </div>
  );
}

export default MatchDetails;
