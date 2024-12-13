"use client";
import * as React from "react";
import { ChevronRight, File, Folder } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Calendar, Home, Settings, Shield, Trophy, Users } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { TeamSwitcher } from "./Team/TeamSwitcher";
import { useTeamSelect } from "@/features/team-select/domain/useTeamSelect";
import { Team } from "@/types/types.common";

// This is sample data.
const data = {
  baseMenu: [
    {
      title: "Home",
      url: "/dashboard",
      icon: Home,
      sideBar: true,
      navBar: true,
    },
    {
      title: "Players",
      url: "/players",
      icon: Users,
      sideBar: true,
      navBar: true,
    },
    {
      title: "Team",
      url: "/team",
      icon: Shield,
      sideBar: true,
      navBar: true,
    },
    {
      title: "Seasons",
      url: "/seasons",
      icon: Calendar,
      sideBar: true,
      navBar: true,
    },
    {
      title: "Competitions",
      url: "/competitions",
      icon: Trophy,
      sideBar: true,
      navBar: true,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
      sideBar: true,
      navBar: true,
    },
  ],
};

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  tree: any;
  teams: Team[]
}

export function AppSidebar({ tree, teams, ...props }: AppSidebarProps) {
  const pathname = usePathname();
  const myTeams = React.useMemo(()=> teams.filter(x => x.hasSubscription), [teams])

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <TeamSwitcher myTeams={myTeams} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.baseMenu.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className={cn(
                        pathname === item.url
                          ? "bg-neutral-600 dark:text-white hover:bg-slate-600 after:bg-slate-50"
                          : "hover:bg-primary",
                        "justify-start"
                      )}
                    >
                      <item.icon className="text-lg mr-5" size="18" />
                      {item.title}
                    </Link>
                  </SidebarMenuButton>
                  {/* <SidebarMenuBadge>{item.state}</SidebarMenuBadge> */}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Seasons, Competitions & Matches</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {tree.map((item: any, index: number) => (
                <Tree key={index} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}

function Tree({ item }: { item: { id: string; name: string } | any[] }) {
  const [i, ...items] = Array.isArray(item) ? item : [item];

  if (!i) return null;
  if (!items.length) {
    return (
      <SidebarMenuButton
        isActive={i.name === "Copa Compensar"}
        className="data-[active=true]:bg-transparent"
      >
        <Link href={`/matches/${i.id}`} className="flex gap-2 items-center">
          <File size={14} />
          <span className="text-ellipsis max-w-20 overflow-hidden text-nowrap">
            {i.name}
          </span>
        </Link>
      </SidebarMenuButton>
    );
  }

  return (
    <SidebarMenuItem>
      <Collapsible
        className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
        defaultOpen={i.name === "components" || i.name === "ui"}
      >
        <CollapsibleTrigger asChild>
          <SidebarMenuButton>
            <ChevronRight className="transition-transform" />
            <Folder />
            <span> {i.name}</span>
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {items.map((subItem, index) => (
              <Tree key={index} item={subItem} />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  );
}
