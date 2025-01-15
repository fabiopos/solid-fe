import { FulfilledMatchAparition } from "@/features/aparition/domain/aparition.schema";
import PlayerAvatar from "@/features/players/infraestructure/PlayerAvatar";


interface TopAssistsProps {
  aparitions: FulfilledMatchAparition[];
}
function TopAssists({ aparitions }: TopAssistsProps) {
  return (
    <div className="space-y-5">
      {aparitions.map((ap) => (
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
          <span className="text-slate-500 text-sm">{`${ap.assists} assists`}</span>
        </div>
      ))}
    </div>
  );
}

export default TopAssists;
