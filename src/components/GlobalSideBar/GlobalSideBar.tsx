import { ReactNode } from "react";
import { Sidebar, SidebarContent, SidebarFooter } from "../ui/sidebar";
import MainSidebarGroup from "./MainSidebarGroup";
import HeaderSidebar from "./HeaderSidebar";

interface GlobalSideBarProps {
  secondaryContent?: ReactNode;
  footer?: ReactNode;
}

const GlobalSideBar = ({ secondaryContent, footer }: GlobalSideBarProps) => {
  return (
    <Sidebar variant="floating">
      <HeaderSidebar />
      <SidebarContent>
        <MainSidebarGroup />
        {secondaryContent}
      </SidebarContent>
      <SidebarFooter className="p-5">{footer}</SidebarFooter>
    </Sidebar>
  );
};

export default GlobalSideBar;
