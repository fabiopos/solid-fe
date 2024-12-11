import LastMatches from "@/components/Dashboard/LastMatches/LastMatches";
import NextMatch from "@/components/Dashboard/NextMatch/NextMatch";
import LastPlayersAddedFt from "@/features/dashboard/infraestructure/LastPlayersAdded";
import TeamCalendatFt from "@/features/dashboard/infraestructure/TeamCalendatFt";
import TeamStats from "@/features/dashboard/infraestructure/TeamStats";
import TopAssistsFt from "@/features/dashboard/infraestructure/TopAssitsFt";
import TopScorersFt from "@/features/dashboard/infraestructure/TopScorersFt";

function Dashboard() {
  return (
    <div className="bg-slate-800/40 py-14 sm:py-14">
      <div className="mx-auto max-w-full px-2 lg:max-w-full lg:px-8">
        <h2 className="text-center text-base/7 font-semibold text-primary">
          Solid Manager
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-balance text-center text-4xl font-semibold tracking-tight text-slate-100 sm:text-5xl">
          Everything you need to manage your team
        </p>
        {/* <PieChartWinRate /> */}
        <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-[repeat(auto-fit,_minmax(350px,_1fr))] lg:grid-rows-4">
          <div className="bg-slate-800/40 border rounded-md p-2 flex justify-center">
            <TeamStats />
          </div>
          <div className="bg-slate-800/40 border">
            <LastPlayersAddedFt />
          </div>
          <div className="bg-slate-800/40 border rounded-lg">
            <LastMatches />
            <NextMatch />
          </div>
          <div className="bg-slate-800/40 border rounded-lg">
            <TopScorersFt />
          </div>
          <div className="bg-slate-800/40 col-span-3 row-span-3 border rounded-lg">
            <TeamCalendatFt />
          </div>
          <div className="bg-slate-800/40 border rounded-lg">
            <TopAssistsFt />
          </div>
          <div className="bg-slate-800/40 col-start-4 row-span-2 border rounded-lg">
            <div className="p-2">
              <div className="px-5">
                <h3 className="text-lg tracking-tight text-white font-bold max-lg:text-center">
                  Reserved #7
                </h3>
              </div>
              <div className="px-5">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
                  debitis dignissimos in recusandae modi voluptate a laborum,
                  commodi ea numquam quisquam magnam blanditiis iste unde et
                  dolore consequatur vero nisi est dolor, necessitatibus sed ut.
                  Consectetur adipisci exercitationem mollitia suscipit odio
                  soluta reprehenderit, eos doloremque hic modi doloribus ea
                  blanditiis?
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
