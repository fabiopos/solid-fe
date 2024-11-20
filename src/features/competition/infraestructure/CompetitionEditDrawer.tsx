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

import { useCallback, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { DateRange } from "react-day-picker";
import {
  CompetitionType,
  EmptyCompetition,
} from "../domain/competition.schema";
import { SeasonDateRangePicker } from "@/features/seasons/infraestructure/Season/SeasonDateRangePicker";
import { useCompetitionStore } from "@/context/CompetitionCtx";
import { Textarea } from "@/components/ui/textarea";
import { toDate } from "date-fns";

interface CompetitionDrawerProps {
  open: boolean;
  onClose: () => void;
  competition: CompetitionType | null;
}
function CompetitionEditDrawer({
  open,
  onClose,
  competition,
}: CompetitionDrawerProps) {
  const [name, setName] = useState(competition?.name);
  const [description, setDescription] = useState(competition?.description);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: competition?.startDate ? toDate(competition?.startDate) : undefined,
    to: competition?.endDate ? toDate(competition?.endDate) : undefined,
  });
  const { selectedCompetition, patchCompetition } = useCompetitionStore(
    (state) => state
  );
  const { data } = useSession();

  const isDisabled = useMemo(() => {
    return (
      !competition?.name && !competition?.startDate && !competition?.endDate
    );
  }, [competition]);

  const handleSubmit = useCallback(async () => {
    if (!competition?.id) return;
    patchCompetition(
      competition.id,
      EmptyCompetition.make({
        ...selectedCompetition,
        startDate: dateRange?.from,
        endDate: dateRange?.to,
        name,
        description,
      }),
      data?.user.access_token ?? ""
    );
    onClose();
  }, [
    competition?.id,
    dateRange,
    data?.user.access_token,
    onClose,
    patchCompetition,
    selectedCompetition,
    name,
    description,
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
              defaultValue={competition?.name}
              onChange={(e) => setName(e.target.value)}
            />
            <SeasonDateRangePicker
              from={competition?.startDate ?? undefined}
              to={competition?.endDate ?? undefined}
              onDateRangeChange={handleDateRangeChange}
            />

            <Textarea
              defaultValue={competition?.description ?? ''}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <DrawerFooter>
            <Button disabled={isDisabled} onClick={handleSubmit}>
              Update Competition
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

export default CompetitionEditDrawer;
