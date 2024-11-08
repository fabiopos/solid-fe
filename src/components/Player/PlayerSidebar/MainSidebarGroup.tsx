"use client";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import {
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "../../ui/sidebar";
import Link from "next/link";

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Players",
    url: "/players",
    icon: Inbox,
  },
  {
    title: "Team",
    url: "/team",
    icon: Calendar,
  },
  {
    title: "Seasons",
    url: "/seasons",
    icon: Search,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

const MainSidebarGroup = () => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Menu</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <Link href={item.url}>
                  <item.icon className="text-md" size="48" />
                  <span className="text-md">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default MainSidebarGroup;
