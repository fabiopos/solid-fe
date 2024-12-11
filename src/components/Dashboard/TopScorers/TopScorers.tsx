import ActiveText from "@/components/ui/active-text";
import { FulfilledMatchAparition } from "@/features/aparition/domain/aparition.schema";
import { FulfilledPlayer } from "@/features/players/domain/player.effect.schema";
import PlayerAvatar from "@/features/players/infraestructure/PlayerAvatar";
import { formatDistanceToNowStrict } from "date-fns";

interface TopScorersProps {
  aparitions: FulfilledMatchAparition[];
}
function TopScorers({ aparitions }: TopScorersProps) {
  return (
    <div className="space-y-5">
      {(aparitions ?? []).map((ap) => (
        <div
          className="flex justify-between items-center"
          key={`aparition-${ap.id}`}
        >
          <div className="flex items-center gap-5">
            <PlayerAvatar
              fallback={ap.player?.shirtNumber?.toString() ?? "X"}
              imageUrl={ap.player?.avatarUrl}
            />
            <div className="flex flex-col">
              <span className="uppercase">{ap.player?.shirtName}</span>
            </div>
          </div>
          <span className="text-slate-500 text-sm">{`${ap.goals} goals`}</span>
        </div>
      ))}
    </div>
  );
}

export default TopScorers;
