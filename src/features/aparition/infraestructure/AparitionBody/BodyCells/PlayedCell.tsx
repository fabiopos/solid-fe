import { useMatchDetailsStore } from "@/context/MatchDetailsCtx";
import AparitionBodyCell from "../AparitionBodyCell";
import { Switch } from "@/components/ui/switch";

interface PlayedCellProps {
  playerId: string;
  played?: boolean | null;
}

function PlayedCell({ playerId, played }: PlayedCellProps) {
  const setPlayed = useMatchDetailsStore((state) => state.setPlayed);
  return (
    <AparitionBodyCell>
      <Switch
        defaultChecked={played ?? false}
        onCheckedChange={(checked) => setPlayed(playerId, checked)}
      />
    </AparitionBodyCell>
  );
}

export default PlayedCell;
