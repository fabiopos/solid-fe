"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useMemo } from "react";
import CustomCombo from "../ui/customCombo";
import { TeamGet } from "@/features/teams/application/TeamGet";
import { ApiClient } from "@/lib/ApiClient";
import { useSession } from "next-auth/react";
import { FulfilledTeam } from "@/features/teams/domain/team.schema";

export interface ComboItemProps {
  value: string;
  label: string;
}
interface TeamSelectPopoverProps {
  defaultValue: string;
  onSelect: (item: ComboItemProps | undefined) => void;
  label: string;
}

const client = new TeamGet(new ApiClient());

function TeamSelectPopover({
  defaultValue,
  onSelect,
  label,
}: TeamSelectPopoverProps) {
  const { data } = useSession();
  const [teams, setTeams] = React.useState<FulfilledTeam[]>([]);
  const [value, setValue] = React.useState(defaultValue ?? "");

  useEffect(() => {
    client
      .searchByName(value, data?.user.access_token ?? "")
      .then((t) => setTeams(t));
  }, [value, data?.user.access_token]);

  const items = useMemo(() => {
    return teams.map((x) => ({
      label: x.name ?? "",
      value: x.id ?? "",
    }));
  }, [teams]);

  console.log(value);

  return (
    <CustomCombo
      cmdPlaceHolder={label}
      value={value}
      onChange={setValue}
      items={items}
      label={label}
      noItemFoundLabel={
        <div className="flex flex-col gap-2 p-5">
          <span>No team found...</span>
          <Button variant="outline">Create new team</Button>
        </div>
      }
      onSelect={onSelect}
    
    />
  );
}

export default TeamSelectPopover;
