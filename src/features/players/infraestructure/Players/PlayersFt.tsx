"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePlayersStore } from "@/context/PlayersCtx";
import PlayersTable from "../PlayersTable";
import FieldPositionModal from "@/features/fieldPosition/infraestructure/FieldPositionModal/FieldPositionModal";
import Link from "next/link";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

function PlayersFt() {
  const {
    players,
    filteredPlayers,
    tab,
    setTab,
    categories,
    setOnlyActive,
    onlyActive,
  } = usePlayersStore((state) => state);

  const playersByStatus = players.filter((x) => x.active === onlyActive);

  return (
    <div>
      <div className="flex justify-end">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="active-players"
              onCheckedChange={setOnlyActive}
              checked={onlyActive}
            />
            <Label htmlFor="airplane-mode">
              {onlyActive ? "Only inactive" : "Only active"}
            </Label>
          </div>

          <Link
            href={`/players/new`}
            className="text-sm hover:underline-offset-2 my-2 border py-2 px-4 dark:bg-slate-500 bg-primary text-white hover:bg-primary/90 rounded-lg"
          >
            Add New Player
          </Link>
        </div>
      </div>

      <div className="border rounded-lg bg-background">
        <Tabs
          defaultValue={tab}
          className="w-full"
          onValueChange={(value) => setTab(value)}
        >
          <TabsList>
            <TabsTrigger value="all">
              All Players ({playersByStatus.length})
            </TabsTrigger>
            {categories.map((x) => (
              <TabsTrigger key={x} value={x ?? ""} className="capitalize">
                {x.toLowerCase()} (
                {(filteredPlayers[x] ?? []).filter(
                  (x) => x.active === onlyActive
                ).length ?? 0}
                )
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="all">
            <PlayersTable
              players={playersByStatus}
              caption={`You are viewing all ${playersByStatus.length} players on your squad.`}
            />
          </TabsContent>

          {tab !== "all" && (
            <TabsContent value={tab}>
              <PlayersTable
                players={(filteredPlayers[tab] ?? []).filter(
                  (x) => x.active === onlyActive
                )}
                caption={`You are viewing ${filteredPlayers[tab].length} players the postion of ${tab}.`}
              />
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
