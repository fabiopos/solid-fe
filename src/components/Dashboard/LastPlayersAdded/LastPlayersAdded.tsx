import ActiveText from "@/components/ui/active-text";
import { FulfilledPlayer } from "@/features/players/domain/player.effect.schema";
import PlayerAvatar from "@/features/players/infraestructure/PlayerAvatar";
import {  formatDistanceToNowStrict } from "date-fns";

interface LastPlayersAddedProps {
  players: FulfilledPlayer[];
}

function LastPlayersAdded({ players }: LastPlayersAddedProps) {
  return (
    <div className="space-y-5">
      {players.map((p) => (
        <div
          className="flex justify-between items-center"
          key={`last-player-added-${p.id}`}
        >
          <div className="flex items-center gap-5">
            <PlayerAvatar
              fallback={p.shirtNumber?.toString() ?? "X"}
              imageUrl={p.avatarUrl}
            />
            <div className="flex flex-col">
              <span className="uppercase">{p.shirtName}</span>
              <ActiveText isActive={p.active} />
            </div>
          </div>
          <span className="text-slate-500 text-sm">
            {p.createdAt && `${formatDistanceToNowStrict(p.createdAt)} ago`}
          </span>
        </div>
      ))}
    </div>
  );
}

export default LastPlayersAdded;
