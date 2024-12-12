"use client";

import { Button } from "@/components/ui/button";
import playersData from "./players_data.json";
import { useSession } from "next-auth/react";
import { ApiClient } from "@/lib/ApiClient";
import { PlayerCreate } from "@/features/players/application/PlayerCreate";
import { EmptyPlayer } from "@/features/players/domain/player.effect.schema";
import { useTeamId } from "@/hooks/use-team-id";
import { DocumentType, DominantFoot, ShirtSize } from "@/types/types.common";
import { useState } from "react";
import { Loader } from "lucide-react";
function Bulk() {
  const { data } = useSession();
  const teamId = useTeamId();
  const [loading, setLoading] = useState(false);

  if (!teamId) return null;

  const handleBulk = async () => {
    //console.log(data);
    setLoading(true);
    try {
      const client = new ApiClient();
      const playerClient = new PlayerCreate(client);
      const promises = playersData.map((player) => {
        return playerClient.createNewPlayer(
          EmptyPlayer.make({
            teamId: teamId,
            firstName: player.name ?? '--',
            lastName: '--',
            documentNumber: player.document,
            documentType: DocumentType.CC,
            email: player.email,
            shirtSize: player.shirtSize as ShirtSize,
            shirtNumber: player.shirtNumber,
            shirtName: player.shirtName,
            dominantFoot: DominantFoot.RIGHT,
            favPositionId: player.field_position_id,
            // favPosition: { },
            address: player.address,
            avatarUrl: player.avatar_url,
            phone: player.phone,
            city: player.city,
            country: "Colombia",
            eps: player.eps,
            arl: player.eps,
            weight: player.weight,
            height: player.height ? Number(player.height) : null,
            playerPositions: [],
            // fieldPositions: S.optional(S.Array(S.String)),
            team: { id: teamId },
          }),
          data?.user.access_token ?? ""
        );
      });
      await Promise.all(promises);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };
  return (
    <div>
      <Button disabled={loading} onClick={handleBulk}>
        Bulk players
      </Button>
      {loading && (
        <span className="flex items-center gap-2">
          <Loader className="animate-spin" size={18} />
          Loading...
        </span>
      )}
    </div>
  );
}

export default Bulk;
