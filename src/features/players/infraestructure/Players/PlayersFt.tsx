"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePlayersStore } from "@/context/PlayersCtx";
import PlayersTable from "../PlayersTable";
import FieldPositionModal from "@/features/fieldPosition/infraestructure/FieldPositionModal/FieldPositionModal";
import Link from "next/link";

function PlayersFt() {
  const { players, filteredPlayers, tab, setTab, categories } = usePlayersStore(
    (state) => state
  );

  return (
    <div className="p-5">
      <div className="flex justify-end">
        <Link
          href={`/players/new`}
          className="text-sm hover:underline-offset-2 border py-2 px-4 dark:bg-slate-500 bg-primary text-white hover:bg-primary/90 rounded-lg"
        >
          Add New Player
        </Link>
      </div>

      <div className="border rounded-lg mt-2 bg-background">
        <Tabs
          defaultValue={tab}
          className="w-full"
          onValueChange={(value) => setTab(value)}
        >
          <TabsList>
            <TabsTrigger value="all">
              All Players ({players.length})
            </TabsTrigger>
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
            <PlayersTable players={players} caption={`You are viewing all ${players.length} players on your squad.`} />
          </TabsContent>

          {tab !== "all" && (
            <TabsContent value={tab}>
              <PlayersTable players={filteredPlayers[tab] ?? []} caption={`You are viewing ${filteredPlayers[tab].length} players the postion of ${tab}.`} />
            </TabsContent>
          )}
          {/* <TabsContent value="df">Change your password here.</TabsContent> */}
          <FieldPositionModal />
        </Tabs>
      </div>
    </div>
  );
}

export default PlayersFt;
