"use client";
import { Sidebar, SidebarContent, SidebarFooter } from "../../ui/sidebar";
import PositionCategoriesSidebarGroup from "./PositionCategoriesSidebarGroup";
import MainSidebarGroup from "./MainSidebarGroup";
import HeaderSidebar from "./HeaderSidebar";

const PlayersSidebar = () => {
  
  return (
    <Sidebar variant="floating">
      <HeaderSidebar />
      <SidebarContent>
        <MainSidebarGroup />
        <PositionCategoriesSidebarGroup />
      </SidebarContent>
      <SidebarFooter className="p-5">
        <p className="text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus
          excepturi ex obcaecati.
        </p>
      </SidebarFooter>
    </Sidebar>
  );
};

export default PlayersSidebar;
