"use client";
import { H2 } from "@/components/ui/typograhpy";
import { usePlayerDetailsStore } from "@/context/PlayerDetailsCtx";
import PlayerAvatar from "../PlayerAvatar";
import ActiveText from "@/components/ui/active-text";
import Image from "next/image";
import { PlayerDetailsForm } from "./Form/Form";

function PlayerDetailsFt() {
  const player = usePlayerDetailsStore((state) => state.player);
  if (!player) return null;

  console.log(player)
  return (
    <div className="p-2">
      <div className="flex gap-5 items-center">
        {player?.avatarUrl && (
          <Image
            src={player?.avatarUrl}
            width={80}
            height={100}
            alt=""
            className="rounded-lg"
          />
        )}
        <div className="">
          <H2>
            {player?.firstName} {player?.lastName}
          </H2>

          <ActiveText isActive={player?.active} />
        </div>
      </div>

      <div className="grid grid-cols-2 justify-center mt-2 w-full">
        <PlayerDetailsForm player={player} />
        <div className="flex flex-col gap-2 p-5">
          <div className="flex gap-5">
            <span>Address</span>
            <span>{player?.address ?? "no address"}</span>
          </div>
          <span>{player?.arl ?? "no arl"}</span>
          <span>{player?.bornDate?.toString() ?? "no born date"}</span>
          <span>{player?.city ?? "no city"}</span>
          <span>{player?.country ?? "no country"}</span>
          <span>{player?.createdAt?.toLocaleString() ?? "no created at"}</span>
          <span>{player?.documentNumber}</span>
          <span>{player?.documentType}</span>
          <span>{player?.dominantFoot}</span>
          <span>{player?.email}</span>
          <span>{player?.eps ?? "no eps"}</span>
          <span>{player?.favPosition?.category ?? "no favPosition"}</span>
          <span>{player?.favPositionId ?? "no favPositionId"}</span>
          <span>{player?.height}cm</span>
          <span>{player?.weight}kg</span>
          <span>{player?.phone}</span>
          <span>{player?.playerPositions?.length ?? "No other positions"}</span>
          <span>{player?.shirtName ?? "no shirtName"}</span>
          <span>{player?.shirtNumber ?? "no shirtNumber"}</span>
          <span>{player?.shirtSize ?? "no shirtSize"}</span>
          <span>{player?.status ?? "no status"}</span>
          <span>{player?.team?.name ?? "no team"}</span>
        </div>
      </div>
    </div>
  );
}

export default PlayerDetailsFt;
