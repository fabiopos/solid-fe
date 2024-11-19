"use client";
import { useSeasonDetailsStore } from "@/context/SeasonDetailsCtx";
import SeasonInfo from "./SeasonInfo";
import SeasonCompetitionCard from "./SeasonCompetitionCard";
import { Separator } from "@/components/ui/separator";
import LastSeasonMatches from "./LastSeasonMatches";

export default function SeasonDetails() {
  const { season } = useSeasonDetailsStore((state) => state);
  return (
    <div className="p-5">
      <SeasonInfo season={season}>
        <Separator className="my-5" />
        <div className="grid grid-cols-1 desktop:grid-cols-3 laptop:grid-cols-2 gap-2 mt-5">
          {(season?.competitions ?? []).map((c) => (
            <SeasonCompetitionCard
              competition={c}
              key={`competition-${c.id}`}
            />
          ))}
        </div>
      </SeasonInfo>

      <LastSeasonMatches />
    </div>
  );
}
