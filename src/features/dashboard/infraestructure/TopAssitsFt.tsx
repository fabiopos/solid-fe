import TopAssists from "@/components/Dashboard/TopAsists/TopAsists";
import { FulfilledMatchAparition } from "@/features/aparition/domain/aparition.schema";

async function TopAssistsFt({
  players,
}: {
  players: FulfilledMatchAparition[];
}) {
  return (
    <div className="p-2">
      <div className="px-5 my-2">
        <h3 className="text-lg font-bold tracking-tight text-white max-lg:text-center">
          Top 5 Assists
        </h3>
      </div>
      <div className="px-5">
        <TopAssists aparitions={players} />
      </div>
    </div>
  );
}

export default TopAssistsFt;
