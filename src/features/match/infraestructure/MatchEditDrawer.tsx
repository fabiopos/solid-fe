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
import { EmptyMatch, FulfilledMatch } from "../domain/match.schema";
import { useMatchStore } from "@/context/MatchCtx";
import TeamSelectPopover, {
  ComboItemProps,
} from "@/components/Team/TeamSelectPopover";
import { DateTimePicker } from "@/components/ui/customDateTimePicker";
import { toDate } from "date-fns";

interface MatchDrawerProps {
  open: boolean;
  onClose: () => void;
  competitionId: string;
  match: FulfilledMatch;
}

function MatchEditDrawer({
  open,
  onClose,
  competitionId,
  match,
}: MatchDrawerProps) {
  const [title, setTitle] = useState(match.title);
  const [matchDay, setMatchDay] = useState<Date | undefined>(
    match.matchDay ? toDate(match.matchDay) : undefined
  );
  const [location, setLocation] = useState(match.location);
  const [description, setDescription] = useState("");
  const [homeTeamId, setHomeTeamId] = useState<string | undefined>(
    match.homeTeamId
  );
  const [awayTeamId, setAwayTeamId] = useState<string | undefined>(
    match.awayTeamId
  );
  const { patchMatch } = useMatchStore((state) => state);
  const { data } = useSession();

  const isDisabled = useMemo(() => {
    return !title || !matchDay || !competitionId;
  }, [matchDay, competitionId, title]);

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

    if(!match.id) return;

    await patchMatch(match.id, payload, data?.user.access_token ?? "");

    onClose();
  }, [
    title,
    homeTeamId,
    awayTeamId,
    matchDay,
    location,
    competitionId,
    patchMatch,
    data?.user.access_token,
    onClose,
  ]);

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
            <DrawerTitle>Edit Match Details</DrawerTitle>
            <DrawerDescription>
              A new match is about to begin. {competitionId ?  competitionId : 'no-competition'}
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-5 space-y-2">
            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col">
                <span className="text-zinc-400 text-sm pl-2">Home</span>
                <TeamSelectPopover
                  defaultValue={match.homeTeam?.name ?? ""}
                  label="Select home team"
                  onSelect={handleHomeTeamSelect}
                />
              </div>

              <div className="flex flex-col">
                <span className="text-zinc-400 text-sm pl-2">Away</span>
                <TeamSelectPopover
                  defaultValue={match.awayTeam?.name ?? ""}
                  label="Select away team"
                  onSelect={handleAwayTeamSelect}
                />
              </div>
            </div>
            <Input
              placeholder="Match title"
              defaultValue={match.title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <Input
              placeholder="Location"
              defaultValue={match.location ?? ''}
              onChange={(e) => setLocation(e.target.value)}
            />

            {/* <CustomDatePicker date={matchDay} onChange={handleDateChange} /> */}
            <DateTimePicker granularity="minute" value={matchDay} onChange={handleDateChange} />

            <Textarea
              defaultValue={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <DrawerFooter>
            <Button disabled={isDisabled} onClick={handleSubmit}>
              Update Match
            </Button>
            <DrawerClose onClick={onClose}></DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default MatchEditDrawer;
