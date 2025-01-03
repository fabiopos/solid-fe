"use client";

import AparitionStatBox from "@/components/Aparitions/AparitionStatBox";
import { useAparitionsStats } from "../../domain/useAparitionsStats";

function AparitionsStatBoxes() {
  const { confirmedPerc, playedPerc } = useAparitionsStats();
  return (
    <div className="flex gap-5 ml-5">
      <AparitionStatBox label="Confirmed" value={`${confirmedPerc.toFixed(1)}%`} />
      <AparitionStatBox label="Played" value={`${playedPerc.toFixed(1)}%`} />
    </div>
  );
}

export default AparitionsStatBoxes;
