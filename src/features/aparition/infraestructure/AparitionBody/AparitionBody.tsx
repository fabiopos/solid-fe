import React from "react";
import AparitionTableLayout from "../AparitionTableLayout";
import { useMatchDetailsStore } from "@/context/MatchDetailsCtx";
import AparitionBodyRow from "./AparitionBodyRow";
import { FulfilledPlayer } from "@/features/players/domain/player.effect.schema";

function AparitionBody() {
  const { aparitions } = useMatchDetailsStore((state) => state);
  // console.table(aparitions)
  return (
    <AparitionTableLayout>
      {aparitions.map((ap) => (
        <AparitionBodyRow
          confirmed={ap.confirmed}
          goals={ap.goals}
          minutes={ap.minutes}
          played={ap.played}
          rating={ap.rating}
          redCards={ap.redCards}
          yellowCards={ap.yellowCards}
          player={ap.player as FulfilledPlayer}
          key={`aparition-${ap.player?.id}`}
        />
      ))}
    </AparitionTableLayout>
  );
}

export default AparitionBody;
