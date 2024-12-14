import { Separator } from "@/components/ui/separator";
import Teams from "@/features/teams/infraestructure/Teams";

export default function TeamPage() {
  //console.log('selectedTeamId',selectedTeamId, teams)
  return (
    <div className="p-8">
      <h2 className="text-3xl">Your Teams</h2>
      <Separator className="my-5" />
      <Teams />
    </div>
  );
}
