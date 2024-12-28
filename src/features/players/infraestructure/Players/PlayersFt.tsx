"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePlayersStore } from "@/context/PlayersCtx";
import PlayersTable from "../PlayersTable";
import FieldPositionModal from "@/features/fieldPosition/infraestructure/FieldPositionModal/FieldPositionModal";

function PlayersFt() {
  const { players, filteredPlayers, tab, setTab, categories } = usePlayersStore(
    (state) => state
  );

  console.log(players);

  return (
    <>
      <Tabs
        defaultValue={tab}
        className="w-full"
        onValueChange={(value) => setTab(value)}
      >
        <TabsList>
          <TabsTrigger value="all">All Players ({players.length})</TabsTrigger>
          {categories.map((x) => (
            <TabsTrigger key={x} value={x ?? ""} className="capitalize">
              {x.toLowerCase()} ({filteredPlayers[x]?.length ?? 0})
            </TabsTrigger>
          ))}
          {/* <TabsTrigger value="gk">Goalkeepers</TabsTrigger>
          <TabsTrigger value="df">Defenders</TabsTrigger>
          <TabsTrigger value="md">Midfielders</TabsTrigger>
          <TabsTrigger value="fw">Forwards</TabsTrigger> */}
        </TabsList>
        <TabsContent value="all">
          <PlayersTable players={players} />
        </TabsContent>

        {tab !== "all" && (
          <TabsContent value={tab}>
            <PlayersTable players={filteredPlayers[tab] ?? []} />
          </TabsContent>
        )}
        {/* <TabsContent value="df">Change your password here.</TabsContent> */}
        <FieldPositionModal />
      </Tabs>
    </>
  );
}

export default PlayersFt;
