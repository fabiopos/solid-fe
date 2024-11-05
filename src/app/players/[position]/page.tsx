'use client'
import { H1 } from "@/components/ui/typograhpy";
import PlayerList from "@/features/players/infraestructure/PlayerList";
import PlayersTable from "@/features/players/infraestructure/PlayersTable";
import { useParams } from "next/navigation";


export default function PlayersByPositionPage() {
  const params = useParams();
  console.log(params);
  return (
    <div>      
      <PlayerList />
    </div>
  );
}
