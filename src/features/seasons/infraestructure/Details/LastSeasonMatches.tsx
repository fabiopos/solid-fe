import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useSeasonDetailsStore } from "@/context/SeasonDetailsCtx";
import { ExternalLink, Shield } from "lucide-react";
import React from "react";

function LastSeasonMatches() {
  const { matches } = useSeasonDetailsStore((state) => state);
  return (
    <Card className="my-5">
      <CardHeader>
        <CardTitle>Last 5 matches played for this season</CardTitle>
      </CardHeader>
      <CardContent>
        {matches
          ?.filter((x) => x.homeTeam && x.awayTeam)
          .map((m) => (
            <React.Fragment key={`match-${m.id}`}>
              <div className="rounded-xl pb-1">
                <div className="grid grid-cols-[150px_50px_200px_85px_200px_2fr] gap-2 justify-center items-center">
                  <div className="">{m.competition?.name}</div>
                  <div className="">
                    <span className="text-green-500 font-extrabold">W</span>
                  </div>
                  <div className="flex items-center gap-5 justify-end">
                    <div className="flex flex-col justify-center items-center">
                      <span className="font-extrabold tracking-wide leading-4">
                        {m.homeTeam?.name}
                      </span>
                      <small className="text-gray-500">Home</small>
                    </div>
                    <Avatar>
                      <AvatarImage
                        src="/torino_shield.png"
                        className="object-scale-down"
                      />
                      <AvatarFallback>
                        <Shield />
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex justify-center">
                    <Badge
                      variant="outline"
                      className="flex gap-1 text-xl bg-background px-5"
                    >
                      <span>
                        {m.homeScore === null || m.homeScore === undefined
                          ? "0"
                          : m.homeScore}
                      </span>
                      <span>:</span>
                      <span>
                        {m.awayScore === null || m.awayScore === undefined
                          ? "0"
                          : m.awayScore}
                      </span>
                    </Badge>
                  </div>
                  <div className="flex items-center gap-5 justify-start">
                    <Avatar>
                      <AvatarImage
                        src="/generic_shield.png"
                        className="object-scale-down"
                      />
                      <AvatarFallback>
                        <Shield />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col justify-center items-center">
                      <span className="font-extrabold tracking-wide leading-4">
                        {m.awayTeam?.name}
                      </span>
                      <small className="text-gray-500">Away</small>
                    </div>
                  </div>
                  <div className="">
                    <ExternalLink size="18" />
                  </div>
                </div>
              </div>
              <Separator className="my-4" />
            </React.Fragment>
          ))}
      </CardContent>
    </Card>
  );
}

export default LastSeasonMatches;
