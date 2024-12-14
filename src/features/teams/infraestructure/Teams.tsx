"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/context/AuthCtx";
import { format } from "date-fns";

function Teams() {
  const { teams, selectedTeamId } = useAuthStore((state) => state.accountData);
  
  return (
    <>
      <div className="grid grid-cols-4 gap-5">
        {teams
          .filter((x) => x.hasSubscription)
          .map((team) => (
            <Card key={team.id}>
              <CardHeader>
                <CardTitle>{team.name}</CardTitle>
                <CardDescription className="text-right text-white">
                  since {format(team.createdAt, "yyyy")}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <div>
                  <Label>Primary Color</Label>
                  <Input placeholder="Primary Color" />
                </div>

                <div>
                  <Label>Secondary Color</Label>
                  <Input placeholder="Secondary Color" />
                </div>

                <div>
                  <Button disabled={!team.hasSubscription}>Update</Button>
                </div>
              </CardContent>
              <CardFooter>
                {team.id === selectedTeamId && (
                  <small>This team is currently selected</small>
                )}
              </CardFooter>
              <span></span>
            </Card>
          ))}
      </div>
    </>
  );
}

export default Teams;