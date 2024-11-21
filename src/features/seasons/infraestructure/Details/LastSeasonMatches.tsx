import MatchRow from "@/components/Match/MatchRow";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSeasonDetailsStore } from "@/context/SeasonDetailsCtx";

function LastSeasonMatches() {
  const { matches } = useSeasonDetailsStore((state) => state);
  return (
    <Card className="my-5">
      <CardHeader>
        <CardTitle>Last 5 matches played for this season</CardTitle>
      </CardHeader>
      <CardContent>
        {matches
          ?.filter((x) => x.homeTeam && x.awayTeam)
          .map((m) => (
            <MatchRow match={m} key={`match-${m.id}`} />
          ))}
      </CardContent>
    </Card>
  );
}

export default LastSeasonMatches;
