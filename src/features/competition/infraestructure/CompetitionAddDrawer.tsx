import { useCallback, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { DateRange } from "react-day-picker";
import { addDays, toDate } from "date-fns";
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
import { EmptyCompetition } from "../domain/competition.schema";
import { SeasonDateRangePicker } from "@/features/seasons/infraestructure/Season/SeasonDateRangePicker";
import { useCompetitionStore } from "@/context/CompetitionCtx";
import { Textarea } from "@/components/ui/textarea";
import { CompetitionStatusEnum } from "@/shared/enums/competitionStatusEnum";

interface CompetitionDrawerProps {
  open: boolean;
  onClose: () => void;
  seasonId: string;
}

function CompetitionAddDrawer({
  open,
  onClose,
  seasonId,
}: CompetitionDrawerProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: toDate(new Date()),
    to: toDate(addDays(new Date(), 30)),
  });
  const { postCompetition } = useCompetitionStore((state) => state);
  const { data } = useSession();

  const isDisabled = useMemo(() => {
    return !name && !dateRange && !description;
  }, [dateRange, description, name]);

  const handleSubmit = useCallback(async () => {
    const payload = EmptyCompetition.make({
      startDate: dateRange?.from,
      endDate: dateRange?.to,
      name,
      description,
      status: CompetitionStatusEnum.IN_PROGRESS,
    });

    postCompetition(payload, seasonId, data?.user.access_token ?? "");
    onClose();
  }, [
    seasonId,
    postCompetition,
    dateRange?.from,
    dateRange?.to,
    name,
    description,
    data?.user.access_token,
    onClose,
  ]);

  const handleDateRangeChange = (date: DateRange | undefined) => {
    setDateRange(date);
  };

  return (
    <Drawer open={open} direction="right" onClose={onClose}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Edit Competition Details</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>
          <div className="p-5 space-y-2">
            <Input
              placeholder="Competition name"
              defaultValue={""}
              onChange={(e) => setName(e.target.value)}
            />
            <SeasonDateRangePicker
              from={dateRange?.from ?? undefined}
              to={dateRange?.to ?? undefined}
              onDateRangeChange={handleDateRangeChange}
            />

            <Textarea
              defaultValue={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <DrawerFooter>
            <Button disabled={isDisabled} onClick={handleSubmit}>
              Create Competition
            </Button>
            <DrawerClose onClick={onClose}></DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default CompetitionAddDrawer;
