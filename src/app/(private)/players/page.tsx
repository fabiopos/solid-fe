import { Separator } from "@/components/ui/separator";
import PlayersTable from "@/features/players/infraestructure/PlayersTable";
import Link from "next/link";

function PlayersPage() {
  return (
    <div className="">
      <div className="flex justify-between items-center space-y-5">
        <h2 className="text-3xl">All Players</h2>
        <Link
          href={`/players/new`}
          className="text-sm hover:underline hover:underline-offset-2"
        >
          Add New Player
        </Link>
      </div>
      <Separator className="my-5" />
      <PlayersTable />
    </div>
  );
}

export default PlayersPage;
