"use client";
import { useCallback, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
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
import { Textarea } from "@/components/ui/textarea";
import { EmptyMatch } from "../domain/match.schema";
import { useMatchStore } from "@/context/MatchCtx";
import TeamSelectPopover, {
  ComboItemProps,
} from "@/components/Team/TeamSelectPopover";
import { DateTimePicker } from "@/components/ui/customDateTimePicker";

interface MatchDrawerProps {
  open: boolean;
  onClose: () => void;
  onMatchCreated?: () => void;
  competitionId: string;
}

function MatchAddDrawer({
  open,
  onClose,
  competitionId,
  onMatchCreated,
}: MatchDrawerProps) {
  const [title, setTitle] = useState("");
  const [matchDay, setMatchDay] = useState<Date | undefined>();
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [homeTeamId, setHomeTeamId] = useState<string | undefined>(undefined);
  const [awayTeamId, setAwayTeamId] = useState<string | undefined>(undefined);
  const { postMatch } = useMatchStore((state) => state);
  const { data } = useSession();

  const isDisabled = useMemo(() => {
    return !title && !matchDay && !description;
  }, [matchDay, description, title]);

  const handleSubmit = useCallback(async () => {
    const payload = EmptyMatch.make({
      title,
      homeTeamId,
      awayTeamId,
      matchDay: matchDay,
      matchHour: matchDay,
      wo: false,
      location,
      completed: false,
      competitionId,
    });

    await postMatch(payload, data?.user.access_token ?? "");
    if (onMatchCreated) onMatchCreated();

    onClose();
  }, [title, homeTeamId, awayTeamId, matchDay, location, competitionId, postMatch, data?.user.access_token, onMatchCreated, onClose]);

  const handleDateChange = (date: Date | undefined) => {
    setMatchDay(date);
  };

  const handleHomeTeamSelect = (item: ComboItemProps | undefined) => {
    if (item) setHomeTeamId(item.value);
    else setHomeTeamId(undefined);
  };

  const handleAwayTeamSelect = (item: ComboItemProps | undefined) => {
    if (item) setAwayTeamId(item.value);
    else setAwayTeamId(undefined);
  };

  return (
    <Drawer open={open} direction="right" onClose={onClose}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-md">
          <DrawerHeader>
            <DrawerTitle>Add New Match</DrawerTitle>
            <DrawerDescription>
              A new match is about to begin.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-5 space-y-2">
            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col">
                <span className="text-zinc-400 text-sm pl-2">Home</span>
                <TeamSelectPopover
                  defaultValue=""
                  label="Select home team"
                  onSelect={handleHomeTeamSelect}
                />
              </div>

              <div className="flex flex-col">
                <span className="text-zinc-400 text-sm pl-2">Away</span>
                <TeamSelectPopover
                  defaultValue=""
                  label="Select away team"
                  onSelect={handleAwayTeamSelect}
                />
              </div>
            </div>
            <Input
              placeholder="Match title"
              defaultValue={""}
              onChange={(e) => setTitle(e.target.value)}
            />

            <Input
              placeholder="Location"
              defaultValue={""}
              onChange={(e) => setLocation(e.target.value)}
            />

            {/* <CustomDatePicker date={matchDay} onChange={handleDateChange} /> */}
            <DateTimePicker value={matchDay} onChange={handleDateChange} />

            <Textarea
              defaultValue={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <DrawerFooter>
            <Button disabled={isDisabled} onClick={handleSubmit}>
              Create Match
            </Button>
            <DrawerClose onClick={onClose}></DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default MatchAddDrawer;
