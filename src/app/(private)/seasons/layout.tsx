interface LayoutProps {
  children: React.ReactNode;
}

function SeasonsLayout({ children }: LayoutProps) {
  return (
    <div className="flex flex-1 p-5">      
      {children}
    </div>
  );
}

export default SeasonsLayout;
