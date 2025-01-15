import { FulfilledPlayerWithStats } from "@/features/players/domain/player.effect.schema";
import AparitionSummaryItem from "./AparitionSummaryItem";

interface AparitionListProps {
  player: FulfilledPlayerWithStats;
}
function AparitionList({ player }: AparitionListProps) {
  return (
    <ul className="space-y-2 w-full">
      {player.matchAparitions
        ?.filter((x) => x.played)
        .map((x) => (
          <li className="border p-2 rounded-lg" key={x.id}>
            <AparitionSummaryItem aparition={x} />
          </li>
        ))}
    </ul>
  );
}

export default AparitionList;
