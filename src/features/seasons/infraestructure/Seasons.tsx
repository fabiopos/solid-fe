"use client";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useSeasonStore } from "@/context/SeasonCtx";
import SeasonAddDrawer from "./Season/SeasonAddDrawer";
import { useCallback, useState } from "react";
import SeasonList from "./List/SeasonList";

// interface SeasonsProps {}
const Seasons = () => {
  const { fetchSeasonStatus, setEmptySeason } = useSeasonStore(
    (state) => state
  );
  const [open, setOpen] = useState(false);

  const handleClose = useCallback(() => {
    setEmptySeason(undefined);
    setOpen(false);
  }, [setEmptySeason]);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  if (fetchSeasonStatus === "IN_PROGRESS") return "Loading...";
  if (fetchSeasonStatus === "ERROR") return "Error fetching seasons";
  return (
    <div>
      <div className="bg-background p-5 border rounded-lg mb-2">
        <h2 className="text-5xl my-4">Welcome to the Seasons Section!</h2>
        <p className="tracking-wide font-normal">
          Here, you can take full control of your football team&apos;s seasons.
          From initial planning to final achievements, Seasons lets you organize
          and track every key aspect of your campaign. Easily create, edit, and
          manage seasons by setting goals, scheduling matches, recording
          results, and much more.
        </p>
        <p className="tracking-wide my-5 font-normal">
          With intuitive and customizable tools, you can:
        </p>
        <ul className="my-3 ml-6 list-disc [&>li]:mt-2 font-normal text-sm">
          <li>
            <strong>Plan the season:</strong> organize friendlies and
            competitions.
          </li>
          <li>
            <strong> Track stats:</strong> keep detailed records of team and
            individual player performance.
          </li>
          <li>
            <strong>Monitor progress:</strong> review charts and reports to
            evaluate performance and results.
          </li>
        </ul>
      </div>

      {/* addseason */}
      <div className="flex justify-end">
        <Button onClick={handleOpen}>Add Season</Button>
        <SeasonAddDrawer onClose={handleClose} open={open} />
      </div>
      <Separator className="my-5" />
      <SeasonList />
    </div>
  );
};

export default Seasons;
