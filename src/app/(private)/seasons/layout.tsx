import SettingsSideBar from "@/components/Settings/SettingsSideBar";

interface LayoutProps {
  children: React.ReactNode;
}

function SeasonsLayout({ children }: LayoutProps) {
  return (
    <div className="flex p-5">      
      {children}
    </div>
  );
}

export default SeasonsLayout;
