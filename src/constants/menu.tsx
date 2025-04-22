import {Calendar, ChevronsLeftRightEllipsis, Home, Settings, Shield, Trophy, Users} from "lucide-react";

export const menuItems = [
    {
        title: "Dashboard",
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
        navBar: false,
    },
    {
        title: "Lineup",
        url: "/lineup",
        icon: ChevronsLeftRightEllipsis,
        sideBar: true,
        navBar: false,
    },
    {
        title: "Team",
        url: "/team",
        icon: Shield,
        sideBar: true,
        navBar: false,
    },
    {
        title: "Seasons",
        url: "/seasons",
        icon: Calendar,
        sideBar: true,
        navBar: false,
    },
    {
        title: "Competitions",
        url: "/competitions",
        icon: Trophy,
        sideBar: true,
        navBar: false,
    },
    {
        title: "Settings",
        url: "/settings",
        icon: Settings,
        sideBar: true,
        navBar: false,
    },
];
