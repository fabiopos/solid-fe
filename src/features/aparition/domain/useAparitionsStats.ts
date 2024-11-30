import { useMatchDetailsStore } from "@/context/MatchDetailsCtx";
import { useMemo } from "react";

export const useAparitionsStats = () => {
  const { aparitions, players } = useMatchDetailsStore((state) => state);
  const playersTotal = useMemo(() => players.length, [players]);
  const playedTotal = useMemo(
    () => aparitions.filter((x) => x.played).length,
    [aparitions]
  );
  const confirmedTotal = useMemo(
    () => aparitions.filter((x) => x.confirmed).length,
    [aparitions]
  );

  const playedPerc = useMemo(
    () => (playedTotal / playersTotal) * 100,
    [playedTotal, playersTotal]
  );

  const confirmedPerc = useMemo(
    () => (confirmedTotal / playersTotal) * 100,
    [confirmedTotal, playersTotal]
  );

  return {
    playedPerc,
    confirmedPerc,
  };
};
