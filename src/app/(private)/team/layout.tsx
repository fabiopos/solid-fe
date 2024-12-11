import SettingsSideBar from "@/components/Settings/SettingsSideBar";

interface LayoutProps {
  children: React.ReactNode;
}

function TeamsLayout({ children }: LayoutProps) {
  return (
    <div className="flex gap-5 py-2">    
      {children}
    </div>
  );
}

export default TeamsLayout;
