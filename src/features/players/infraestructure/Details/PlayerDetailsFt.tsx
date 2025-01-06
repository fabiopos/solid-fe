"use client";
import { H2 } from "@/components/ui/typograhpy";
import { usePlayerDetailsStore } from "@/context/PlayerDetailsCtx";
import ActiveText from "@/components/ui/active-text";
import { PlayerDetailsForm } from "./Form/Form";
import EditPlayerAvatarInput from "./Form/EditPlayerAvatarInput";
import StatBox from "@/components/ui/stat-box";
import StatBoxes from "./StatBoxes/StatBoxes";
import AparitionList from "./Aparitions/AparitionList";

function PlayerDetailsFt() {
  const player = usePlayerDetailsStore((state) => state.player);
  if (!player) return null;
  if (!player.id) return null;

  console.log(player);

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

      <div className="grid grid-cols-2 justify-center mt-2 w-full gap-2">
        <PlayerDetailsForm player={player} />
        <div className="flex flex-col items-start gap-2 p-5 bg-background border rounded-lg">
          <h3 className="font-bold">Player Stats</h3>
          <StatBoxes player={player} />
          <AparitionList player={player} />
        </div>
      </div>
    </div>
  );
}

export default PlayerDetailsFt;
