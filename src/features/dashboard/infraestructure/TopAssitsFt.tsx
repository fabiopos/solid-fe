import TopAssists from "@/components/Dashboard/TopAsists/TopAsists";
import { DashboardFacade } from "@/facade/dashboard/DashboardFacade";

const LIMIT = 5;
async function TopAssistsFt() {
  const { players } = await getData();
  return (
    <div className="p-2">
      <div className="px-5 my-2">
        <h3 className="text-lg font-bold tracking-tight text-white max-lg:text-center">
          Top {LIMIT} Assists
        </h3>
      </div>
      <div className="px-5">
        <TopAssists aparitions={players} />
      </div>
    </div>
  );
}

async function getData() {
  const players = await DashboardFacade.getTopAsists();
  return { players };
}

export default TopAssistsFt;
