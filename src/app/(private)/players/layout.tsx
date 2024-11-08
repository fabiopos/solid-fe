import PlayersSidebar from "@/components/Player/PlayerSidebar/PlayersSidebar";
import { PlayersStoreProvider } from "@/context/PlayersCtx";

interface LayoutProps {
  children: React.ReactNode;
}

export default function LayoutPlayers(props: LayoutProps) {
  return (
    <PlayersStoreProvider>
      <div className="flex gap-5 py-10">
        <aside className="">
          <PlayersSidebar />
        </aside>
        {props.children}
      </div>
    </PlayersStoreProvider>
  );
}
