import LastMatches from "@/components/Dashboard/LastMatches/LastMatches";
import LastPlayersAdded from "@/components/Dashboard/LastPlayersAdded/LastPlayersAdded";
import NextMatch from "@/components/Dashboard/NextMatch/NextMatch";
import { PieChartWinRate } from "@/components/Dashboard/TeamStats/PieChartWinRate";
import TeamStatBoxes from "@/components/Dashboard/TeamStats/TeamStatBoxes";
import TopAsists from "@/components/Dashboard/TopAsists/TopAsists";
import TopScorers from "@/components/Dashboard/TopScorers/TopScorers";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";

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
            <div>
              <div className="mt-5">
                <h3 className="text-lg font-bold tracking-tight text-white max-lg:text-center">
                  My Team Stats
                </h3>
              </div>
              <div className="flex flex-col mt-5">
                <PieChartWinRate />
                <Separator className="my-2" />
                <TeamStatBoxes />
              </div>
            </div>
          </div>
          <div className="bg-slate-800/40 border">
            <div className="p-2">
              <div className="px-5 my-5">
                <h3 className="text-lg font-bold tracking-wide text-white max-lg:text-center">
                  Last Players Added
                </h3>
              </div>
              <div className="px-5 mt-5">
                <LastPlayersAdded />
              </div>
            </div>
          </div>
          <div className="bg-slate-800/40 border rounded-lg">
            <LastMatches />
            <NextMatch />
          </div>
          <div className="bg-slate-800/40 border rounded-lg">
            <div className="p-2">
              <div className="px-5 my-5">
                <h3 className="text-lg font-bold tracking-tight text-white max-lg:text-center">
                  Top Scorers
                </h3>
              </div>
              <div className="px-5">
                <TopScorers />
              </div>
            </div>
          </div>
          <div className="bg-slate-800/40 col-span-3 row-span-3 border rounded-lg">
            <div className="p-2">
              <div className="px-5">
                <h3 className="text-lg font-bold tracking-tight text-white max-lg:text-center">
                  Calendar 1
                </h3>
              </div>
              <div className="px-5">
                <Calendar mode="multiple" numberOfMonths={12} />
              </div>
            </div>
          </div>
          <div className="bg-slate-800/40 border rounded-lg">
            <div className="p-2">
              <div className="px-5">
                <h3 className="text-lg font-bold tracking-tight text-white max-lg:text-center">
                  Top Asists
                </h3>
              </div>
              <div className="px-5 mt-5">
                <TopAsists />
              </div>
            </div>
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
