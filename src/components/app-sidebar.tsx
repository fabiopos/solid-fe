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
import { buttonVariants } from "./ui/button";
import { usePathname } from "next/navigation";

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
  tree: [
    ["Season 2021", ["Competition 1", "Match 1", "Match 2", "Match 3"]],
    ["Season 2022", ["ui", "button.tsx", "card.tsx"], "header.tsx", "footer.tsx"],
    ["Season 2023", ["util.ts"]],
    ["Season 2024", "favicon.ico", "vercel.svg"],
    "Logout",
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  return (
    <Sidebar {...props}>
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
              {data.tree.map((item, index) => (
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

function Tree({ item }: { item: string | any[] }) {
  const [name, ...items] = Array.isArray(item) ? item : [item];

  if (!items.length) {
    return (
      <SidebarMenuButton
        isActive={name === "button.tsx"}
        className="data-[active=true]:bg-transparent"
      >
        <File />
        {name}
      </SidebarMenuButton>
    );
  }

  return (
    <SidebarMenuItem>
      <Collapsible
        className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
        defaultOpen={name === "components" || name === "ui"}
      >
        <CollapsibleTrigger asChild>
          <SidebarMenuButton>
            <ChevronRight className="transition-transform" />
            <Folder />
            {name}
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
