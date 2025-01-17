"use client";
import { useSeasonDetailsStore } from "@/context/SeasonDetailsCtx";
import SeasonInfo from "./SeasonInfo";
import LastSeasonMatches from "./LastSeasonMatches";
import { Button } from "@/components/ui/button";
import CompetitionAddDrawer from "@/features/competition/infraestructure/CompetitionAddDrawer";
import { useState } from "react";
import CompetitionList from "../List/CompetitionList";
import { H2 } from "@/components/ui/typograhpy";

export default function SeasonDetails() {
  const { season } = useSeasonDetailsStore((state) => state);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  if (!season?.id) return null;

  return (
    <div className="p-5">      
      <SeasonInfo season={season} />      

      <div className="flex justify-between my-5">
        <H2>Competitions</H2>
        <Button onClick={handleOpen}>Add Competition</Button>
      </div>
      <CompetitionList />
      <LastSeasonMatches />
      <CompetitionAddDrawer
        seasonId={season.id}
        onClose={handleClose}
        open={open}
      />
    </div>
  );
}
