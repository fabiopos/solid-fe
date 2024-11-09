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
import { Separator } from "@/components/ui/separator";
import { useAuthStore } from "@/context/AuthCtx";
import { format } from "date-fns";

export default function TeamPage() {
  const { teams, selectedTeamId } = useAuthStore((state) => state.accountData);

  return (
    <div className="p-8">
      <h2 className="text-3xl">Your Teams</h2>
      <Separator className="my-5" />
      {teams.map((team) => (
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
              <Button>Update</Button>
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
  );
}
