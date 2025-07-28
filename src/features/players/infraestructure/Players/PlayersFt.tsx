"use client";
import { Tabs } from "@/components/ui/tabs";
import FieldPositionModal from "@/features/fieldPosition/infraestructure/FieldPositionModal/FieldPositionModal";
import PlayersFtHeader from "./PlayersFtHeader";
import PlayersFtTabList from "./Tabs/PlayersFtTabList";
import PlayersTabContent from "./Tabs/PlayersTabContent";
import { useSolidStore } from "@/providers/store.provider";
import {
  selectActiveTab,
  selectPlayersByStatus,
  selectPlayersInCategoryByStatus,
} from "@/stores/selectors";
import {
  useFetchFieldPositions,
  useFetchPlayers,
} from "@/hooks/players/players.hook";

function PlayersFt() {
  useFetchPlayers();
  useFetchFieldPositions();
  const setTab = useSolidStore((state) => state.setTab);
  const tab = useSolidStore(selectActiveTab);
  const playersByStatus = useSolidStore(selectPlayersByStatus);
  const playersFilteredByStatus = useSolidStore(
    selectPlayersInCategoryByStatus
  );

  return (
    <div>
      <PlayersFtHeader />

      <div className="border rounded-lg bg-background">
        <Tabs
          defaultValue={tab}
          className="w-full"
          onValueChange={(value) => setTab(value)}
        >
          <PlayersFtTabList />
          <PlayersTabContent tabValue="all" players={playersByStatus} />

          {tab !== "all" && (
            <PlayersTabContent
              tabValue={tab}
              players={playersFilteredByStatus}
            />
          )}
          <FieldPositionModal />
        </Tabs>
      </div>
    </div>
  );
}

export default PlayersFt;
