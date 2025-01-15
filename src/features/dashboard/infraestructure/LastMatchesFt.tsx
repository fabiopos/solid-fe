import { LIMIT } from "@/constants/dashboard.constants";
import { FulfilledMatch } from "@/features/match/domain/match.schema";
import MatchesShortResults from "@/features/match/infraestructure/MatchesShortResults/MatchesShortResults";
import LastMatchesList from "./LastMatchesList";

interface LastMatchesFtProps {
  lastMatches: FulfilledMatch[];
}

function LastMatchesFt({ lastMatches }: LastMatchesFtProps) {
  return (
    <div className="">
      <div className="px-5 my-2 flex justify-between">
        <h3 className="text-xl font-bold tracking-tight dark:text-white max-lg:text-center">
          Last {LIMIT} Matches
        </h3>
        <MatchesShortResults matches={lastMatches} />
      </div>
      <LastMatchesList lastMatches={lastMatches} />
    </div>
  );
}

export default LastMatchesFt;
