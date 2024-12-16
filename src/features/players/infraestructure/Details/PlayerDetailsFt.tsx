"use client";
import { H2 } from "@/components/ui/typograhpy";
import { usePlayerDetailsStore } from "@/context/PlayerDetailsCtx";
import ActiveText from "@/components/ui/active-text";
import { PlayerDetailsForm } from "./Form/Form";
import EditPlayerAvatarInput from "./Form/EditPlayerAvatarInput";

function PlayerDetailsFt() {
  const player = usePlayerDetailsStore((state) => state.player);
  if (!player) return null;
  if (!player.id) return null;

  return (
    <div className="p-2">
      <div className="flex gap-5 items-center">
        <EditPlayerAvatarInput avatarUrl={player?.avatarUrl} pid={player.id} />
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
          <small>Aparitions section</small>
        </div>
      </div>
    </div>
  );
}

export default PlayerDetailsFt;
