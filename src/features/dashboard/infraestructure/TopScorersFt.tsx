import TopScorers from "@/components/Dashboard/TopScorers/TopScorers";
import { FulfilledScorer } from "@/features/aparition/domain/aparition.schema";

const LIMIT = 5;
async function TopScorersFt({ players }: { players: FulfilledScorer[] }) {
  return (
    <div className="">
      <div className="px-5 my-2">
        <h3 className="text-xl font-bold tracking-tight dark:text-white max-lg:text-center">
          Top {LIMIT} Scorers
        </h3>
      </div>
      <div className="p-5">
        <TopScorers aparitions={players} />
      </div>
    </div>
  );
}

export default TopScorersFt;
