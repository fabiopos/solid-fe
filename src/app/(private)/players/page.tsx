import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import PlayersTable from "@/features/players/infraestructure/PlayersTable";

function PlayersPage() {
  return (
    <div className="">
      <div className="flex justify-between items-center space-y-5">
        <h2 className="text-3xl">All Players</h2>
        <Button variant="default">Add Player</Button>
      </div>
      <Separator className="my-5" />
      <PlayersTable />
    </div>
  );
}

export default PlayersPage;
