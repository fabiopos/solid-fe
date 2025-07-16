"use client";
import {
  Calendar,
  ChevronRight,
  File,
  Folder,
  Home,
  Settings,
  Shield,
  Trophy,
  Users,
} from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { TeamSwitcher } from "./Team/TeamSwitcher";
import { useSolidStore } from "@/providers/store.provider";
import { selectSelectedTeam, selectTree } from "@/stores/selectors";

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
      url: "/seasons/competitions",
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

export function AppSidebar() {
  const pathname = usePathname();
  const selectedTeam = useSolidStore(selectSelectedTeam);
  const tree = useSolidStore(selectTree);

  return (
    <Sidebar>
      <SidebarHeader>
        <TeamSwitcher />
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
                          ? "bg-neutral-300 dark:bg-neutral-600 dark:text-white dark:hover:bg-slate-600 after:bg-slate-50"
                          : "hover:bg-primary",
                        "justify-start"
                      )}
                    >
                      <item.icon className="text-lg mr-5" size="18" />
                      {item.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Seasons, Competitions & Matches</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {(tree ?? []).map((item: never, index: number) => (
                <Tree key={index} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter>
        {!selectedTeam && <div className="p-2 text-sm">No team selected</div>}
      </SidebarFooter>
    </Sidebar>
  );
}

function Tree({ item }: { item: { id: string; name: string } | never[] }) {
  const [i, ...items] = Array.isArray(item) ? item : [item];

  if (!i) return null;
  if (!items.length) {
    return (
      <SidebarMenuButton
        isActive={i.name === "Copa Compensar"}
        className="data-[active=true]:bg-transparent"
      >
        <Link
          href={`/seasons/competitions/matches/${i.id}`}
          className="flex gap-2 items-center"
        >
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
