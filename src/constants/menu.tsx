import { Calendar, Home, Settings, Shield, Users } from "lucide-react";

export const menuItems = [
  {
    title: "Home",
    url: "/",
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
    title: "Settings",
    url: "/settings",
    icon: Settings,
    sideBar: true,
    navBar: true,
  },
];
