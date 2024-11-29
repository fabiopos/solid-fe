"use client";
import MatchRow from "@/components/Match/MatchRow";
import { Separator } from "@/components/ui/separator";
import { H1 } from "@/components/ui/typograhpy";
import { useMatchDetailsStore } from "@/context/MatchDetailsCtx";
import { useMemo } from "react";
import AparitionsEditTable from "@/features/aparition/infraestructure/AparitionsEditTable";
import ReadOnlyAlert from "./ReadOnlyAlert";
import { useAuthStore } from "@/context/AuthCtx";
import { Array } from "effect";
import { Alert } from "@/components/ui/alert";

function MatchDetails() {
  const teamId = useAuthStore((state) => state.accountData.selectedTeamId);
  const { match, players, aparitions } = useMatchDetailsStore((state) => state);

  if (!match) return <>Match not found</>;

  const teamIds = useMemo(() => [match.homeTeamId, match.awayTeamId], [match]);
  const isReadonly = useMemo(() => {
    return !teamIds.includes(teamId ?? "");
  }, [teamIds, teamId]);

  const playersIds = useMemo(() => {
    return players.map((x) => x.id);
  }, [players]);

  const aparitionsPlayerIds = useMemo(() => {
    return aparitions.map((x) => x.player?.id);
  }, [players]);

  const differenceIds = useMemo(
    () =>
      Array.differenceWith<string | undefined>((a, b) => a === b)(
        playersIds,
        aparitionsPlayerIds
      ),
    [playersIds, aparitionsPlayerIds]
  );

  const differencePlayers = useMemo(() => {
    return players.filter((x) => differenceIds.includes(x.id));
  }, [players, differenceIds]);

  const hasDifference = useMemo(() => {
    return differencePlayers.length > 0;
  }, [differencePlayers]);

  console.log(differencePlayers);

  // console.log(teamIds, teamId, isReadonly);
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
      {hasDifference && (
        <Alert className="my-2">
          {differencePlayers.map((p) => (
            <div key={`difference-${p.id}`}>
              {`${p.firstName} ${p.lastName}`} is not in the aparition{" "}
              <strong>add</strong>
            </div>
          ))}
        </Alert>
      )}
    </div>
  );
}

export default MatchDetails;
