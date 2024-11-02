import { Separator } from "@/components/ui/separator";
import { H1 } from "@/components/ui/typograhpy";
import { PlayersStoreProvider } from "@/context/PlayersCtx";
import PlayerList from "@/features/players/infraestructure/PlayerList";

async function PlayersPage() {
  return (
    <PlayersStoreProvider>
      <H1>Players</H1>
      <Separator />
      <PlayerList />
    </PlayersStoreProvider>
  );
}

export default PlayersPage;
