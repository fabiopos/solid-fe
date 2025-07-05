import { FulfilledPlayerWithStats } from "@/features/players/domain/player.effect.schema";
import Link from "next/link";

interface PlayerCardProps {
  player: FulfilledPlayerWithStats;
}

export function PlayerCard({ player }: PlayerCardProps) {
  return (
    <div>
      <div className="flex flex-col items-center justify-center max-w-36 min-w-36 max-h-20 min-h-20">
        <Link
          href={`/players/details/${player.id}`}
          className="text-lg uppercase dark:text-white hover:underline hover:text-blue-700"
        >
          {player.shirtName}
        </Link>
        <small className="text-black text-center">
          {player.firstName} {player.lastName}
        </small>
      </div>
    </div>
  );
}
