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
import { useCallback, useMemo, useState } from "react";
import { EmptySeason } from "../../domain/season.schema";
import { toDate } from "date-fns";
import { useSession } from "next-auth/react";
import { useTeamId } from "@/hooks/use-team-id";
import { DateRange } from "react-day-picker";

interface SeasonAddDrawerProps {
  open: boolean;
  onClose: () => void;
}
function SeasonAddDrawer({ open, onClose }: SeasonAddDrawerProps) {
  const teamId = useTeamId();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { data } = useSession();
  const {
    emptySeason: season,
    setEmptySeason,
    postEmptySeason,
  } = useSeasonStore((state) => state);

  const isDisabled = useMemo(() => {
    return !name && !season?.startDate && !season?.endDate;
  }, [name, season?.endDate, season?.startDate]);

  const handleSubmit = useCallback(async () => {
    console.log(season);
    if (!season) return;
    onClose();
    await postEmptySeason(
      EmptySeason.make({
        ...season,
        name: name,
        description: description,
        startDate: season.startDate ? toDate(season.startDate) : null,
        endDate: season.endDate ? toDate(season.endDate) : null,
      }),
      data?.user.access_token ?? ""
    );
  }, [
    data?.user.access_token,
    onClose,
    postEmptySeason,
    season,
    name,
    description,
  ]);

  const handleDateRangeChange = (date: DateRange | undefined) => {
    if (!teamId) return null;
    setEmptySeason({ teamId, endDate: date?.to, startDate: date?.from });
  };

  console.log(teamId);
  return (
    <Drawer open={open} direction="right" onClose={onClose}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Add New Season</DrawerTitle>
            <DrawerDescription>
              Write season details to create a new one.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-5 space-y-2">
            <Input
              placeholder="Season name"
              defaultValue={season?.name}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <SeasonDateRangePicker
              from={season?.startDate ?? undefined}
              to={season?.endDate ?? undefined}
              onDateRangeChange={handleDateRangeChange}
            />

            <Input
              placeholder="Season description"
              defaultValue={season?.description}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <DrawerFooter>
            <Button disabled={isDisabled} onClick={handleSubmit}>
              Create Season
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

export default SeasonAddDrawer;
