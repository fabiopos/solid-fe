import MatchRow from "@/components/Match/MatchRow";
import MatchTriggerIcon from "../MatchTriggerIcon";
import { useMatchStore } from "@/context/MatchCtx";


function MatchesBody() {
  const { allMatches: matches } = useMatchStore((state) => state);
  return (
    <div className="flex flex-col justify-center rounded-xl">
      {matches.map((x) => (
        <MatchRow
          actionsColumn={<MatchTriggerIcon match={x} />}
          match={x}
          key={`match-${x.id}`}
        />
      ))}
    </div>
  );
}

export default MatchesBody;
