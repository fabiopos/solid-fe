import { TabsContent } from "@/components/ui/tabs";
import { FulfilledPlayerWithStats } from "@/features/players/domain/player.effect.schema";
import PlayersTable from "../../PlayersTable";

interface TabContentProps {
  tabValue: string;
  players: FulfilledPlayerWithStats[];
}

function PlayersTabContent({ players, tabValue }: TabContentProps) {
  return (
    <TabsContent value={tabValue}>
      <PlayersTable
        players={players}
        caption={`You are viewing all ${players.length} players on your squad.`}
      />
    </TabsContent>
  );
}

export default PlayersTabContent;
