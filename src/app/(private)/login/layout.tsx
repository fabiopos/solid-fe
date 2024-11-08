import { Sidebar } from "@/components/ui/sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function LayoutLogin(props: LayoutProps) {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] min-h-screen p-4 pb-10 gap-5 sm:p-10">
      <main className="flex flex-col gap-2 row-start-2 sm:items-start">
        <div className="flex gap-2 items-start">
          <aside className="">
            <Sidebar />
            {/* <SidebarNav items={items} /> */}
          </aside>

          <div className="flex flex-col gap-8">
            <h1 className="text-6xl font-extrabold">Login</h1>
            {props.children}
          </div>
        </div>
      </main>
    </div>
  );
}
