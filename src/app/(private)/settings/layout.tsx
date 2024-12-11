
import SettingsSideBar from "@/components/Settings/SettingsSideBar";

interface LayoutProps {
  children: React.ReactNode;
}

function SettingsLayout({ children }: LayoutProps) {
  return (
    <div className="flex gap-5 p-5">     
      {children}
    </div>
  );
}



export default SettingsLayout;
