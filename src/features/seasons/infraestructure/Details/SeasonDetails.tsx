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
  return (
    <div className="p-5">
      <div className="flex justify-end my-5">
        {season && season.id && (
          <>
            <Button onClick={handleOpen}>Add Competition</Button>
            <CompetitionAddDrawer
              seasonId={season.id}
              onClose={handleClose}
              open={open}
            />
          </>
        )}
      </div>
      <SeasonInfo season={season}>
        <></>
      </SeasonInfo>
      
      <H2 className="my-5">Competitions</H2>
      <CompetitionList  />

      <LastSeasonMatches />
    </div>
  );
}
