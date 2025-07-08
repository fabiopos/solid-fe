"use client";

import { ChevronsUpDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Team } from "@/types/types.common";
import Image from "next/image";
import { useTeamSelect } from "@/features/team-select/domain/useTeamSelect";
import { useCallback, useEffect, useState } from "react";

interface TeamSwitcherProps {
  myTeams: Team[];
  selectedTeam: Team | undefined;
}
export function TeamSwitcher({ myTeams, selectedTeam }: TeamSwitcherProps) {
  const { isMobile } = useSidebar();
  const { onSelectTeam } = useTeamSelect();

  const [activeTeam, setActiveTeam] = useState<Team | undefined>(selectedTeam);

  const handleSelectTeam = useCallback((team: Team) => {
    setActiveTeam(team);
  }, []);

  useEffect(() => {
    if (activeTeam) onSelectTeam(activeTeam.id);
  }, [activeTeam]);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-transparent text-sidebar-primary-foreground">
                {/* <activeTeam.logo className="size-4" /> */}
                {activeTeam?.logoUrl && (
                  <Image
                    src={activeTeam.logoUrl}
                    alt="logo"
                    width={80}
                    height={100}
                  />
                )}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {activeTeam?.name}
                </span>
                <span className="truncate text-xs">
                  {activeTeam?.active ? "Active" : "Inactive"}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Teams
            </DropdownMenuLabel>
            {myTeams.map((team, index) => (
              <DropdownMenuItem
                key={team.name}
                onClick={() => handleSelectTeam(team)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  {activeTeam?.logoUrl && (
                    <Image
                      src={activeTeam.logoUrl}
                      alt="logo"
                      width={100}
                      height={100}
                    />
                  )}
                  {/* <team.logo className="size-4 shrink-0" /> */}
                </div>
                {team.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            {/* <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">Add team</div>
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
