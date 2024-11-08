import { SidebarHeader } from "@/components/ui/sidebar";
import Image from "next/image";
import logo from "@/app/assets/logo.svg";

const HeaderSidebar = () => {
  return (
    <SidebarHeader>
      <div className="flex justify-start items-center">
        <Image priority src={logo.src} alt="logo" width={45} height={45} />
        <h2 className="text-xl font-bold">Solid Manager</h2>
      </div>
    </SidebarHeader>
  );
};

export default HeaderSidebar;
