import SettingsSideBar from "@/components/Settings/SettingsSideBar";

interface LayoutProps {
  children: React.ReactNode;
}

function SettingsLayout({ children }: LayoutProps) {
  return (
    <div className="flex gap-5 py-10">
      <aside>
        <SettingsSideBar />
      </aside>
      {children}
    </div>
  );
}

export default SettingsLayout;
