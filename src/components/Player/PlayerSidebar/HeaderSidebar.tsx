"use client";
import { SidebarHeader } from "@/components/ui/sidebar";
import Image from "next/image";
import logo from "@/app/assets/logo.svg";
import { useSelectedTeam } from "@/hooks/use-team-id";

const HeaderSidebar = () => {
  const selectedTeam = useSelectedTeam();
  return (
    <SidebarHeader>
      <div className="flex justify-start items-center">
        <Image priority src={logo.src} alt="logo" width={45} height={45} />
        <div className="flex flex-col">
          <h2 className="text-xl font-bold">Solid Manager</h2>
          <small>{selectedTeam?.name ?? "no team"}</small>
        </div>
      </div>
    </SidebarHeader>
  );
};

export default HeaderSidebar;
