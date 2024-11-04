import { H1 } from "@/components/ui/typograhpy";
import { PlayersStoreProvider } from "@/context/PlayersCtx";
import PlayerList from "@/features/players/infraestructure/PlayerList";

function PlayersPage() {
;
  return (
    <PlayersStoreProvider>
      <H1>Squad</H1>
      <PlayerList />
    </PlayersStoreProvider>
  );
}

export default PlayersPage;
