
interface LayoutProps {
  children: React.ReactNode;
}

export default function LayoutPlayers(props: LayoutProps) {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">      
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">        
        {props.children}
      </main>
    </div>
  );
}
