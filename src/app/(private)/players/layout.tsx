import PlayersSidebar from "@/components/Player/PlayerSidebar/PlayersSidebar";
import { PlayersStoreProvider } from "@/context/PlayersCtx";

interface LayoutProps {
  children: React.ReactNode;
}

export default function LayoutPlayers(props: LayoutProps) {
  return (
    <PlayersStoreProvider>
      <div className="grid grid-rows-[20px_1fr_20px] min-h-screen p-4 pb-10 gap-5 sm:p-10">
        <main className="flex flex-col gap-2 row-start-2 sm:items-start">
          <div className="flex gap-2 items-start">
            <aside className="">
              <PlayersSidebar />
              {/* <SidebarNav items={items} /> */}
            </aside>

            {props.children}
          </div>
        </main>
      </div>
    </PlayersStoreProvider>
  );
}
