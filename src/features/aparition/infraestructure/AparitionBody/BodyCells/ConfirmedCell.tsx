import { useMatchDetailsStore } from "@/context/MatchDetailsCtx";
import AparitionBodyCell from "../AparitionBodyCell";
import { Switch } from "@/components/ui/switch";

interface ConfirmedCellProps {
  playerId: string;
  confirmed?: boolean | null;
}

function ConfirmedCell({ playerId, confirmed }: ConfirmedCellProps) {
  const setConfirmed = useMatchDetailsStore((state) => state.setConfirmed);
  return (
    <AparitionBodyCell>
      <Switch
        defaultChecked={confirmed ?? false}
        onCheckedChange={(checked) => setConfirmed(playerId, checked)}
      />
    </AparitionBodyCell>
  );
}

export default ConfirmedCell;
