import React from "react";
import TeamStatsSection from "./@teamStats/page";
import LastMatchesSection from "./@lastMatches/page";
import NextMatchSection from "./@nextMatch/page";
import TopScorersSection from "./@topScorers/page";
import { Separator } from "@radix-ui/react-separator";
import TopAssistsSection from "./@topAssists/page";
import TeamCalendarSection from "./@teamCalendar/page";
import DashboardTitle from "@/features/dashboard/infraestructure/DashboardTitle";

function DashboardLayout() {
  return (
    <>
      <div className="py-14 sm:py-14">
        <div className="mx-auto max-w-full px-2 lg:max-w-full lg:px-8">
          <DashboardTitle />

          <div className="mt-10 grid gap-2 sm:mt-16 grid-cols-1 lg:grid-rows-4 lg:grid-cols-[repeat(auto-fit,_minmax(350px,_1fr))] ">
            <div className="dark:bg-slate-800/40 col-span-4 lg:col-span-1 border rounded-lg p-2 flex justify-center bg-background">
              <TeamStatsSection />
            </div>
            <div className="dark:bg-slate-800/40 border col-span-4 lg:col-span-1 rounded-lg p-2 bg-background">
              <LastMatchesSection />
              <NextMatchSection />
            </div>          
            <div className="dark:dark:bg-slate-800/40 border col-span-4 lg:col-span-1 rounded-lg p-2 bg-background">
              <TopScorersSection />
              <Separator className="my-2" />
              <TopAssistsSection />
            </div>
            <div className="dark:bg-slate-800/40 col-span-4 lg:col-span-4 row-span-3 border rounded-lg bg-background overflow-hidden">
              <TeamCalendarSection />
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
}

export default DashboardLayout;
