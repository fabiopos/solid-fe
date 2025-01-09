import { TextEffect } from "@/components/ui/text-effect";
import React, { ReactNode } from "react";
import TeamStatsSection from "./@teamStats/page";
import LastMatchesSection from "./@lastMatches/page";
import NextMatchSection from "./@nextMatch/page";
import TopScorersSection from "./@topScorers/page";
import { Separator } from "@radix-ui/react-separator";
import TopAssistsSection from "./@topAssists/page";
import TeamCalendarSection from "./@teamCalendar/page";

function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="py-14 sm:py-14">
        <div className="mx-auto max-w-full px-2 lg:max-w-full lg:px-8">
          <h2 className="text-center text-base/7 font-semibold text-primary uppercase">
            <TextEffect per="char" preset="fade">
              Solid Manager
            </TextEffect>
          </h2>
          <TextEffect
            per="word"
            as="h3"
            preset="slide"
            speedReveal={1000}
            className="mx-auto mt-2 max-w-lg text-balance text-center text-4xl dark:font-semibold tracking-tight dark:text-slate-100 sm:text-5xl"
          >
            Everything you need to manage your team
          </TextEffect>

          <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-[repeat(auto-fit,_minmax(350px,_1fr))] lg:grid-rows-4">
            <div className="dark:bg-slate-800/40 border rounded-lg p-2 flex justify-center bg-background">
              <TeamStatsSection />
            </div>
            <div className="dark:bg-slate-800/40 border rounded-lg p-2 bg-background">
              <LastMatchesSection />
              <NextMatchSection />
            </div>

            {/* <div className="bg-slate-800/40 border">
          <LastPlayersAddedFt />
        </div> */}
            <div className="dark:dark:bg-slate-800/40 border rounded-lg p-2 bg-background">
              <TopScorersSection />
              <Separator className="my-2" />
              <TopAssistsSection />
            </div>
            <div className="dark:bg-slate-800/40 col-span-3 row-span-3 border rounded-lg bg-background">
              <TeamCalendarSection />
            </div>
          </div>
        </div>
      </div>
      {children}
    </>
  );
}

export default DashboardLayout;
