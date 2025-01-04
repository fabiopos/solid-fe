import { FulfilledMatchAparition, FulfilledScorer } from "@/features/aparition/domain/aparition.schema";
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
              <span className="uppercase text-foreground/80 text-sm">{ap.name}</span>
            </div>
          </div>
          <span className="text-muted-foreground text-xs">{`${ap.goals} goals`}</span>
        </div>
      ))}
    </div>
  );
}

export default TopScorers;
