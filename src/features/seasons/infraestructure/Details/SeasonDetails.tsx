"use client";
import { useSeasonDetailsStore } from "@/context/SeasonDetailsCtx";
import SeasonInfo from "./SeasonInfo";
import SeasonCompetitionCard from "./SeasonCompetitionCard";
import { Separator } from "@/components/ui/separator";
import LastSeasonMatches from "./LastSeasonMatches";
import { useCompetitionStore } from "@/context/CompetitionCtx";

export default function SeasonDetails() {
  const { season } = useSeasonDetailsStore((state) => state);
  const competitions = useCompetitionStore(state => state.allCompetitions)
  return (
    <div className="p-5">
      <SeasonInfo season={season}>
        <Separator className="my-5" />
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(350px,_1fr))] gap-2 mt-5">
          {(competitions ?? []).map((c) => (
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
