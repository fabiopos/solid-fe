import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useSeasonDetailsStore } from "@/context/SeasonDetailsCtx";
import { ExternalLink, Star } from "lucide-react";
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
              <div className="rounded-xl pb-2">
                <div className="grid grid-cols-[50px_50px_2fr_2fr_2fr_2fr] gap-2 justify-center items-center">
                  <div className="">
                    <Star
                      size="18"
                      fill="currentColor"
                      className="text-yellow-400"
                    />
                  </div>
                  <div className="">
                    <span className="text-green-500 font-extrabold">W</span>
                  </div>
                  <div className="grid grid-cols-[auto_100px] justify-center items-center gap-5 ">
                    <Avatar>
                      <AvatarImage
                        src="/torino_shield.png"
                        className="object-scale-down"
                      />
                      <AvatarFallback>TOR</AvatarFallback>
                    </Avatar>
                    <span>{m.homeTeam?.name}</span>
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
                  <div className="grid grid-cols-[100px_auto] justify-center items-center gap-5">
                    <span>{m.awayTeam?.name}</span>
                    <Avatar>
                      <AvatarImage
                        src="/generic_shield.png"
                        className="object-scale-down"
                      />
                      <AvatarFallback>TOR</AvatarFallback>
                    </Avatar>
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
