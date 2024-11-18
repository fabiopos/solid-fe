import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { SeasonDateRangePicker } from "./SeasonDateRangePicker";
import { useSeasonStore } from "@/context/SeasonCtx";
import { useCallback, useMemo } from "react";
import { PartialSeason } from "../../domain/season.schema";
import { toDate } from "date-fns";
import { useSession } from "next-auth/react";

interface SeasonDrawerProps {
  open: boolean;
  onClose: () => void;
}
function SeasonDrawer({ open, onClose }: SeasonDrawerProps) {
  const { data } = useSession();
  const {
    selectedSeason: season,
    updateSelectedSeason,
    updateSeason,
  } = useSeasonStore((state) => state);

  const isDisabled = useMemo(() => {
    return !season?.name && !season?.startDate && !season?.endDate;
  }, [season]);

  const handleSubmit = useCallback(async () => {
    if (!season?.id) return;
    onClose();
    await updateSeason(
      season.id,
      PartialSeason.make({
        ...season,
        startDate: season.startDate ? toDate(season.startDate) : null,
        endDate: season.endDate ? toDate(season.endDate) : null,
      }),
      data?.user.access_token ?? ""
    );
  }, [season]);

  return (
    <Drawer open={open} direction="right" onClose={onClose}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Edit Season Details</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>
          <div className="p-5 space-y-2">
            <Input
              placeholder="Season name"
              defaultValue={season?.name}
              onChange={(e) => updateSelectedSeason({ name: e.target.value })}
            />
            <SeasonDateRangePicker
              from={season?.startDate ?? undefined}
              to={season?.endDate ?? undefined}
            />
          </div>
          <DrawerFooter>
            <Button disabled={isDisabled} onClick={handleSubmit}>
              Update Season
            </Button>
            <DrawerClose onClick={onClose}>
              {/* <Button variant="outline" onClick={onClose}>
              Cancel
            </Button> */}
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default SeasonDrawer;
