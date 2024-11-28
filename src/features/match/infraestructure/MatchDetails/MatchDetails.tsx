"use client";
import MatchRow from "@/components/Match/MatchRow";
import { Separator } from "@/components/ui/separator";
import { H1 } from "@/components/ui/typograhpy";
import { useMatchDetailsStore } from "@/context/MatchDetailsCtx";
import { useMemo } from "react";
import AparitionsEditTable from "@/features/aparition/infraestructure/AparitionsEditTable";
import ReadOnlyAlert from "./ReadOnlyAlert";
import { useAuthStore } from "@/context/AuthCtx";

function MatchDetails() {
  const teamId = useAuthStore(state => state.accountData.selectedTeamId);  
  const { match } = useMatchDetailsStore((state) => state);

  if (!match) return <>Match not found</>;

  const teamIds = useMemo(() => [match.homeTeamId, match.awayTeamId], [match]);
  const isReadonly = useMemo(() => {
    return !teamIds.includes(teamId ?? "");
  }, [teamIds, teamId]);

  return (
    <div className="container">
      <H1>
        {match.competition?.name} - {match.title}
      </H1>
      <Separator className="my-5" />
      <div className="flex flex-col min-w-[550px]">
        <MatchRow match={match} />
      </div>
      <Separator className="my-5" />
      {isReadonly && <ReadOnlyAlert />}
      {!isReadonly && <AparitionsEditTable />}
    </div>
  );
}

export default MatchDetails;
