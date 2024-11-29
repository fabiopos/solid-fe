"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useMemo, useState } from "react";
import CustomCombo from "../ui/customCombo";
import { TeamGet } from "@/features/teams/application/TeamGet";
import { ApiClient } from "@/lib/ApiClient";
import { useSession } from "next-auth/react";
import { FulfilledTeam } from "@/features/teams/domain/team.schema";
import TeamCreateDrawer from "@/features/teams/infraestructure/TeamCreateDrawer";

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
  const [open, setOpen] = useState(false);
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

  return (
    <>
      <CustomCombo
        cmdPlaceHolder={label}
        value={value}
        onChange={setValue}
        items={items}
        label={label}
        noItemFoundLabel={
          <div className="flex flex-col gap-2 p-5">
            <span>No team found...</span>
            <Button onClick={() => setOpen(true)} variant="outline">
              Create new team
            </Button>
          </div>
        }
        onSelect={onSelect}
      />
      <TeamCreateDrawer
        onClose={() => setOpen(false)}
        open={open}
        title="Add new team"
        subtitle="Fill the form to create a new team"
      />
    </>
  );
}

export default TeamSelectPopover;
