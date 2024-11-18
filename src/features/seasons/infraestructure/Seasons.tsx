"use client";

import { Separator } from "@/components/ui/separator";
import SeasonCard from "./Season/SeasonCard";
import { Button } from "@/components/ui/button";
import { useSeasonStore } from "@/context/SeasonCtx";

// interface SeasonsProps {}
const Seasons = () => {
  const { seasons, fetchSeasonStatus } = useSeasonStore((state) => state);

  if (fetchSeasonStatus === "IN_PROGRESS") return "Loading...";
  if (fetchSeasonStatus === "ERROR") return "Error fetching seasons";
  return (
    <div>
      <h2 className="text-5xl my-4">Seasons</h2>
      <p className="tracking-wide text-lg">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus
        suscipit sed magni ea id nam temporibus, quod tempora obcaecati facilis
        perferendis corrupti esse quos molestias provident beatae harum velit
        expedita. Velit fuga adipisci enim ratione quam! Saepe quibusdam
        laboriosam vitae beatae! Commodi nemo aperiam quibusdam iste,
        necessitatibus ab dolores praesentium? Molestiae, est asperiores, in
        distinctio et eligendi obcaecati atque harum tempore voluptas nam ex
        architecto perferendis explicabo temporibus dolorem optio, iure non odit
        deleniti. Amet unde vel velit iure nemo sed veritatis quibusdam
        repudiandae esse impedit, in cum optio quis exercitationem animi harum!
        Officiis ea unde quia! Dolorem, sunt assumenda!
      </p>

      {/* addseason */}

      <div className="flex justify-end">
        <Button>Add Season</Button>
      </div>
      <Separator className="my-5" />

      <div className="flex gap-3 flex-col">
        {seasons.map((s) => (
          <SeasonCard season={s} key={s.id} />
        ))}
      </div>
    </div>
  );
};

export default Seasons;
