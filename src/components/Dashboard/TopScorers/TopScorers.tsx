import { FulfilledScorer } from "@/features/aparition/domain/aparition.schema";
import PlayerAvatar from "@/features/players/infraestructure/PlayerAvatar";

interface TopScorersProps {
  aparitions: FulfilledScorer[];
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
              fallback={ap.shirtNumber?.toString() ?? "X"}
              imageUrl={ap.avatarUrl}
            />
            <div className="flex flex-col">
              <span className="uppercase text-foreground text-sm">
                {ap.shirtName}
              </span>
              <span className="text-muted-foreground text-xs">{ap.name}</span>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <span className="text-foreground text-lg leading-none">{`${ap.goals}`}</span>            
            <span className="text-muted-foreground text-xs">goals</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TopScorers;
