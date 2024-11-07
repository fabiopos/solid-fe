import { PlayersStoreProvider } from "@/context/PlayersCtx";
import { SidebarNav } from "@/features/players/infraestructure/SideNavBar";

interface LayoutProps {
  children: React.ReactNode;
}

const items = [
  {
    title: "All",
    href: "/players",
  },
  {
    title: "Goalkeepers",
    href: "/players/goalkeeper",
  },
  {
    title: "Defenders",
    href: "/players/defender",
  },
  {
    title: "Midfielders",
    href: "/players/midfielder",
  },
  {
    title: "Forwards",
    href: "/players/forward",
  },
];

export default function LayoutPlayers(props: LayoutProps) {
  return (
    <PlayersStoreProvider>
      <div className="grid grid-rows-[20px_1fr_20px] min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <main className="flex flex-col gap-2 row-start-2 sm:items-start">
          <div className="flex gap-2 items-start">
            <aside className="">
              <SidebarNav items={items} />
            </aside>
            <div className="px-5">{props.children}</div>
          </div>
        </main>
      </div>
    </PlayersStoreProvider>
  );
}
