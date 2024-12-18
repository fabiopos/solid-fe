import SettingsSideBar from "@/components/Settings/SettingsSideBar";

interface LayoutProps {
  children: React.ReactNode;
}

function CompetitionsLayout({ children }: LayoutProps) {
  return <main className="p-5">{children}</main>;
}

export default CompetitionsLayout;
