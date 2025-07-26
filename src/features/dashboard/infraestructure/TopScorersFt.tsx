import TopScorers from "@/components/Dashboard/TopScorers/TopScorers";
import { DashboardFacade } from "@/facade/dashboard/DashboardFacade";

const LIMIT = 5;
async function TopScorersFt() {
  const { players } = await getData();
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

async function getData() {
  try {
    const players = await DashboardFacade.getTopScorers();
    return { players };
  } catch (error) {
    console.log(error);
    return { players: [] };
  }
}

export default TopScorersFt;
