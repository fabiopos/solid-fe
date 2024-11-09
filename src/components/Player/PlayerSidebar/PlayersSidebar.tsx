"use client";
import PositionCategoriesSidebarGroup from "./PositionCategoriesSidebarGroup";
import GlobalSideBar from "@/components/GlobalSideBar/GlobalSideBar";

const PlayersSidebar = () => {
  return (
    <GlobalSideBar
      footer={
        <p className="text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus
          excepturi ex obcaecati.
        </p>
      }      
      secondaryContent={<PositionCategoriesSidebarGroup />}
    />
  );
};

export default PlayersSidebar;
