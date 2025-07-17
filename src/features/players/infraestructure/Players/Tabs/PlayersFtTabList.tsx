import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSolidStore } from "@/providers/store.provider";
import {
  selectCategoriesCount,
  selectPlayersByStatus,
} from "@/stores/selectors";

function PlayersFtTabList() {
  const playersByStatus = useSolidStore(selectPlayersByStatus);
  const categoriesCounts = useSolidStore(selectCategoriesCount);
  return (
    <TabsList>
      <TabsTrigger value="all">
        All Players ({playersByStatus.length})
      </TabsTrigger>
      {categoriesCounts.map(({ name, count }) => (
        <TabsTrigger key={name} value={name} className="capitalize">
          {name.toLowerCase()} ({count})
        </TabsTrigger>
      ))}
    </TabsList>
  );
}

export default PlayersFtTabList;
