
interface LayoutProps {
  children: React.ReactNode;
}

function CompetitionsLayout({ children }: LayoutProps) {
  return <main className="flex flex-1 p-5">{children}</main>;
}

export default CompetitionsLayout;
